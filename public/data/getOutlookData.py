import os, ftplib, tarfile, zipfile, traceback, copy
from io import BytesIO 
import shapefile
from json import dumps
from datetime import date, timedelta
import geopandas as gpd
from shapely import simplify
from shapely.geometry import box, MultiPolygon
import warnings

#suppress warnings from shapely, pandas and geopandas
warnings.filterwarnings("ignore", category=RuntimeWarning, message="invalid value encountered in intersection")
warnings.filterwarnings("ignore", category=RuntimeWarning, message="invalid value encountered in simplify_preserve_topology")
warnings.filterwarnings("ignore", category=UserWarning, message="Boolean Series key will be reindexed to match DataFrame index.")

user = os.getlogin()

outdir = "/Users/{0}/progs/cronjobs/DEWS/data/".format(user)
tmpdir = "/Users/{0}/progs/cronjobs/DEWS/".format(user)

bounds = [[36, -86], [48, -61]]
bbox = (-86, 36, -61, 48)

def remove_small_polygons(multipolygon, min_area):
    if multipolygon.geom_type == 'Polygon':
        return multipolygon if multipolygon.area >= min_area else None
    polygons = [poly for poly in multipolygon.geoms if poly.area >= min_area]
    return MultiPolygon(polygons) if polygons else None

def add_fill_color(gdf):
    qpf_colors = {
        0.01: "lime",
        0.1:  "green",
        0.25: "darkgreen",
        0.5:  "royalblue",
        0.75: "dodgerblue",
        1.0:  "deepskyblue",
        1.25: "cyan",
        1.5:  "mediumpurple",
        1.75: "darkorchid",
        2.0:  "purple",
        2.5:  "maroon",
        3.0:  "red",
        4.0:  "coral",
        5.0:  "orange",
        7.0:  "sienna",
        10.0: "goldenrod",
        15.0: "yellow",
        20.0: "pink"
    }
    # Iterate through each row (feature)
    for index, row in gdf.iterrows():
        # add column with fill and line color cooresponding to QPF property
        gdf.loc[index, 'fill'] = qpf_colors[row.QPF]
        gdf.loc[index, 'color'] = qpf_colors[row.QPF]
    return gdf

def process_shapefile(input_path, output_path, bbox, simplification_tolerance, min_area_threshold):
    gdf = gpd.read_file(input_path)

    # clip to bounding box
    clipped_gdf = gdf.clip(bbox)

    # add fill colors
    clipped_gdf = add_fill_color(clipped_gdf)

    # simplify
    simplified_gdf = clipped_gdf.copy()
    simplified_gdf["geometry"] = simplify(simplified_gdf["geometry"], simplification_tolerance)

    # remove small polygons
    simplified_gdf['geometry'] = simplified_gdf['geometry'].apply(lambda geom: remove_small_polygons(geom, min_area_threshold))
    simplified_gdf = simplified_gdf[~gdf.geometry.is_empty]

    simplified_gdf.to_file(output_path, driver='GeoJSON')

#specific names - no longer needed as long as "latest" still exists
#today = date.today()
#ymd = "%4d%02d%02d" % (today.year,today.month,today.day)
#qpf_day1 = "94q_%s12.tar" % ymd
#qpf_day2 = "98q_%s12.tar" % ymd
#qpf_day3 = "99q_%s12.tar" % ymd
#qpf_7day = "97e_%s12.tar" % ymd

qpf_day1 =      "QPF24hr_Day1_latest.tar"
qpf_day1_json = "qpf_day1.geojson"
qpf_day2 =      "QPF24hr_Day2_latest.tar"
qpf_day2_json = "qpf_day2.geojson"
qpf_day3 =      "QPF24hr_Day3_latest.tar"
qpf_day3_json = "qpf_day3.geojson"
qpf_7day =      "QPF168hr_Day1-7_latest.tar"
qpf_7day_json = "qpf_7day.geojson"

