'use strict';

import d3 from 'd3';

export default {

    // See https://github.com/mbostock/d3/wiki/Formatting
    precisePercent: d3.format('.2%'),

    vaguePercent: d3.format('%'),

    preciseMoney: d3.format('$,.0f'),

    vagueMoney: d3.format('$.1s'),

    vagueAmount: d3.format('.1s'),

    // A more complex vagueMoney for two values as in an range.
    vagueMoneyRange(min, max) {
        let range;

        if (this.vagueMoney(min) === this.vagueMoney(max)) {
            range = this.vagueMoney(min);
        } else {
            range = this.vagueMoney(min) + '–' + this.vagueAmount(max);
        }

        return range;
    }
};
