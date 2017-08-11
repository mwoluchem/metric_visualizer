$( document ).ready(function() {
	//kickoff map logic
    initialize();
    $('#clear').hide();

    $('.mapboxgl-ctrl-top-right').affix({
      offset: {
        top: 210
      }
    });
    $('#clear').on('click', function(){
    removeLayers('all');

  })

$('.election-navigation-a').on('click', function(e){
      e.preventDefault();
      //remove previous layers
      $('#results').html("");
      $('#clear').hide();
        map.removeLayer(activeSelect.geography+"-"+activeSelect.year);
        map.removeLayer(activeSelect.geography+"-highlighted-"+activeSelect.year);
        spliceArray(activeSelect.geography+"-"+activeSelect.year);
        spliceArray(activeSelect.geography+"-highlighted-"+activeSelect.year);

      $('.election-navigation-a').removeClass('active');
        
      //add new selections
      $(this).addClass('active');
      activeSelect.selection = $(this).data('district');
      activeSelect.geography = $(this).data('geography');
      activeSelect.name = $(this).data('name');        

        var layer = [
          [activeSelect.geography,'fill', ['all', ['==', 'year', activeSelect.year], ['==', 'FeatType', activeSelect.geography]],{"fill-color": {"type":activeSelect.paintType,"property": activeSelect.paintProperty,"stops": activeSelect.paintStops}, "fill-outline-color": "#fff","fill-opacity":0.75}],
          [activeSelect.geography+"-highlighted", 'fill',['all', ["in", "District", ""], ['==', 'FeatType', activeSelect.geography],['==','Year',activeSelect.year]],{"fill-color": '#ff6600',"fill-outline-color": "#fff","fill-opacity":1}]
        ];

        layer.forEach(addLayer) 
    });

    $('#dropyear').on('change', function(e){
        e.preventDefault();
        $('#clear').hide();
        //remove previous selections map methods give an example of how one would toggle layers
        $('#results').html("");
        map.removeLayer(activeSelect.geography+"-"+activeSelect.year);
        map.removeLayer(activeSelect.geography+"-highlighted-"+activeSelect.year);
        spliceArray(activeSelect.geography+"-"+activeSelect.year);
        spliceArray(activeSelect.geography+"-highlighted-"+activeSelect.year);

        activeSelect.year = parseInt($(this).val());
        var layer = [
          [activeSelect.geography,'fill', ['all', ['==', 'year', activeSelect.year], ['==', 'FeatType', activeSelect.geography]],{"fill-color": {"type":activeSelect.paintType,"property": activeSelect.paintProperty,"stops": activeSelect.paintStops}, "fill-outline-color": "#fff","fill-opacity":0.75}],
          [activeSelect.geography+"-highlighted", 'fill',['all', ["in", "District", ""], ['==', 'FeatType', activeSelect.geography],['==','Year',activeSelect.year]],{"fill-color": '#ff6600',"fill-outline-color": "#fff","fill-opacity":1}]
        ];

        layer.forEach(addLayer);
    });

    $('#dropcompactness').on('change', function(e){
      e.preventDefault();
      activeSelect.paintProperty = $(this).val();
      
      // activeSelect.paintStops = [[0, '#ffffcc'],[.25, '#a1dab4'],[.50, '#41b6c4'],[.75, '#2c7fb8'], [1, '#253494']];
      
      
      map.setPaintProperty(activeSelect.geography+"-"+activeSelect.year, 
                          "fill-color", {"type":activeSelect.paintType,
                                            "property": activeSelect.paintProperty,
                                            "stops": activeSelect.paintStops});
    })

  //mousemove is too slow
  map.on('click', function (e) {
    $('#clear').show();
    // console.log(e.point)
    var features = map.queryRenderedFeatures(e.point,{ layers: layersArray }); //queryRenderedFeatures returns an array
    // var feature = features[0];
    var feature = (features.length) ? features[0] : '';
    // console.log(feature.properties);
    // removeLayers('pushpin');
    mapResults(feature);
    showResults(activeSelect, feature.properties);
       
  });

    //show pointer cursor
  map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: layersArray });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    // var feature = (features.length) ? features[0] : '';
    // removeLayers('pushpin');
    // showResults(activeTab, feature.properties);
    // mapResults(feature); 
  });

   //show grab cursor
  map.on('dragstart', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: layersArray });
    map.getCanvas().style.cursor = (features.length) ? 'grab' : '';
  });



    

 }); //end ready