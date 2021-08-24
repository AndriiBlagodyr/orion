/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import * as d3 from 'd3';

export const ScatterPlot = () => {
  useEffect(async () => {
    // 1. Dataset
    const dataset = await d3.json('/my_weather_data.json');

    const xAccessor = d => d.dewPoint;
    const yAccessor = d => d.humidity;
    const colorAccessor = d => d.cloudCover;

    // 2. Create chart dimensions
    // d3.min vs Math.min. d3.min works with arrays, return min number if null or undefunde are in array
    // returns underfined for empty array

    const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9]);
    const dimensions = {
      width,
      height: width,
      margin: {
        top: 10,
        right: 10,
        bottom: 50,
        left: 50,
      },
    };
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // 3. Draw canvas

    const wrapper = d3
      .select('#wrapper')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);
    // .style('border', '1px solid red');

    const bounds = wrapper
      .append('g')
      .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

    // 4. Create scales

    const xScale = d3.scaleLinear().domain(d3.extent(dataset, xAccessor)).range([0, dimensions.boundedWidth]).nice(); // !IMPORTANT FEATURE

    // [-7.22, 73.83] - min/max values without nice()
    // [-10, 80] - min/max values with nice()
    console.log(xScale.domain());

    const yScale = d3.scaleLinear().domain(d3.extent(dataset, yAccessor)).range([dimensions.boundedHeight, 0]).nice(); // !IMPORTANT FEATURE

    const colorScale = d3.scaleLinear().domain(d3.extent(dataset, colorAccessor)).range(['skyblue', 'darkslategrey']);
    console.log(colorScale.domain());
    console.log(colorScale(0));
    // 5. Draw data

    const dots = bounds
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(xAccessor(d)))
      .attr('cy', d => yScale(yAccessor(d)))
      .attr('r', 4)
      .attr('fill', d => colorScale(colorAccessor(d)))
      .attr('tabindex', '0');

    // 6. Draw peripherals

    const xAxisGenerator = d3.axisBottom().scale(xScale);

    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`);

    const xAxisLabel = xAxis
      .append('text')
      .attr('x', dimensions.boundedWidth / 2)
      .attr('y', dimensions.margin.bottom - 10)
      .attr('fill', 'black')
      .style('font-size', '1.4em')
      .html('Dew point (&deg;F)');

    const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(4);

    const yAxis = bounds.append('g').call(yAxisGenerator);

    const yAxisLabel = yAxis
      .append('text')
      .attr('x', -dimensions.boundedHeight / 2)
      .attr('y', -dimensions.margin.left + 10)
      .attr('fill', 'black')
      .style('font-size', '1.4em')
      .text('Relative humidity')
      .style('transform', 'rotate(-90deg)')
      .style('text-anchor', 'middle');
  }, []);

  return <div id="wrapper"></div>;
};
