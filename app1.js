// Define SVG area dimensions
var svgWidth = 1200;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 30,
  bottom: 50,
  left: 150
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select(".chart")
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
var year;
var countrycolor = {};


// Load data from hours-of-tv-watched.csv
d3.json("imports.json", function(medaData) {

    // console.log("data loaded");
    //default year = 2019

    data2019 = medaData[32].y_2019;
    year = 2019; 
    //workingdata = data2019.reverse().slice(18, 30);
    workingdata = data2019.slice(0, 12);
    // console.log(workingdata);
    // console.log("workingdata");
    

    // Object.values(data2019).forEach(item => { console.log(item.country, item.iso_a3, item.value)});

    // Cast the hours value to a number for each piece of tvData
    workingdata.forEach(function(d) {
    d.value = +d.value;
    });

    // console.log(d3.max(workingdata, d => d.value));
    // Configure a band scale for the horizontal axis 
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(workingdata.map(d => d.value))])
      .range([0, chartWidth])
         

  // Create a linear scale for the vertical axis
    var yBandScale = d3.scaleBand()
      .domain(workingdata.map(d => d.country))
      .range([0, chartHeight])
      .padding(0.1);

    // console.log(xLinearScale(1000));
    // console.log(yBandScale(workingdata.map(d => d.country)));

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var topAxis = d3.axisTop(xLinearScale);
  var leftAxis = d3.axisLeft(yBandScale);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis)
    .classed("myyaxis", true); 

  chartGroup.append("g")
    //.attr("transform", `translate(0, ${chartHeight})`)
    .attr("transform", `translate(0, 0)`)
    .call(topAxis)
    .classed("myxaxis", true);

  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

  function getcountrycolor(n) {
    if (n in countrycolor) {
          console.log("yes");
    }
    else {countrycolor[n] = getRandomColor()}
  }

  //get each country a color
  workingdata.forEach(function(d) {
    getcountrycolor(d.iso_a3);
    });

  // console.log(countrycolor);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  var bars = chartGroup.selectAll(".bar")
    .data(workingdata)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", xLinearScale(0))
    .attr("y", d => yBandScale(d.country))
    .attr("width", d => xLinearScale(d.value))
    .attr("height", yBandScale.bandwidth())
    .attr("fill", d => countrycolor[d.iso_a3])
    .classed("mybar", true);

  // bars.append("g")
   chartGroup.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .selectAll("text")
    .data(workingdata)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.value))
    .attr("y", d => yBandScale(d.country) + yBandScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", "-10")
    .text(d => (d.value))
    .classed("mylabel", true);

    // //shadow effect building
    // var defs = bars.append("defs");  
    // var filter = defs.append("filter")
    //   .attr("id", "drop-shadow")
    //   .attr("height", "130%");

    // filter.append("feGaussianBlur")
    //   .attr("in", "SourceAlpha")
    //   .attr("stdDeviation", 3)
    //   .attr("result", "blur");
    
    // filter.append("feOffset")
    //   .attr("in", "blur")
    //   .attr("dx", 5)
    //   .attr("dy", 6)
    //   .attr("result", "offsetBlur");

    // var feMerge = filter.append("feMerge");
    //   feMerge.append("feMergeNode")
    //       .attr("in", "offsetBlur");
    //   feMerge.append("feMergeNode")
    //       .attr("in", "SourceGraphic");

    
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth * 3 / 5}, ${chartHeight * 6/7})`)
        .classed("myyearlabel", true);

    var yearLabel = labelsGroup.append("text")
        .attr("x", -50)
        .attr("y", 0)
        .attr("value", "year") // value to grab for event listener
        .classed("mytext", true)
        .text(`Australia Import(M$) in: ${year}`)
        .style("font-size", "34px")
        .attr("font-family", "sans-serif");

    var yearlist = [];

    for (var i = 1987; i < 2020; i ++) {
        yearlist.push(i);
        // console.log(i);
      };
       
    // console.log(yearlist);

    var counter = 0;
    var mykey;
    var currentdata;
    var i = 0;

    d3.select('div')
        .on('click', function() { 
          console.log("I've been clicked!");

    d3.event.preventDefault();
      
       i > 33 ? i === 0 : i === i;

    // for (var i = 0; i < 33; i++ ){

        
        mykey = "";


         mykey = `y_${yearlist[i]}`;
         year = yearlist[i];
         currentdata = medaData[i][mykey];

      // console.log(currentdata);


      // console.log(mykey);
      console.log(year);
      // console.log("before slice");
      // console.log(currentdata);

      currentdata = currentdata.slice(0, 12);
      console.log(currentdata);


    //  console.log("after slice");
    //   console.log(currentdata);

      //get each country a color
      currentdata.forEach(function(d) {
          getcountrycolor(d.iso_a3);
          });
      
      currentdata.forEach(function(d) {
            d.value = +d.value;
            });

      var xnew = d3.scaleLinear()
            .domain([0, d3.max(currentdata.map(d => d.value))])
            .range([0, chartWidth])
               
      
        // Create a linear scale for the vertical axis
      var ynew = d3.scaleBand()
            .domain(currentdata.map(d => d.country))
            .range([0, chartHeight])
            .padding(0.1);

      var ntopAxis = d3.axisTop(xnew);
      var nleftAxis = d3.axisLeft(ynew);
          
      chartGroup.selectAll(".myyaxis")
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .call(nleftAxis);

      chartGroup.selectAll(".myxaxis")
        //.attr("transform", `translate(0, ${chartHeight})`)
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .call(ntopAxis)

      chartGroup.selectAll(".mybar")
        .data(currentdata)
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .delay(function(d,i){return(i*3)})
        .attr("x", xnew(0))
        .attr("y", d => ynew(d.country))
        .attr("width", d => xnew(d.value))
        .attr("height", ynew.bandwidth())
        .attr("fill", d => countrycolor[d.iso_a3]);
    
      chartGroup.selectAll(".mylabel")
        .data(currentdata)
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .delay(function(d,i){return(i*3)})
        .attr("x", d => xnew(d.value))
        .attr("y", d => ynew(d.country) + ynew.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", "-10")
        .text(d => (d.value));
    
      labelsGroup.selectAll(".mytext")
         .data([0])
         .transition()
         .ease(d3.easeLinear)
         .duration(2000)
         .delay(function(d,i){return(i*3)})
         .text(`Australia Import(M$) in: ${year}`);

      currentdata = [];
        
      i += 1;

    //  }  
      
      });

});