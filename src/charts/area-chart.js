import d3 from 'd3';
import Chart from './chart.js';

export default class AreaChart extends Chart {

    create() {
        const svg = super.createRoot();

        svg.append('g')
            .attr('class', 'areas');

        svg.append('g')
            .attr('class', 'lines');

        svg.append('g')
            .attr('class', 'x-axis axis')
            .attr('transform', 'translate(0,' + this.props.height + ')')
        .append('text')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .attr('transform', 'translate(' + this.props.width + ', 0)')
            .text(' ');

        svg.append('g')
            .attr('class', 'y-axis axis')
        .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text(' ');

        svg.append('g')
            .attr('class', 'retirement-mark mark axis')
        .append('text')
            .attr('y', (this.props.height + 10))
             .attr('dy', '.71em')
            .style('text-anchor', 'middle')
            .text('Retirement');

    }

    update(state) {
        const scales = this._scales(state.data, state.domain);

        this._drawAxis(scales);
        this._drawMark(scales, state.retirementAge);
        this._drawAreas(scales, state.data);
        this._drawLines(scales, state.data);
    }

    _scales(data, domain) {
        const x = d3.scale.linear()
            .range([0, this.props.width])
            .domain(domain.age);

        const y = d3.scale.linear()
            .range([this.props.height, 0])
            .domain(domain.balance);

        return {x: x, y: y};
    }

    _drawAreas(scales, data) {
        const areas = d3.select(this.el).selectAll('.areas');

        const interpolation = d3.svg.area()
            .interpolate('linear')
            .x(function(d) { return scales.x(d.age); })
            .y0(this.props.height)
            .y1(function(d) { return scales.y(d.savings); });

        const area = areas.selectAll('.area')
            .data(data);

        area.enter().append('path');

        area.attr('class', (d) => { return 'area ' + d.cssClass; })
            .transition()
            .attr('d', (d) => { return interpolation(d.values); });

        area.exit()
            .remove();
    }

    _drawLines(scales, data) {
        const lines = d3.select(this.el).selectAll('.lines');

        const lineFunction = d3.svg.line()
            .x(function(d) { return scales.x(d.age); })
            .y(function(d) { return scales.y(d.savings); });

        const line = lines.selectAll('.line')
            .data(data);

        line.enter().append('path');

        line.transition()
            .attr('class', (d) => { return 'line ' + d.cssClass; })
            .attr('d', (d) => { return lineFunction(d.values); });

        line.exit()
            .remove();
    }

    _drawAxis (scales) {
        const xAxis = d3.svg.axis()
            .orient('bottom')
            .scale(scales.x);

        const yAxis = this.createYAxis(scales.y);

        d3.select(this.el).selectAll('.x-axis')
            .transition()
            .call(xAxis);

        d3.select(this.el).selectAll('.y-axis')
            .transition()
            .call(yAxis)
            .call(this.overrideYAxis());
    }

    // TODO Should be a broader list of "marks".
    _drawMark(scales, retirementAge) {

        const axis = d3.svg.axis()
            .orient('right')
            .scale(scales.y)
            .ticks(0)
            .tickSize(0);

        d3.select(this.el).selectAll('.retirement-mark')
            .transition()
            .attr('transform', 'translate(' + scales.x(retirementAge) + ', 0)')
            .call(axis);
    }
}
