// Taken from https://helloacm.com/common-javascript-functions-for-financial-calculations/.
export default {

    /***********************************************
     *              Present Value                  *
     * pv = fv / (1 + (rate / freq))^periods       *
     * pv = Present Value                          *
     * fv = Future Value                           *
     * rate = interest rate (expressed as %)       *
     * freq = compounding frequency                *
     * periods = number of periods until maturity  *
     ***********************************************/
    presentValue(fv, freq, rate, periods) {
        return (fv / Math.pow((1 + (rate / 100 / freq)), periods));
    },

    /************************************************
     *                Future Value                  *
     * fv = pv * (1 + (rate / freq))^periods        *
     * fv = Future Value                            *
     * pv = Present Value                           *
     * rate = interest rate (expressed as %)        *
     * freq = compounding frequency                 *
     * periods = number of periods until maturity   *
     ************************************************/
    futureValue(pv, freq, rate, periods) {
        return (pv * Math.pow(1 + (rate / 100 / freq), periods));
    },

    /***********************************************
     *                 Annuity                     *
     * a = fv / (((1 + r / c)^n) - 1) / (r/c)      *
     * fv = future value                           *
     * r = interest rate                           *
     * c = compounding frequency                   *
     * n = total number of periods                 *
     ***********************************************/
    annuity(fv, freq, rate, periods) {
        rate = rate / 100 / freq;
        return (fv / ((Math.pow(1 + rate, periods) - 1)) * rate);
    },

    /***********************************************
     *                 Reverse Annuity             *
     * a = annuity                                 *
     * fv = yeah!                                  *
     * r = interest rate                           *
     * c = compounding frequency                   *
     * n = total number of periods                 *
     ***********************************************/
    reverseAnnuity(a, freq, rate, periods) {
        rate = rate / 100 / freq;
        return (a * ((Math.pow(1 + rate, periods) - 1)) / rate);
    },

    /***********************************************
     *                 Get interest rate           *
     * pv = present value                          *
     * fv = Future value                           *
     * r = interest rate                           *
     * c = compounding frequency                   *
     * n = total number of periods                 *
     ***********************************************/
    interestRate(pv, fv, freq, periods) {
        return (Math.pow(fv/pv, 1/periods) * freq * 100) - 100 * freq;
    }

};
