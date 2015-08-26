'use strict';

import React from 'react';
import d3 from 'd3';

import AreaChart from '../charts/area-chart.js';

export default React.createClass({

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

    shouldComponentUpdate() {
        if (this.state.chart) {
            this.state.chart.update(this.getChartState());
        }

        // Do not re-render since we are rendering using D3.
        return false;
    },


    createChart() {
        const el = React.findDOMNode(this.refs.chart);
        const elWidth = el.offsetWidth;

        const margin = {top: 0, right: 0, bottom: 20, left: 20};

        const props = {
            margin: margin,
            width: elWidth - margin.left - margin.right,
            height: (elWidth / 2.5) - margin.top - margin.bottom
        };

        if (this.state.chart) {
            this.state.chart.destroy();
        }

        this.setState({
            chart: new AreaChart(el, props)
        }, function() {
            this.state.chart.create();
            this.state.chart.update(this.getChartState());
            this.preventD3Transitions();
        });
    },

    getChartState() {
        const account = this.props.account;

        const yearlyForecastChart = [
            {
                id: 'high',
                cssClass: 'forecast--high',
                values: account.yearlySavings.map(function(year) {
                    return {
                        age: year.age,
                        savings: year.savingsPotential
                    };
                })
            },
            {
                id: 'low',
                cssClass: 'forecast--low',
                values: account.yearlySavings
            }
        ];

        const domain = {
            age: [account.userAge, account.lifeExpectancy],
            balance: [0, Math.max(account.savingsSum, account.savingsSumPotential)]
        };

        return {
            retirementAge: account.retirementAge,
            data: yearlyForecastChart,
            domain: domain
        };
    },

    // Tear down the chart and remove the listener.
    componentWillUnmount() {
        this.state.chart.destroy();
        window.removeEventListener('resize', this.createChart);
    },

    preventD3Transitions() {
        const now = Date.now;
        Date.now = function() { return Infinity; };
        d3.timer.flush();
        Date.now = now;
    },

    render() {
        return (
          <div className='savings-chart' ref='chart'></div>
        );
    }

});