wpc_gis_files = [
    [qpf_day1, qpf_day1_json, "shapefiles/qpf/day1"],
    [qpf_day2, qpf_day2_json, "../day2"],
    [qpf_day3, qpf_day3_json, "../day3"],
    [qpf_7day, qpf_7day_json, "../7day"]
]

ftp = ftplib.FTP("ftp.wpc.ncep.noaa.gov")
ftp.login("anonymous","kle1@cornell.edu")

for infile, outfile, indir in wpc_gis_files:
    try:
        ftp.cwd(indir)
        f = open("%s%s" % (tmpdir,infile), 'wb')
        ftp.retrbinary("RETR %s" % infile, f.write)
        print ('-------------')
        f.close()
        tar = tarfile.open("%s%s" % (tmpdir,infile))
        for member in tar.getnames():
            if member[-4:] == ".shp":
                myshp = tar.extractfile(member).read()
                tar.extract(member)
                shpfile = copy.deepcopy(member)
                print (member)
            elif member[-4:] == ".dbf":
                mydbf = tar.extractfile(member).read()
                tar.extract(member)
            elif member[-4:] == ".shx":
                myshx = tar.extractfile(member).read()
                tar.extract(member)
        tar.close()

        output_geojson = '%s%s' % (outdir, outfile)
        simplification_tolerance = 0.05           # Adjust as needed
        min_area_threshold = 0.25  # Adjust as needed
        process_shapefile(shpfile, output_geojson, bbox, simplification_tolerance, min_area_threshold)

        os.remove("%s%s" % (tmpdir, infile))
    except:
        print ('Error retrieving wpc files',infile)
        traceback.print_exc()
ftp.close()

### now files from cpc ###

now = date.today()
#now = date(2023,10,20)  #for testing
yest = now + timedelta(days=-1)
getmonthupd = (now.day >= 1 and now.day <= 5)   #give some leeway in case it doesn't run on 1st
getseasfile = (now.weekday() == 4 and yest.day >= 15 and yest.day <= 21)  # Seasonal forecast are updated on the 3rd Thursday of the month; get new file on Friday
if getseasfile:
    yyyymm = "%s%02d" % (now.year, now.month)
    prcp_seas = "seasprcp_%s.zip" % (yyyymm)
    temp_seas = "seastemp_%s.zip" % (yyyymm)
else:
    prcp_seas = None
    temp_seas = None
if getmonthupd:
    prcp_month = "monthupd_prcp_latest.zip"
    temp_month = "monthupd_temp_latest.zip"
else:
    prcp_month = prcp_seas
    temp_month = temp_seas
#    prcp_month = "monthupd_prcp_latest.zip"
#    temp_month = "monthupd_temp_latest.zip"

prcp_610day = "610prcp_latest.zip"
prcp_610day_json = "prcp_610day.json"
temp_610day = "610temp_latest.zip"
temp_610day_json = "temp_610day.json"
prcp_814day = "814prcp_latest.zip"
prcp_814day_json = "prcp_814day.json"
temp_814day = "814temp_latest.zip"
temp_814day_json = "temp_814day.json"
prcp_month_json = "prcp_month.json"
temp_month_json = "temp_month.json"
prcp_seas_json = "prcp_seas.json"
temp_seas_json = "temp_seas.json"

cpc_gis_files = [
    [prcp_610day, prcp_610day_json],
    [temp_610day, temp_610day_json],
    [prcp_814day, prcp_814day_json],
    [temp_814day, temp_814day_json],
    [prcp_seas, prcp_seas_json],
    [temp_seas, temp_seas_json],
    [temp_month, temp_month_json],
    [prcp_month, prcp_month_json],
]

ftp = ftplib.FTP("ftp.cpc.ncep.noaa.gov")
ftp.login("anonymous","kle1@cornell.edu")
ftp.cwd("GIS/us_tempprcpfcst")

for infile, outfile in cpc_gis_files:
    try:
        if (infile == prcp_month or infile == temp_month) and not getmonthupd and not getseasfile:
            continue
        if (infile == prcp_seas or infile == temp_seas) and not getseasfile:
            continue

        if getmonthupd and infile == temp_month:
            print ('Changing directory')
            ftp.cwd("monthlyupdate")

        f = open("%s%s" % (tmpdir, infile), 'wb')
        ftp.retrbinary("RETR %s" % infile, f.write)
        print ('-------------')
        f.close()
        zipshape = zipfile.ZipFile("%s%s" % (tmpdir, infile), 'r')
