import React, {useEffect} from 'react';
import * as d3 from 'd3';

export const Circles = () => {
  const data = [25, 20, 10, 12, 15];
  useEffect(() => {
    const svg = d3.select('#chart-area').append('svg').attr('width', 400).attr('height', 400);

    const circles = svg.selectAll('circle').data(data);

    circles
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * 50 + 50)
      .attr('cy', 250)
      .attr('r', d => d)
      .attr('fill', 'red');
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div id="chart-area"></div>
      </div>
    </div>
  );
};
