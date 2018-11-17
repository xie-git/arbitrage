import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import  * as d3  from 'd3'

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
    var data = [1, 1, 2, 3, 5, 8, 13];

    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");
    
    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;
    
    var colors = [
      "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
      "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];
    
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70)
        .padAngle(0.03)
        .context(context);
    
    var pie = d3.pie();
    
    var arcs = pie(data);
    
    context.translate(width / 2, height / 2);
    
    context.globalAlpha = 0.5;
    arcs.forEach(function(d, i) {
      context.beginPath();
      arc(d);
      context.fillStyle = colors[i];
      context.fill();
    });
    
    context.globalAlpha = 1;
    context.beginPath();
    arcs.forEach(arc);
    context.lineWidth = 1.5;
    context.stroke();
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default BarChart
