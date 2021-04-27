
// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

  

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  var data2019;
  var datayearcurrent;
  var datayearprepare;
  var workingdata;


  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 50,
    right: 150,
    left: 150
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  // Read json
  var impdata = "static/data/imports.json";

  d3.json(impdata, function(medaData) {
    
    console.log("data loaded");

    data2019 = medaData[32].y_2019;
    Object.values(data2019).forEach(item => { console.log(item.country, item.iso_a3, item.value)});
    
    workingdata = data2019;
      // parse data
    workingdata.forEach(data => {
        data.value = +data.value;
        console.log(data.value);
      });
    });
  //     // console.log(workingdata.map((d, i) => isNaN(d.value)));

  //     // create scales
  //     var xLinearScale = d3.scaleLinear()
  //       .domain(d3.range([0, d3.max(workingdata, d => d.value)]))
  //       .range([0, width]);

  //     var yBandScale = d3.scaleBand()
  //       .domain(workingdata.map(d => d.country))
  //       .range([height, 0])
  //       .padding(0.1);

  //     // create axes
  //     var xAxis = d3.axisBottom(xLinearScale);
  //     // var yAxis = d3.axisLeft(yBandScale).ticks(30);
  //     var yAxis = d3.axisLeft(yBandScale);

  //     // append axes
  //     chartGroup.append("g")
  //       .attr("transform", `translate(0, ${height})`)
  //       .call(xAxis)
  //       .selectAll("text")
  //       .attr("transform", "translate(-10,0)rotate(-45)")
  //       .style("text-anchor", "end");;

  //     chartGroup.append("g")
  //       .call(yAxis);

  //     bars = chartGroup.selectAll(".bar")
  //       .data(workingdata)
  //       .enter()
  //       // .append("g")
  //       .append("rect")
  //       .attr("class", "bar")
  //       .attr("y", d => yBandScale(d.country))
  //       .attr("height", yBandScale.bandwidth())
  //       // .attr("x", function (d) {
  //       //   return xLinearScale(d.value)})
  //       .attr("x", xLinearScale(+0))
  //       .attr("width", d => xLinearScale(+d.value))
  //       .attr("fill", "#69b3a2");

  //     //add a value label to the right of each bar
  //     bars.append("text")
  //       .attr("class", "label")
  //       //y position of the label is halfway down the bar
  //       .attr("y", d => {
  //         return yBandScale(d.country) + yBandScale.bandwidth() / 2 + 4;
  //         // return yBandScale(d.country) + 5;
  //       })
  //       //x position is 3 pixels to the right of the bar
  //       .attr("x", d => {
  //         return xLinearScale(+d.value) + 3;
  //       })
  //       .text(d => +d.value);


  //     // Step 1: Initialize Tooltip
  //     // var toolTip = d3.tip()
  //     //   .attr("class", "tooltip")
  //     //   .offset([80, -60])
  //     //   .html(function(d) {
  //     //     return (`<strong>${(d.country)}<strong><hr>M$${d.value}`);
  //     //   });

  //     // // Step 2: Create the tooltip in chartGroup.
  //     // chartGroup.call(toolTip);

  //     // // Step 3: Create "mouseover" event listener to display tooltip
  //     // bars.on("mouseover", function(d) {
  //     //   toolTip.show(d, this);
  //     // })
  //     // // Step 4: Create "mouseout" event listener to hide tooltip
  //     //   .on("mouseout", function(d) {
  //     //     toolTip.hide(d);
  //     //   });

  // });
  // }).catch(function(error) {
  //     console.log(error);
  //     });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

