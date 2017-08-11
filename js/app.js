var activeSelect = {
  paintType:"exponential",
  paintProperty:"Polsby-Pop",
  paintStops:[[.15, '#e66101'],[.3, '#fdb863'],[.41, '#f7f7f7'],[.52, '#b2abd2'], [.75, '#5e3c99']],
  geography:"Con",
  year:2012,
  name:"COUNTYNAME"
};

var layersArray = []; // at 0.22.0 you can no longer have undefined layers in array - must push them dynamically

var zoomThreshold = 8;


function initialize(){

  if ($( window ).width() < 620){
    $("#map").height('500px');
  } else{
    $("#map").height('800px');
  }
  
  southWest = new mapboxgl.LngLat( -104.7140625, 41.86956);
  northEast = new mapboxgl.LngLat( -84.202832, 50.1487464);
  bounds = new mapboxgl.LngLatBounds(southWest,northEast);

  // mapboxgl.accessToken = 'Your Mapbox access token';
  mapboxgl.accessToken = 'pk.eyJ1IjoibWdnZyIsImEiOiJjajY2cWw0ODUyaHI2MnFwOGl0bmdtMGowIn0.PLDk2t2DUJ87obtje8Ce_g';

  map = new mapboxgl.Map({
    container: 'map', // container id
    // style: 'mapbox://styles/mapbox/dark-v9',
    style: 'mapbox://styles/mggg/cj66qmslq7fh82ss33qbqlxoc',
    center: [-93.6678,46.50],
    maxBounds:bounds,   
    zoom: 6,
    minZoom: 6
  });

    var nav = new mapboxgl.NavigationControl({position: 'top-right'}); // position is optional
    map.addControl(nav);

    // geocoder = new google.maps.Geocoder; //ccantey.dgxr9hbq
    // geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken
    // });
    // window.geocoder = geocoder;

    //map.addControl(geocoder);
	 map.on('load', function () {
      // add vector source:
      map.addSource('mnleg_cng', {
          type: 'vector',
          url: 'mapbox://mggg.cj689nea60dqo2qryo5m6zsj4-0z2dc'
      });

     var layers = [
            //name, minzoom, maxzoom, filter, paint fill-color, stops, paint fill-opacity, stops            
          [
            activeSelect.geography,                  //layers[0] = id
            'fill',                     //layer[1]            
            ['all', ['==', 'Year', 2012], ["==", "FeatType", activeSelect.geography]],             //layers[2] = filter
            {"fill-color": {              //layers[3] = paint object
                "type":activeSelect.paintType,
                "property": activeSelect.paintProperty,
                "stops": activeSelect.paintStops
                }, 
            "fill-outline-color": "#fff",
                  "fill-opacity":0.75
            }], 
            [activeSelect.geography+"-highlighted", 'fill',["in", "District", ""],{"fill-color": '#ff6600',"fill-outline-color": "#fff","fill-opacity":1}]]      

        layers.forEach(addLayer);
  });//end map on load
} //end initialize

function addLayer(layer) {
             
           map.addLayer({
            "id": layer[0] +'-'+ activeSelect.year,
            "type": layer[1],
            "source": "mnleg_cng",
            "source-layer": "final", //layer name in studio
            // "minzoom":layer[1],
            // 'maxzoom': layer[2],
            'filter': layer[2],
            "layout": {},
            "paint": layer[3],
           }, 'waterway-label');

           layersArray.push(layer[0] +'-'+ activeSelect.year);
           
};

//remove layersArray element per 0.22.0
function spliceArray(a){
  var index = layersArray.indexOf(a);    // <-- Not supported in <IE9
  if (index !== -1) {
      layersArray.splice(index, 1);
  }
}

function mapResults(feature){
  // console.log(feature.layer.id)
  switch (feature.layer.id) {
      case activeSelect.geography+"-"+activeSelect.year:
          map.setFilter(activeSelect.geography+"-"+activeSelect.year, ['all', ['==', 'Year', activeSelect.year], ['==', 'FeatType', activeSelect.geography],["!=", "District",feature.properties.District]]);
          map.setFilter(activeSelect.geography+"-highlighted-"+activeSelect.year, ['all', ['==', 'Year', activeSelect.year], ['==', 'FeatType', activeSelect.geography],["==", "District",feature.properties.District]]);
          break;
      case activeSelect.geography+"-highlighted-"+activeSelect.year:
          break;
      default:
          // map.setFilter("2016results-"+activeTab.geography, ['all', ['==', 'UNIT', activeTab.geography], ["!=", activeTab.name, feature.properties[activeTab.name]]]);
          //   map.setFilter("2016results-"+activeTab.geography+"-hover", ['all', ['==', 'UNIT', activeTab.geography], ["==", activeTab.name, feature.properties[activeTab.name]]]);
    }
}

