import {
  INTEREST_PAID_FREQUENCIES,
  VALIDATION_THRESHOLDS,
  NUMBER_OF_MONTHS_IN_A_YEAR,
} from "../constants/common";

const INTEREST_PAID_FREQ_TO_COMPOUNDING_COUNT_MAP = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

export const calculateTermDeposit = (
  principalAmount,
  interestRatePerAnnum,
  investmentTermInMonths,
  interestPaidFrequency
) => {
  let finalBalance = 0;

  // Validation
  if (
    investmentTermInMonths < VALIDATION_THRESHOLDS.MIN_INVESTMENT_TERM ||
    investmentTermInMonths > VALIDATION_THRESHOLDS.MAX_INVESTMENT_TERM ||
    principalAmount < VALIDATION_THRESHOLDS.MIN_PRINCIPAL_AMOUNT ||
    interestRatePerAnnum < VALIDATION_THRESHOLDS.MIN_INTEREST_RATE ||
    typeof interestPaidFrequency !== "string"
  ) {
    throw new Error("Input values are incorrect. Please input correct values.");
  }

  let investmentTermInYears =
    investmentTermInMonths / NUMBER_OF_MONTHS_IN_A_YEAR;
  let interestCompoundedCount =
    INTEREST_PAID_FREQ_TO_COMPOUNDING_COUNT_MAP[interestPaidFrequency] || 12;

  // Interest calculation logic
  if (interestPaidFrequency !== INTEREST_PAID_FREQUENCIES.AT_MATURITY) {
    /*
      Formula to calcuate term deposit: A = P(1+r/n)^(nt)
      Where:
        A = Amount at maturity
        P = Principal or amount deposited
        r = Rate of interest per annum
        n = Number of times the interest is compounded per year
        t = Time period in years
    */

    // Convert interest rate to decimal
    let rateOfInterest = interestRatePerAnnum / 100;

    finalBalance =
      principalAmount *
      Math.pow(
        1 + rateOfInterest / interestCompoundedCount,
        interestCompoundedCount * investmentTermInYears
      );
  } else {
    let interestPerMonth =
      ((interestRatePerAnnum / NUMBER_OF_MONTHS_IN_A_YEAR) * principalAmount) /
      100;
    finalBalance = principalAmount + interestPerMonth * investmentTermInMonths;
  }

  finalBalance = Math.round(finalBalance);
  let totalInterestEarned = finalBalance - principalAmount;

  return {
    finalBalance,
    totalInterestEarned,
  };
};