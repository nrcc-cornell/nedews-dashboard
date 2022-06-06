import {featureEach} from '@turf/meta'
import {polygon, feature, featureCollection} from '@turf/helpers'
import area from '@turf/area'
import booleanWithin from '@turf/boolean-within'

const sortPolygons = (map_features, value_property) => {

//console.log("orig:" + value_property + " " + map_features.features.length + " features")

  let newfeatures = []
  featureEach(map_features, feat => {
    const feature_type = feat.geometry.type
    if (feature_type === 'Polygon') {
      const tpolygon = polygon(feat.geometry.coordinates)
      const tarea = area(tpolygon)
      feat.properties.parea = tarea*0.0000000001
      newfeatures.push(feat)
    } else if (feature_type === 'MultiPolygon') {
      // break MultiPolygons into Polygons
//console.log('MultiPoly')
      feat.geometry.coordinates.forEach((polycoor) => {
//console.log(polycoor)
        const tpolygon = polygon(polycoor)
        const tarea = area(tpolygon)
        feat.properties.parea = tarea*0.0000000001
        const geometry = {
          type: "Polygon", 
          coordinates: polycoor
        }
        const newpoly = feature(geometry, feat.properties)
        newfeatures.push(newpoly)
      })
//console.log("------------------------------------")
    } else {
      console.log('Unexpected feature - ' + feature_type)
    }
  })
  let newCollection = featureCollection(newfeatures)
  // sort features by area size (highest to lowest)
  newCollection.features.sort((a, b) => {
    return b.properties.parea - a.properties.parea
  })
  // look for features that are included withing a larger feature
  featureEach(newCollection, (feat, i) => {
    let direction = 'increasing'
    const polygon_i = polygon(newCollection.features[i].geometry.coordinates)
    for (let j = i-1; j >= 0; j -= 1) {
      const polygon_prev = polygon(newCollection.features[j].geometry.coordinates)
      const within = booleanWithin(polygon_i, polygon_prev)
      if (within) {
        // determine if feature is increasing or decreasing from enclosing feature
        if (newCollection.features[i].properties[value_property] <= newCollection.features[j].properties[value_property]) {
          direction = 'decreasing'
        }
        break
      }
    }
    newCollection.features[i].properties.direction = direction
  })

//console.log("new:")
//featureEach(newCollection, feat => {
//  console.log(feat)
//  console.log(feat.properties.parea + " " + feat.properties[value_property] + " " + feat.properties.direction)
//})

  return newCollection
}

export default sortPolygons