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
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
 
var data2019;
var datayearcurrent;
var datayearprepare;
var workingdata;
var currentdata;


// Load data from top25imports.json
d3.json("top25imports.json", function(medaData) {

    // console.log("data loaded");
    //default year = 2019

    data2019 = medaData[4].y_2019;
    currentyear = 2019; 
    currentdata = data2019;

    Object.values(currentdata).forEach(item => { console.log(item.commodities, item.iso_a3, item.value)});

    // Cast the hours value to a number for each piece of workingdata
    currentdata.forEach(function(d) {
    d.value = +d.value;
    });

  // X axis
  var x = d3.scaleBand()
    .range([ 0, chartWidth ])
    .domain(currentdata.map(function(d) { return d.commodities; }))
    .padding(1);

  chartGroup.append("g")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .attr("font-weight", 700)
      .classed("myxaxis", true);

  // Add Y axis
  var y = d3.scaleLinear()
      .domain([0, 47000])
      .range([ chartHeight, 0]);
  chartGroup.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-weight", 700)
      .classed("myyaxis", true);
    

  // Lines
chartGroup.selectAll("myline")
  .data(currentdata)
  .enter()
  .append("line")
  .attr("x1", function(d) { return x(d.commodities); })
  .attr("x2", function(d) { return x(d.commodities); })
  .attr("y1", function(d) { return y(d.value); })
  .attr("y2", y(0))
  .attr("stroke", "grey")
  .attr("stroke-width", 10)
  .classed("myline", true)

// Circles
chartGroup.selectAll("mycircle")
  .data(currentdata)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.commodities); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", "15")
    .style("fill", "#ef2525")
    .attr("stroke", "black")
    .classed("mycircle", true)

var labelGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth * 2 / 5}, ${chartHeight * 1/7})`);
 
labelGroup.append("text")
  .attr("x", 0)
  .attr("y", 0)
  .attr("value", "year") // value to grab for event listener
  // .classed("active", true)
  .text(`Australia Top 25 Import Commodities(M$) in: ${currentyear}`)
  .style("font-size", "25px")
  .attr("font-family", "sans-serif")
  .attr("font-weight", 700)
  .classed("mylabel", true);

 d3.selectAll("body").on("change", updatePage); //updatePage is a funtion

  var updatedata;
  var myindex;
  var mykey;
  var updateyear;
 
  
  function updatePage() {
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.selectAll("#selectOption").node();
      // Assign the dropdown menu item ID to a variable
      // var dropdownMenuID = dropdownMenu.id;
      // Assign the dropdown menu option to a variable
      var selectedOptionvalue = dropdownMenu.value;
      
      myindex = (+selectedOptionvalue) - 2019 + 4;
      mykey = `y_${selectedOptionvalue}`;

      updatedata = [];

      updateyear = + selectedOptionvalue;
      updatedata = medaData[myindex][mykey];

      d3.event.preventDefault();

      updatedata.forEach(function(d) {
        d.value = +d.value;
        });

      var xnew  = d3.scaleBand()
        .range([ 0, chartWidth ])
        .domain(updatedata.map(function(d) { return d.commodities; }))
        .padding(1);
      
      chartGroup.select(".myxaxis")
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .call(d3.axisBottom(xnew))
        
      chartGroup.selectAll(".myline")
        .data(updatedata)
        .transition()
        .ease(d3.easeLinear)
        //.ease(d3.easeBounce)
        //.ease(d3.easeSin)
        .delay(function(d,i){return(i*3)})
        .duration(2000)
        .attr("x1", function(d) { return xnew(d.commodities); })
        .attr("x2", function(d) { return xnew(d.commodities); })
        .attr("y1", function(d) { return y(d.value); })
        .attr("y2", y(0))
      
      chartGroup.selectAll(".mycircle")
        .data(updatedata)
        .transition()
        .ease(d3.easeLinear)
        .delay(function(d,i){return(i*3)})
        .duration(2000)
        .attr("cx", function(d) { return xnew(d.commodities); })
        .attr("cy", function(d) { return y(d.value); })
        .attr("r", "15")
        .style("fill", "#66ff00")
        .attr("stroke", "black")

      chartGroup.selectAll(".mylabel")
        .transition()
        .ease(d3.easeLinear)
        .text(`Australia Top 25 Import Commodities(M$) in: ${updateyear}`)
 
      // console.log(updateyear);
      // Object.values(updatedata).forEach(item => { console.log(item.commodities, item.iso_a3, item.value)});
      
    }

});

