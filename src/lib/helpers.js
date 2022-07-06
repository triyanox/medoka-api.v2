import crypto from "crypto";

/**
 * @usage
 * format pharmacy informations
 * especially the registration date
 **/
export function formatPharmacy({
  companyName,
  serialNumber,
  registrationDate,
  id,
}) {
  return {
    id: id,
    companyName: String(companyName),
    serialNumber: Number(serialNumber),
    registrationDate: new Date(registrationDate),
  };
}

/**
 * @usage
 * Generate random number with a given size
 **/
export function generateRandomNumber(size) {
  return Math.round(Math.random() * 10 ** size);
}

/**
 * @usage
 * Generate random string with a given byte size
 **/
export function generateRandomString(size) {
  return crypto.randomBytes(size).toString("hex");
}