#        print zipshape.namelist()

        for fname in zipshape.namelist():
#            print infile,fname
            if (prcp_seas != infile and temp_seas != infile) or \
               ((prcp_seas_json == outfile or temp_seas_json == outfile) and fname[0:6] == 'lead1_') or \
               ((prcp_month_json == outfile or temp_month_json == outfile) and fname[0:7] == 'lead14_'):
                if fname[-3:] == "shp":
                    shpname = fname
                    print (shpname)
                elif fname[-3:] == "dbf":
                    dbfname = fname
                elif fname[-3:] == "shx":
                    shxname = fname

        r = shapefile.Reader(shp=BytesIO(zipshape.read(shpname)),
                             shx=BytesIO(zipshape.read(shxname)),
                             dbf=BytesIO(zipshape.read(dbfname)))
        fields = [field[0] for field in r.fields[1:]]
        print ('Fields: ',fields)

        hs = []
        cat_list = []
        for feature in r.shapeRecords():
            atr = dict(zip(fields, feature.record))
            geom = feature.shape.__geo_interface__
            if geom != None: 
                if geom["type"] == "MultiPolygon":
                    feat = {"type": "MultiPolygon", "coordinates": []}
                    for xlg in geom["coordinates"]:
                        cc = []
                        for lg in xlg:
                            for r in lg:
                                if r[1] >= bounds[0][0] and r[1] <= bounds[1][0] and r[0] >= bounds[0][1] and r[0] <= bounds[1][1]:
                                    cc.append(lg)
                                    break
                        if len(cc) > 0:
                            feat["coordinates"].append(cc)
                    if len(feat["coordinates"]) > 0:
                        hs.append(dict(type="Feature", geometry=feat, properties=atr))
                        catprob = "%s|%s" % (atr['Cat'],atr['Prob'])
                        if not catprob in cat_list: cat_list.append(catprob)
                        if "Start_Date" in atr.keys(): atr['Start_Date'] = str(atr['Start_Date'])
                        if "End_Date" in atr.keys(): atr['End_Date'] = str(atr['End_Date'])
                        if "Fcst_Date" in atr.keys(): atr['Fcst_Date'] = str(atr['Fcst_Date'])
                if geom["type"] == "Polygon":
                    northeast = False
                    for lg in geom["coordinates"]:
                        for r in lg:
                            if r[1] >= bounds[0][0] and r[1] <= bounds[1][0] and r[0] >= bounds[0][1] and r[0] <= bounds[1][1]:
                                northeast = True
                                break
                    if northeast:
                        hs.append(dict(type="Feature", geometry=geom, properties=atr))
                        catprob = "%s|%s" % (atr['Cat'],atr['Prob'])
                        if not catprob in cat_list: cat_list.append(catprob)
                        if "Start_Date" in atr.keys(): atr['Start_Date'] = str(atr['Start_Date'])
                        if "End_Date" in atr.keys(): atr['End_Date'] = str(atr['End_Date'])
                        if "Fcst_Date" in atr.keys(): atr['Fcst_Date'] = str(atr['Fcst_Date'])
        #print (cat_list, atr['Fcst_Date'])
        if len(hs) > 0:
            geojson = open("%s%s" % (outdir,outfile), "w")
            geojson.write(dumps({"values":cat_list, "map_features":{"type": "FeatureCollection", "features": hs}}))
            geojson.close()

        os.remove("%s%s" % (tmpdir,infile))
    except:
        print( 'Error retrieving cpc files', infile)

ftp.close()

try:
    os.system("aws s3 sync %s s3://nedews.nrcc.cornell.edu/data/ --only-show-errors --exclude '.*'" % (outdir))
    #print('*** Files not uploaded ***')
except:
    print ('Error syncing')

