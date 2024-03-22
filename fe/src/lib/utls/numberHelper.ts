
export const subtract = (num1: number, num2: number) => {
  let result = num1 - num2;
  result = Math.round(result * 10000) / 10000;
  return result;
}

export const compareNumber = (num1: number, num2: number, tolerance = 1e-9) => {
    return num2 - num1 > tolerance;
}