/**
 * Pure integer minor-unit arithmetic and KES formatting utilities.
 *
 * 1 KES = 100 minor units (cents). Amounts are handled in integer minor units
 * to prevent floating-point drift when formatting sample or official prices.
 */

const MINOR_UNITS_PER_KES = 100;

export function toMinorUnitsKES(amountKES: number): number {
  if (!Number.isFinite(amountKES)) {
    return 0;
  }
  return Math.max(0, Math.round(amountKES * MINOR_UNITS_PER_KES));
}

export function fromMinorUnitsKES(minorUnits: number): number {
  if (!Number.isFinite(minorUnits)) {
    return 0;
  }
  return Math.round(minorUnits / MINOR_UNITS_PER_KES);
}

export function multiplyMinorUnits(unitMinor: number, quantity: number): number {
  const safeUnit = Math.max(0, Math.trunc(unitMinor));
  const safeQty = Math.max(0, Math.trunc(quantity));
  return safeUnit * safeQty;
}

export function sumMinorUnits(amountsMinor: readonly number[]): number {
  return amountsMinor.reduce((acc, current) => acc + Math.max(0, Math.trunc(current)), 0);
}

export interface FormatMoneyOptions {
  readonly isSample?: boolean;
}

export function formatCurrencyKES(
  amountKES: number,
  options?: FormatMoneyOptions,
): string {
  const rounded = Math.round(amountKES);
  const formatted = `KES ${rounded.toLocaleString('en-KE')}`;
  if (options?.isSample) {
    return `SAMPLE · ${formatted}`;
  }
  return formatted;
}
