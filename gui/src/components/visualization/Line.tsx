import React, { Component, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { min, max } from 'd3-array';

type LineProps = {
    data: string[]
}

type LineState = {}

export default function Line({data}: LineProps){
    const container: React.RefObject<HTMLDivElement> = useRef(null);

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        data.length > 0 && drawChart(data, container, offset)
    })

    useEffect(() => {
        const handleResize = () => {
          data.length && drawChart(data, container, offset)
        }
        window.addEventListener('resize', handleResize)
    }, [])

    const horizontalScroll = (event: any) => {
        const delta = Math.max(-1, Math.min(1, (event.nativeEvent.wheelDeltaY || -event.nativeEvent.detail)))
        //console.log(data.length)
        setOffset(Math.max(Math.min(offset + delta * 50, data.length-500), 0))
        //console.log(Math.max(Math.min(offset + delta * 10, data.length-500), 0))
    }

    return <div 
        style={{lineHeight: 0, overflowX: "scroll"}} 
        onWheel={horizontalScroll} 
        onScroll={() => drawChart(data, container, offset)} 
        className="chart" ref={container} 
    />

}

const drawChart = (data: string[], containerRef: React.RefObject<HTMLDivElement>, offset: number) => {
    if(!containerRef.current) return
    const modData = data.map(d => +d).filter(d => !isNaN(d))
    const slicedData = modData.slice(offset, offset + 500)
    const {
        clientWidth: _width, 
        clientHeight: _height
    } = containerRef.current

    const margin = {top: 20, right: 30, bottom: 20, left: 60};

    const width = _width - margin.left - margin.right;
    const height = _height - margin.top - margin.bottom;

    const x = scaleLinear()
    .domain([offset, offset + 500])
    .range([0, width]);

    const y = scaleLinear()
    .domain([min(modData) || 0, max(modData) || 0])
    .range([height, 0]);

    const color = scaleLinear<string, string>()
    .range(['#464bb4', '#b4464b'])
    .domain([min(modData) || 0, max(modData) || 0])
    
    const lineChart = line() 
    .x((d,i) => x(i + offset))
    .y((d: any) => y(d))
    .curve(curveMonotoneX)
        
    const div = select("body").append("div")
    .attr("class", "tooltip")					
    .style("opacity", 0);

    select('.chart > *').remove()

    const graph = select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('id', 'svg-chart')
    .append("g")
    .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");
    
    const xGridLines = axisBottom(x)
    const yGridLines = axisLeft(y)

    graph.append("path")
    .datum(slicedData)
    .attr("fill", "none")
    .style("stroke", "steelblue")
    .style("stroke-width", 1.25)
    .attr("d", lineChart as any);

    graph.append("g")
    .attr("class", "grid")
    .attr("color", "white")
    .attr("fill", "white")
    .attr("transform", "translate(0,"+height+")")
    .call(xGridLines.ticks(Math.ceil(slicedData.length / 500) * 10).tickSizeOuter(0))
        
    graph.append("g")
    .attr("class", "grid")
    .style("color", "white")
    //.attr("transform", "translate(" + (_scroll) + ",0)")
    .call(yGridLines.ticks(10, "s").tickSizeOuter(0))

    graph.selectAll(".dot")
    .data(slicedData)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return x(i + offset) })
    .attr("cy", function(d) { return y(d) })
    .attr("r", 3)
    .style("fill", function(d) { return color(d) })
    // .on("mouseover", function(d) {		
        // div.transition()		
        //     .duration(200)		
        // div .style("opacity", .9);		
        // div	.html(d.toPrecision(4))	
        //     .style("left", (d3.event.pageX - 20) + "px")		
        //     .style("top", (d3.event.pageY - 28) + "px");	
        // })					
    // .on("mouseout", function(d) {		
        // div.transition()		
        //     .duration(500)		
        //     .style("opacity", 0);	
    // });


    //#b46e46
}

const tooltip = styled.div`	
    position: absolute;			
    text-align: center;			
    width: 60px;					
    height: 28px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
`