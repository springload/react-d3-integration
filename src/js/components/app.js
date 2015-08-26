'use strict';

import React from 'react';
import ProgressChart from './ProgressChart';
import SavingsChart from './SavingsChart';
import formatters from '../util/formatters';
import config from '../config';
import caluclations from '../util/calculations';

export default React.createClass({

    getInitialState() {
        const rate = 7;

        return {
            // This is the parameter that will make our results change.
            rate: rate,

            // This is the results from our calculation.
            account: caluclations.computeSavings(rate, config.ACCOUNT)
        };
    },

    render() {
        const rangeConfig = {
            type: 'range',
            defaultValue: 7,
            max: 15,
            min: 1,
            step: 1
        };

        const ageConfig = {
            type: 'range',
            defaultValue: 65,
            max: 80,
            min: 65,
            step: 1
        };

        const rateNumber = formatters.vaguePercent(this.state.rate / 100);

        return (
            <div className='app'>

                <div className='card'>
                    <div className="row">
                        <div className="col-xs-12 mb">
                            <p className='text-left'>Yearly savings</p>
                            <SavingsChart {...this.state}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <p className='text-left'>{'Potential savings at ' + this.state.account.retirementAge + ' years'}</p>
                            <ProgressChart {...this.state}/>
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <div className="row">
                        <div className="col-xs-12 mb">
                            <p className='pull-right'>{rateNumber}</p>
                            <p className='text-left'>Interest rate</p>
                            <input
                                ref='rate'
                                onChange={this.changeRate}
                                onClick={this.changeRate}
                            {...rangeConfig}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <p className='pull-right'>{this.state.account.retirementAge}</p>
                            <p className='text-left'>Retirment age</p>
                            <input
                                ref='age'
                                onChange={this.changeAge}
                                onClick={this.changeAge}
                                {...ageConfig}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    // Grabs the current rate from the slider, then updates the React state.
    changeRate() {
        const rateSlider = React.findDOMNode(this.refs.rate);
        const rate = parseInt(rateSlider.value, 10);
        const account = this.state.account;

        this.setState({
            rate: rate,
            account: caluclations.computeSavings(rate, account)
        });
    },

    // Grabs the current age from the slider, then updates the React state.
    changeAge() {
        const ageSlider = React.findDOMNode(this.refs.age);
        const age = parseInt(ageSlider.value, 10);

        const rate= this.state.rate;
        var account = this.state.account;
        account.retirementAge = age;

        this.setState({
            account: caluclations.computeSavings(rate, account)
        });
    },

});
