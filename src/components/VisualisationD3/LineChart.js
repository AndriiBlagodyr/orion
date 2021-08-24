/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import * as d3 from 'd3';

export const LineChart = () => {
  useEffect(async () => {
    const dataset = await d3.json('/my_weather_data.json');
    console.log(dataset);

    const yAccessor = d => d.temperatureMax;
    console.log(yAccessor(dataset[0]));
    const parseDate = d3.timeParse('%Y-%m-%d');

    const xAccessor = d => parseDate(d.date);
    console.log(xAccessor(dataset[0]));

    const dimensions = {
      width: window.innerWidth * 0.9,
      height: 400,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
      },
    };
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const wrapper = d3
      .select('#wrapper')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    const bounds = wrapper
      .append('g')
      .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

    const yScale = d3
      .scaleLinear()
      // .domain([0, 100])
      .domain(d3.extent(dataset, yAccessor)) // domain defines an input space. Possibly to guess value like [0,100]
      .range([dimensions.boundedHeight, 0]); // range defines an outut space
    console.log(yScale(100)); //0, 50. The hight is 345 pixels...
    console.log(d3.extent(dataset, yAccessor)); // [13.02, 94.21] - min/max temperature from dataset

    const freezingTemperaturePlacement = yScale(32);
    const freezingTemperatures = bounds
      .append('rect')
      .attr('x', 0)
      .attr('width', dimensions.boundedWidth)
      .attr('y', freezingTemperaturePlacement)
      .attr('height', dimensions.boundedHeight - freezingTemperaturePlacement)
      .attr('fill', '#e0f3f3');

    const xScale = d3.scaleTime().domain(d3.extent(dataset, xAccessor)).range([0, dimensions.boundedWidth]);

    const lineGenerator = d3
      .line()
      .x(d => xScale(xAccessor(d)))
      .y(d => yScale(yAccessor(d)));

    const line = bounds
      .append('path')
      .attr('d', lineGenerator(dataset))
      .attr('fill', 'none')
      .attr('stroke', '#af9358')
      .attr('stroke-width', 2);

    const yAxisGenerator = d3.axisLeft().scale(yScale);

    const yAxis = bounds.append('g').call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom().scale(xScale);

    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`);
  }, []);

  return <div id="wrapper"></div>;
};