function showResults(activeSelect, featureProperties){
  console.log(activeSelect)
  var content = '';
  var header ='';
  var district = '';

  var data = {
    // activeTab:activeSelect.selection,
    geography:activeSelect.geography
  };
  
  // var attributeMap = {'AsianDisab':"Asian Disabled", "BlackDisab":"Black Disabled","LatinoDisa":"Latino Disabled", 'Native_A_1':"Native American Disabled","WhiteDisab":"White Disabled",
  //           'FemHHPov':"Female Head Household Poverty",
  //                       'AsianEmplo':"Asian Employed",'BlackEmplo':"Black Empolyed","LatinoEmpl":"Latino Employed","Native_Ame":"Native American Employed",'WhiteEmplo':"White Emplyed",
  //                     'MNTaxes':"MN Taxes",'TotalIncom':"Total Income"}
  header += "<h5>Results</h5>";
  // content += "<tr><th>Senate District:</th><td>"+featureProperties['District']+"</td></tr>"
  // content += "<tr><th>Senator:</th><td>"+featureProperties['name']+"</td></tr>"

for (attributes in featureProperties){
              if( attributes.match(/MNSENDIST/gi) || attributes.match(/OBJECTID/gi) || attributes.match(/Shape_Area/gi) || attributes.match(/Shape_Leng/gi) || attributes.match(/SENDIST/gi) || attributes.match(/memid/gi) || attributes.match(/name/gi) || attributes.match(/party/gi)){
                content += "";
              }else{
                // console.log(attributes, featureProperties[attributes])
                content += "<tr><th>"+attributes+":</th><td>"+featureProperties[attributes]+"</td></tr>"
              }   
            }

// switch (activeSelect.geography) {
//     case "cng":
//           for (attributes in featureProperties){
//               if( attributes.match(/MNSENDIST/gi) || attributes.match(/OBJECTID/gi) || attributes.match(/Shape_Area/gi) || attributes.match(/Shape_Leng/gi) || attributes.match(/district/gi) || attributes.match(/SENDIST/gi) || attributes.match(/memid/gi) || attributes.match(/name/gi) || attributes.match(/party/gi)){
//                 content += "";
//               }else{
//                 // console.log(attributes, featureProperties[attributes])
//                 content += "<tr><th>"+attributes+":</th><td>"+featureProperties[attributes]+"</td></tr>"
//               }   
//             }
//             break;


//     }

  $("#results").html(content);
  // district += feature.properties.SENDIST
  // content += "<tr><th>Total Votes: </th><td>"+feature[activeSelect.selection+'TOTAL'].toLocaleString()+"</td></tr>";

}

function removeLayers(c){

  switch (c){
    case'all':
        map.setFilter(activeSelect.geography+"-"+activeSelect.year, ['all', ['==', 'Year', activeSelect.year], ['==', 'FeatType', activeSelect.geography]]);
        map.setFilter(activeSelect.geography+"-highlighted-"+activeSelect.year, ['all', ['==', 'Year', activeSelect.year], ['==', 'FeatType', activeSelect.geography], ["in", "District", ""]])

        $('#results').html("");
        // $('#precinct-results').html("");
        $('#clear').hide();

        // if(activeTab.selection == 'USPRS' || activeTab.selection == 'USSEN'){
        //   $('#candidate-table').show();
        // } else{
        //   $('#candidate-table').hide();
        // }
    //remove old pushpin and previous selected district layers 
    if (typeof map.getSource('pointclick') !== "undefined" ){ 
      // console.log('remove previous marker');
      map.removeLayer('pointclick');    
      map.removeSource('pointclick');
    }   
    break;    
    case 'pushpin':
    //remove old pushpin and previous selected district layers 
    if (typeof map.getSource('pointclick') !== "undefined" ){ 
      // console.log('remove previous marker');
      map.removeLayer('pointclick');    
      map.removeSource('pointclick');
    }
    break;
  }    
}



 


