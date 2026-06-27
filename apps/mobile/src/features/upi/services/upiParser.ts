import { UPIData } from "../types/upi";

export function parseUPI(
  qr: string
): UPIData | null {

  if (!qr.startsWith("upi://pay"))
    return null;

  const url = new URL(qr);

  return {

    merchant:
      url.searchParams.get("pn") ??
      "Merchant",

    upiId:
      url.searchParams.get("pa") ??
      "",

    amount: Number(
      url.searchParams.get("am") ??
      0
    ),

    note:
      url.searchParams.get("tn") ??
      "",

    currency:
      url.searchParams.get("cu") ??
      "INR",
  };
}