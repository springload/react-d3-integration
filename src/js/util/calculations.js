'use strict';

import formulas from './financial-formulas.js';

export default {

    computeSavings(rate, account) {
        var yearlySavings = [];
        const potentialRate = parseInt(rate) + 2;

        // calculate savings up to retirment
        const yearlyContribution = account.monthlyContribution * 12;
        const durationUntilRetirement = account.retirementAge - account.userAge + 1;
        for (var i = 0; i < durationUntilRetirement; i++) {
            yearlySavings.push({
                age: account.userAge + i,
                savings: formulas.futureValue(account.balance + yearlyContribution * (i + 1), 1, rate, i + 1),
                savingsPotential: formulas.futureValue(account.balance + yearlyContribution * (i + 1), 1, potentialRate, i + 1)
            });
        }

        // lump sum at retirement
        account.savingsSum = yearlySavings[yearlySavings.length - 1].savings;
        account.savingsSumPotential = yearlySavings[yearlySavings.length - 1].savingsPotential;

        // calculate remaining savings from retirement until The End
        const retirementDuration = account.lifeExpectancy - account.retirementAge;

        // calculating savings that we'd have at The End
        const savingsSumFutureValue = formulas.futureValue(account.savingsSum, 1, rate, retirementDuration);
        const savingsSumPotentialFutureValue = formulas.futureValue(account.savingsSumPotential, 1, potentialRate, retirementDuration);

        const annuity = formulas.annuity(savingsSumFutureValue, 1, rate, retirementDuration);
        const annuityPotential = formulas.annuity(savingsSumPotentialFutureValue, 1, potentialRate, retirementDuration);

        for (var j = 0; j < retirementDuration; j++) {
            var yearSavings = yearlySavings[i + j - 1].savings;
            var yearSavingsPotential = yearlySavings[i + j - 1].savingsPotential;
            yearlySavings.push({
                age: account.userAge + i + j,
                savings: 1 + Math.max(0, formulas.futureValue(yearSavings, 1, rate, 1) - annuity),
                savingsPotential: 1 + Math.max(0, formulas.futureValue(yearSavingsPotential, 1, potentialRate, 1) - annuityPotential)
            });
        }

        account.yearlySavings = yearlySavings;

        return account;
    }

};
