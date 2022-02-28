/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file
// const yTooltipOffset = 15;



d3.csv("data/scatter.csv").then((data3) => {

    const svg3 = d3.select("#csv-scatter")
        .append("svg")
        .attr("width", width-margin.left-margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    let maxY1 = d3.max(data3, function(d) { return d.score; });

    let yScale1 = d3.scaleLinear()
        .domain([0,maxY1])
        .range([height - margin.bottom, margin.top]);

    let xScale1 = d3.scaleBand()
        .domain(d3.range(data3.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale1))
        .attr("font-size", '20px');

    svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale1)
            .tickFormat(i => data3[i].day))
        .attr("font-size", '20px');

    // TODO: What does each line of this code do?
    const tooltip1 = d3.select("#csv-scatter")
        .append("div")
        .attr('id', "tooltip1")
        .style("opacity", 0)
        .attr("class", "tooltip");

// TODO: What does each line of this code do?
    const mouseover1 = function(event, d) {
        tooltip1.html("Name: " + d.day + "<br> Score: " + d.score + "<br>")
            .style("opacity", 1);
    }

// TODO: What does each line of this code do?
    const mousemove1 = function(event, d) {
        tooltip1.style("left", (event.pageX)+"px")
            .style("top", (event.pageY + yTooltipOffset) +"px");
    }

// TODO: What does this code do?
    const mouseleave1 = function(event, d) {
        tooltip1.style("opacity", 0);
    }

    // d3.csv parses a csv file and passes the data
    // to an anonymous function. Note how we build
    // our visual inside of this anonymous function

    // let's check our data
    console.log(data3);

    // add our circles with styling
    svg3.selectAll("circle")
        .data(data3) // this is passed into the anonymous function
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => { return xScale1(i); }) // use x for cx
        .attr("cy", (d) => { return yScale1(d.score); }) // use y for cy
        .attr("r", 10)  // set r
        .attr("fill", (d) => { return d.color; }) // fill by color
        .on("mouseover", mouseover1)
        .on("mousemove", mousemove1)
        .on("mouseleave", mouseleave1);

});





