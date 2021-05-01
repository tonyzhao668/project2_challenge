// Creating map object
var myMap = L.map("map", {
  center: [40.41, -3.7],
  zoom: 2
});

// Adding tile layer
var basestreet = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
// });
}).addTo(myMap);

// Load in geojson data
// var geoData = "static/data/Median_Household_Income_2016.geojson";
var countriesexpData = "static/data/mycountries2019ex.geojson";
var exportdata = "static/data/completeexports.json"

var geojson;
var updategeo;

// var darkcolorlist = ["#400202", "#300240", "#020640", "#024034", "#094002", "#2c2102"];
// var lightcolorlist = ["f7f2f3", "#f2f4f7", "#f3f2f7", "#f2f7f7", "#f3f7f2", "f7f6f2"];
// var randomindex = floor(Math.random() * 6);
// var colorset = [lightcolorlist[randomindex], darkcolorlist[randomindex]]; 


// Grab data with d3
d3.json(countriesexpData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "value",

    // Set color scale
    scale: ["#ffffff", "#2e0245"],

    // Number of breaks in step range
    steps: 16,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country/District: " + feature.properties.ADMIN + "<br>Australia Export in:"+feature.properties.year+"<br>" +
        "M$:" + feature.properties.value);
    }
  // });
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
      legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Australia 2019 Export M$</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
  // legend.addTo(geojson);





 // Input fields can trigger a change event when new text is entered.
  // inputField.on("change", function() {
  // var newText = d3.event.target.value;
  // console.log(newText);
  // });

  // var geodata = data;
  // var n;
  // var currentdata;
  // var currentgeodata = geodata;
  // var queryyear;

  // var darkcolorlist = ["#400202", "#300240", "#020640", "#024034", "#094002", "#2c2102"];
  // var lightcolorlist = ["f7f2f3", "#f2f4f7", "#f3f2f7", "#f2f7f7", "#f3f7f2", "f7f6f2"];
  // var randomindex; 
  // var colorset;
  


  // function geodataupdate(wyear) {


  //     randomindex = Math.floor(Math.random() * 6);
  //     colorset = [lightcolorlist[randomindex], darkcolorlist[randomindex]];

  //  console.log(colorset);

  //  var year = wyear;
  //  var key = `y_${year}`; 
  //     n = year - 2019 + 32;
  
  //  // console.log(yeartonum);
  //  console.log(n);
  //  console.log(key);

  //  d3.json(exportdata, function(medadata) {

  //   // console.log("data loaded");
  //   // console.log(medadata[0].y_1987);
  //   currentdata = medadata[n][key];
  

  //   // console.log(currentdata);

  //  //update geodata with enqury year's values
  //   for (var i = 0; i < currentgeodata.features.length; i++) {

  //         currentgeodata.features[i].properties.year = year;
  //         currentgeodata.features[i].properties.value = 0;

  //     for (var j = 0; j < currentdata.length; j ++) {
  //       if (currentgeodata.features[i].properties.ISO_A3 == currentdata[j].iso_a3) {
  //           currentgeodata.features[i].properties.value = currentdata[j].value;
  //           // console.log(currentgeodata.features[i].properties.value);
  //           // console.log(currentdata[j].value);
  //           break;
  //       } 
  //     }
  //   };
  //   console.log(currentgeodata);
  //  });

  
  //  updategeo = L.choropleth(currentgeodata, {

  //   // Define what  property in the features to use
  //   valueProperty: "value",

  //   // Set color scale
  //   scale: colorset,

  //   // Number of breaks in step range
  //   steps: 16,

  //   // q for quartile, e for equidistant, k for k-means
  //   mode: "q",
  //   style: {
  //     // Border color
  //     color: "#fff",
  //     weight: 1,
  //     fillOpacity: 0.8
  //   },

  //   // Binding a pop-up to each layer
  //   onEachFeature: function(feature, layer) {
  //     layer.bindPopup("Country/District: " + feature.properties.ADMIN + "<br>Australia Export in:"+feature.properties.year+"<br>" +
  //       "M$:" + feature.properties.value);
  //   }

  //  });

  //  var legend2 = L.control({ position: "bottomright" });
  //     legend2.onAdd = function() {
  //   var div = L.DomUtil.create("div", "update legend");
  //   var limits2 = updategeo.options.limits;
  //   var colors2 = updategeo.options.colors;
  //   var labels2 = [];

  //   // Add min & max
  //   var legend2Info = `<h1>Australia ${year} Export M$</h1>` +
  //     "<div class=\"labels2\">" +
  //       "<div class=\"min2\">" + limits2[0] + "</div>" +
  //       "<div class=\"max2\">" + limits2[limits2.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legend2Info;

  //   limits2.forEach(function(limit, index) {
  //     labels2.push("<li style=\"background-color: " + colors2[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels2.join("") + "</ul>";
  //   return div;
  // };

  // // legend2.addTo(updategeo);

  // }

  // var baseMaps = {
  //   Streets: basestreet
  // };

  // var overlayMaps = {
  //   Geojson: geojson,
  //   Updategeo: updategeo
  // };

  // L.control.layers(baseMaps, overlayMaps).addTo(myMap);



  // d3.select(".input").on("change", function() {
  //     queryyear = d3.event.target.value;
  //     console.log(queryyear);

  //   if (+queryyear >= 1987 && +queryyear <= 2019) {

  //     geodataupdate(queryyear);

  //   }

  //   });



});
