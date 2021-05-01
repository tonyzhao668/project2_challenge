// Define SVG area dimensions
var svgWidth = 1200;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 150,
  left: 150
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", "translate(700, 300)");


var arc = d3.arc()
    .innerRadius(150)
    .outerRadius(220)
    .startAngle(0)
    .endAngle(function(t) { return t * 2 * Math.PI / 3; });

chartGroup.append("path")
  .attr("id", "path")
  .attr("d", arc(1));


chartGroup.append("text")
    .attr("x", 8)
    .attr("dy", 40)
  .append("textPath")
    .attr("class", "textpath")
    .attr("xlink:href", "#path")
    .text("Your comments & questions are welcome!")
    .style("font", "30px")
    .attr("fill", "#fcfcfc");

    var transition = svg.transition()
    .duration(5000);

transition.selectAll("#path")
    .attrTween("d", function() { return arc; });

transition.selectAll(".textpath")
    .attrTween("xlink:href", function() { return function() { return "#path"; }; });

svgguy = svg
    .append("svg")
    .attr("width", "900")
    .attr("height", "800")
    .attr("transform", "translate(100, 100)")
    .style("border", "1px solid black");

var text = svgguy.selectAll("text")
    .data([0])
    .enter()
    .append("text")
    .text("Thank you!")
    .attr("x", "600")
    .attr("y", "300")
    .style("font", "100px")
    // .attr("fill", "")
    .attr("font-weight", 700);

var imgs = svgguy.selectAll("image").data([0]);

var width1 = 180;
var height1 = 600;

    imgs.enter()
      .append("image")
      //.attr("xlink:href", "file:guy.svg")
      .attr("xlink:href", "ok.svg")
      .attr("x", "350")
      .attr("y", "70")
      // .attr("width", "200")
      // .attr("height", "600")
      .style("width", width1 + 'px')
      .style("height", height1 + 'px');



  
// var data2019;
// var datayearcurrent;
// var datayearprepare;
// var workingdata;
// var year;


// // Load data from top25imports.json
// d3.json("top25imports.json", function(medaData) {

//     // console.log("data loaded");
//     //default year = 2019

//     data2019 = medaData[4].y_2019;
//     year = 2019; 
//     workingdata = data2019;

//     // Object.values(data2019).forEach(item => { console.log(item.commodities, item.iso_a3, item.value)});

//     // Cast the hours value to a number for each piece of workingdata
//     workingdata.forEach(function(d) {
//     d.value = +d.value;
//     });

//   // X axis
//   var x = d3.scaleBand()
//     .range([ 0, chartWidth ])
//     .domain(workingdata.map(function(d) { return d.commodities; }))
//     .padding(1);

//   chartGroup.append("g")
//       .attr("transform", "translate(0," + chartHeight + ")")
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .attr("transform", "translate(-10,0)rotate(-45)")
//       .style("text-anchor", "end")
//       .attr("font-weight", 700);

//   // Add Y axis
//   var y = d3.scaleLinear()
//       .domain([0, 33400])
//       .range([ chartHeight, 0]);
//   chartGroup.append("g")
//       .call(d3.axisLeft(y))
//       .selectAll("text")
//       .attr("font-weight", 700);
    

//   // Lines
// chartGroup.selectAll("myline")
//   .data(workingdata)
//   .enter()
//   .append("line")
//   .attr("x1", function(d) { return x(d.commodities); })
//   .attr("x2", function(d) { return x(d.commodities); })
//   .attr("y1", function(d) { return y(d.value); })
//   .attr("y2", y(0))
//   .attr("stroke", "grey")
//   .attr("stroke-width", 10)



// // Circles
// chartGroup.selectAll("mycircle")
//   .data(workingdata)
//   .enter()
//   .append("circle")
//     .attr("cx", function(d) { return x(d.commodities); })
//     .attr("cy", function(d) { return y(d.value); })
//     .attr("r", "15")
//     .style("fill", "#ef2525")
//     .attr("stroke", "black")

// var labelGroup = chartGroup.append("g")
//     .attr("transform", `translate(${chartWidth * 2 / 5}, ${chartHeight * 1/7})`);
 
// labelGroup.append("text")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("value", "year") // value to grab for event listener
//   .classed("active", true)
//   .text(`Australia Top 25 Import Commodities(M$) on: ${year}`)
//   .style("font-size", "25px")
//   .attr("font-family", "sans-serif")
//   .attr("font-weight", 700);

// });