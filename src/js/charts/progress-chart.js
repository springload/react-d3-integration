'use strict';

import d3 from 'd3';
import Chart from './chart';
import formatters from '../util/formatters';

export default class ProgressChart extends Chart {

    // First step of the D3 rendering.
    create() {
        const svg = super.createRoot();

        svg.append('g')
            .attr('class', 'bar')
            .attr('width', this.props.width);

        svg.append('g')
            .attr('class', 'bar-label');
    }

    // Main D3 rendering, that should be redone when the data updates.
    update(state) {
        const scales = this._scales(state.domain);

        const data = state.data.map((d, i) => {
            d.prevX = scales.x(i === 0 ? 0 : state.data[i - 1].value);
            return d;
        });

        this._drawBar(scales, data);
        this._drawLabel(scales, data.filter((d, i) => i < 2));
    }

    // Generates our D3 scales.
    _scales(domain) {
        const x = d3.scale.linear()
            .rangeRound([0, this.props.width])
            .domain(domain);

        return {x: x};
    }

    // Draws our bars and rectangles for our bar chart.
    _drawBar(scales, data) {
        const bar = d3.select(this.el).selectAll('.bar');

        const rect = bar.selectAll('rect')
            .data(data);

        // Enter.
        rect.enter().append('rect')
            .attr('class', d => d.cssClass);

        // Enter & update.
        rect.transition()
            .attr('x', d => d.prevX)
            .attr('width', d => Math.max(0, scales.x(d.value) - d.prevX))
            .attr('height', this.props.height);

        // Exit
        rect.exit()
            .remove();
    }

    // Draws the label on top of the bars.
    _drawLabel(scales, val) {
        const numbers = formatters.vagueMoneyRange(val[0].value, val[1].value);
        const label = d3.select(this.el).selectAll('.bar-label');

        const range = label.selectAll('.money-range')
            .data([numbers]);

        range.enter().append('text')
            .attr('class', 'money-range')
            .attr('y', 20)
            .attr('x', 15);

        range.text(d => d);

        range.exit().remove();
    }
}
