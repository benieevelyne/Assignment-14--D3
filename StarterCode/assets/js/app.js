// Step 1: Set up our chart
//= ================================
var svgWidth = 1200;
var svgHeight = 800;

var margin = {
  top: 5,
  right: 40,
  bottom: 40,
  left: 75
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data
// =================================
d3.csv("data/data.csv", function (error, dataFile) {
  if (error) throw error;

  // Step 4: Parse the data

  // Format the data
  dataFile.forEach(function (data) {
    data.abbr = data.abbr;
    console.log(data.abbr)
    data.moved_fromabroad = +data.moved_fromabroad;
    data.college_educ= +data.college_educ;
  });

  console.log(dataFile)

  // Step 5: Create Scales
  //= ============================================
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataFile, d => d.moved_fromabroad)])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([15, 50])
    .range([height, 0]);

  // Step 6: Create Axes
  // =============================================
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);


  // Step 7: Append the axes to the chartGroup - ADD STYLING
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // add y-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, 0)`) 
    .call(leftAxis);


  // Step 8: Set up circle generator with text
  // ==============================================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(dataFile)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.moved_fromabroad))
  .attr("cy", d => yScale(d.college_educ))
  .attr("r", "10")
  .attr("fill", "rgb(174, 214, 241)")
  .attr("stroke","grey");


  var textGroup = chartGroup.selectAll("merp")
  .data(dataFile)
  .enter()
  .append("text")
  .attr("x", d => xScale(d.moved_fromabroad))
  .attr("y", d => yScale(d.college_educ-.1))
  .attr("text-anchor", "middle")
  .attr("font-size","10px")
  .text(d => d.abbr);

  // Step 9: Add titles

  chartGroup.append("text")
    .attr("transform",`translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("% Population Moved from Abroad within the last year");

  chartGroup.append("text")
    .attr("transform",`translate(-40, ${(height + margin.top) / 2}) rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("% Population with College+ Education");
});
