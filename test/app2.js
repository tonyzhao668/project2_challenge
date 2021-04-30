// Define SVG area dimensions
var svgWidth = 1200;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 30,
  bottom: 10,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
var innerRadius = 70;
var outerRadius = Math.min(chartWidth, chartHeight) / 2;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  // .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
  .attr("transform", "translate(" + (chartWidth / 2 + chartMargin.left) + "," + (chartHeight / 2 + chartMargin.top) + ")");

d3.selectAll("body").on("change", updatePage); //update is a funtion

  function updatePage() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selectOption").node();
    // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
  
    console.log(dropdownMenuID);
    console.log(selectedOption);
  }  

var data2019;
var datayearcurrent;
var datayearprepare;
var workingdata;
var year;


// Load data from hours-of-tv-watched.csv
d3.json("top25exports.json", function(medaData) {

    //console.log("data loaded");
    // default year = 2019

    data2019 = medaData[4].y_2019;
    year = 2019; 
    workingdata = data2019;

    Object.values(data2019).forEach(item => { console.log(item.commodities, item.value)});

    // Cast the hours value to a number for each piece of tvData
    workingdata.forEach(function(d) {
    d.value = +d.value;
    });


  // Scales
  var x = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing
    .domain(workingdata.map(function(d) { return d.commodities; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])   // Domain will be define later.
    .domain([0, 102870]); // Domain of Y is from 0 to the max seen in the data

  // var myRadialAxis = d3.axisRadialInner(y); 

  // svg.append("g").call(myRadialAxis)
  //   .classed("myradialaxis", true);;


  // Add the bars
  chartGroup.append("g")
    .selectAll("path")
    .data(workingdata)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d.value); })
          .startAngle(function(d) { return x(d.commodities); })
          .endAngle(function(d) { return x(d.commodities) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))
    .classed("mypath", true);
  
  // Add the labels
  chartGroup.append("g")
    .selectAll("g")
    .data(workingdata)
    .enter()
    .append("g")
      .attr("text-anchor", function(d) { return (x(d.commodities) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
      .attr("transform", function(d) { return "rotate(" + ((x(d.commodities) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.value)+10) + ",0)"; })
    .append("text")
      .text(function(d){return(d.commodities)})
      .attr("transform", function(d) { return (x(d.commodities) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
      .style("font-size", "11px")
      .attr("alignment-baseline", "middle")
      .attr("font-weight", 700)
      .classed("mylabel", true);

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
      .text(`Australia Top 25 Export Commodities(M$) in: ${year}`)
      .attr("x", "600")
      .attr("y", "700")
      .style("font", "50px")
      .attr("fill", "")
      .attr("font-weight", 700)
      .classed("mytext", true);

//   var labelGroup = svg.append("g")
//             .attr("transform", `translate(${chartWidth * 3 / 5}, ${chartHeight * 5/7})`);
         
  
    // labelGroup.append("text")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("value", "year") // value to grab for event listener
    //   .classed("active", true)
    //   .text(`Australia Top 25 Export Commodities in: ${year}`)
    //   .style("font-size", "25px")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-weight", 700);

  var updatedata;
  var myindex;
  var mykey;
  var updateyear;

d3.selectAll("body").on("change", updatePage); //updatePage is a funtion
  
    function updatePage() {
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.selectAll("#selectOption").node();
      // Assign the dropdown menu item ID to a variable
      var dropdownMenuID = dropdownMenu.id;
      // Assign the dropdown menu option to a variable
      var selectedOptionvalue = dropdownMenu.value;
      console.log(dropdownMenuID);
      console.log(selectedOptionvalue);

      myindex = (+selectedOptionvalue) - 2019 + 4;
      mykey = `y_${selectedOptionvalue}`;

      updatedata = [];

      updateyear = + selectedOptionvalue;
      updatedata = medaData[myindex][mykey];

      d3.event.preventDefault();

      updatedata.forEach(function(d) {
        d.value = +d.value;
        });

      console.log(updatedata);
      
      var xnew = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(updatedata.map(function(d) { return d.commodities; }));

      var ynew = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, d3.max(updatedata.map(d => d.value))]);

        // var myAngleScale = d3.scaleLinear()
        // .domain([-10, 10])
        // .range([-Math.PI, Math.PI]);
        // var myRadius = 100;
        // var nmyRadialAxis = d3.axisRadialInner(ynew);
        //     svg.select(".myradialaxis").call(nmyRadialAxis);

      chartGroup.selectAll(".mypath")
        .data(updatedata)
        .transition()
        .ease(d3.easeLinear)
        .delay(function(d,i){return(i*3)})
        .duration(2000)
          .attr("fill", "#00ffe1")
          .attr("d", d3.arc()     // imagine your doing a part of a donut plot
              .innerRadius(innerRadius)
              .outerRadius(function(d) { return ynew(d.value); })
              .startAngle(function(d) { return xnew(d.commodities); })
              .endAngle(function(d) { return xnew(d.commodities) + xnew.bandwidth(); })
              .padAngle(0.01)
              .padRadius(innerRadius));

      chartGroup.selectAll(".mylabel")
                .data(updatedata)
                .transition()
                .ease(d3.easeLinear)
                .delay(function(d,i){return(i*3)})
                .duration(2000)
                .attr("text-anchor", function(d) { return (xnew(d.commodities) + xnew.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
                .attr("transform", function(d) { return "rotate(" + ((xnew(d.commodities) + xnew.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (ynew(d.value)+10) + ",0)"; })
                .text(function(d){return(d.commodities)})
                .attr("transform", function(d) { return (xnew(d.commodities) + xnew.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
                
      svgguy.selectAll("mytext")
                .data([0])
                .text(`Australia Top 25 Export Commodities(M$) in: ${updateyear}`);

      
    }
    

});
 
  
