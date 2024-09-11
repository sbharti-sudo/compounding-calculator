import { calculateTermDeposit } from '../../utils/termDepositCalculation';

test('should return final balance and total interest earned correctly for specific value when interest paid is monthly', () => {
    const result = calculateTermDeposit(10000, 1.10, 24, 'monthly');
    expect(result.finalBalance).toBe(10222);
    expect(result.totalInterestEarned).toBe(222);
});

test('should return final balance and total interest earned correctly for specific value when interest paid is quaterly', () => {
    const result = calculateTermDeposit(10000, 1.10, 24, 'quarterly');
    expect(result.finalBalance).toBe(10222);
    expect(result.totalInterestEarned).toBe(222);
});

test('should return final balance and total interest earned correctly for specific value when interest paid is Annually', () => {
    const result = calculateTermDeposit(10000, 1.10, 24, 'annually');
    expect(result.finalBalance).toBe(10221);
    expect(result.totalInterestEarned).toBe(221);
});

test('should return final balance and total interest earned correctly for specific value when interest paid is atMaturity', () => {
    const result = calculateTermDeposit(10000, 1.10, 24, 'atMaturity');
    expect(result.finalBalance).toBe(10220);
    expect(result.totalInterestEarned).toBe(220);
});

test('should throw error for invalid months less than 3', () => {
    expect(() => {
      calculateTermDeposit(1000, 5, 2, 'monthly');
    }).toThrow("Input values are incorrect. Please input correct values.");
  });

test('should throw error for invalid months greater than 60', () => {
    expect(() => {
      calculateTermDeposit(1000, 5, 61, 'monthly');
    }).toThrow("Input values are incorrect. Please input correct values.");
  });

  test('should throw error for principal amount less than 1000', () => {
    expect(() => {
      calculateTermDeposit(500, 5, 12, 'monthly');
    }).toThrow("Input values are incorrect. Please input correct values.");
  });

  test('should throw error for negative interest rate', () => {
    expect(() => {
      calculateTermDeposit(1000, -1, 12, 'monthly');
    }).toThrow("Input values are incorrect. Please input correct values.");
  });

  test('should throw error for invalid interestPaid value', () => {
    expect(() => {
      calculateTermDeposit(1000, 5, 12, 4);
    }).toThrow("Input values are incorrect. Please input correct values.");
  });
  