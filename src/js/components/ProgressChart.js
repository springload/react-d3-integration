'use strict';

import React from 'react';
import ProgressChart from '../charts/progress-chart.js';

export default React.createClass({
    displayName: 'ProgressChart',

    propTypes: {
        account: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            chart: null
        };
    },

    componentDidMount() {

        // First render of the D3 chart.
        this.createChart();

        // Re-render from scratch on each resize.
        window.addEventListener('resize', this.createChart);
    },

    // Never re-render since we are rendering using D3.
    shouldComponentUpdate() {
        if (this.state.chart) {
            this.state.chart.update(this.getChartState());
        }

        return false;
    },

    createChart() {
        const el = React.findDOMNode(this.refs.chart);

        if (this.state.chart) {
            this.state.chart.destroy();
        }

        const margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        const elWidth = el.offsetWidth;

        const props = {
            margin: margin,
            width: elWidth - margin.left - margin.right,
            height: 30
        };

        // Initialise the chart, then render it without transitions.
        this.setState({
            chart: new ProgressChart(el, props)
        }, function() {
            this.state.chart.create();
            this.state.chart.update(this.getChartState());
            this.state.chart.preventTransitions();
        });
    },

    getChartState() {
        const account = this.props.account;

        // D3-friendly data format.
        const money = [
            {
                id: 'low',
                cssClass: 'forecast--low',
                value: account.savingsSum
            },
            {
                id: 'high',
                cssClass: 'forecast--high',
                value: account.savingsSumPotential
            }
        ];

        // D3-friendly domain for the dataset.
        const domain = [
            0,
            Math.max(account.savingsSum, account.savingsSumPotential)
        ];

        return {
            data: money,
            domain: domain
        };
    },

    // Tear down the chart and remove the listener.
    componentWillUnmount() {
        this.state.chart.destroy();
        window.removeEventListener('resize', this.createChart);
    },

    render() {
        return (
          <div className='progress-chart' ref='chart'></div>
        );
    }

});
