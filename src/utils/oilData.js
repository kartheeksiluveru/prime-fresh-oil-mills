export const COMPANY = {
  name: "Prime Fresh Oil Mills",
  legalName: "Prime Fresh Oil Mills Pvt. Ltd.",
  millCode: "PFOM-JPR-01",
  addressLine: "Plot G-148, RIICO Industrial Area, Sitapura",
  city: "Jaipur, Rajasthan 302022",
  location: "Plot G-148, RIICO Industrial Area, Sitapura, Jaipur, Rajasthan 302022",
  phone: "+91 141 277 1840",
  phoneHref: "tel:+911412771840",
  email: "sales@primefreshoilmills.in",
  fssai: "12224009000123",
  iso: "ISO 22000:2018",
  dispatch: "PAN-India",
};

export const PACKAGING_FORMATS = [
  {
    id: "tin",
    label: "15L Consumer Tin",
    shortLabel: "15L Tin",
    capacityLiters: 15,
    surchargePerLiter: 4.5,
    material: "Food-grade tinplate",
  },
  {
    id: "barrel",
    label: "200L Industrial Barrel",
    shortLabel: "200L Barrel",
    capacityLiters: 200,
    surchargePerLiter: 1.8,
    material: "UN-rated HDPE drum",
  },
  {
    id: "tanker",
    label: "25,000L Bulk Road Tanker",
    shortLabel: "25,000L Tanker",
    capacityLiters: 25000,
    surchargePerLiter: 0.35,
    material: "SS304 food tanker",
  },
];

export const HUBS = [
  { id: "mumbai", label: "Mumbai", km: 1180, distanceCoeff: 1.15 },
  { id: "delhi-ncr", label: "Delhi NCR", km: 280, distanceCoeff: 0.72 },
  { id: "hyderabad", label: "Hyderabad", km: 1480, distanceCoeff: 1.35 },
  { id: "bengaluru", label: "Bengaluru", km: 1750, distanceCoeff: 1.55 },
];

export const BUSINESS_TYPES = [
  "Edible Oil Brand",
  "FMCG",
  "Private-Label",
  "Exporter",
];

export const VOLUME_MIN = 500;
export const VOLUME_MAX = 100000;
export const GST_RATE = 0.05;
export const FREIGHT_PER_LITER = 0.82;

const PRODUCTS = [
  {
    id: "yellow-mustard-oil",
    sku: "PF-YMO-CP-01",
    name: "Yellow Mustard Oil",
    isHero: true,
    grade: "Cold-Pressed",
    botanicalName: "Brassica juncea",
    origin: "Rajasthan mustard crush",
    process: "Slow cold-press, unrefined, unbleached",
    tagline: "Cold-pressed, high pungency, 100% pure — mill-gate supply for brands and private-label fills.",
    purity: 99.8,
    ffaMax: 1.5,
    moisture: 0.1,
    specificGravity30C: 0.907,
    refractiveIndex40C: "1.464–1.466",
    iodineValue: "98–110",
    saponificationValue: "170–184",
    pungency: "High — allyl isothiocyanate 0.25–0.40%",
    color: "Clear golden yellow",
    odor: "Characteristic pungent mustard",
    packaging: ["tin", "barrel", "tanker"],
    moqLiters: 500,
    basePricePerLiter: 168,
    leadTimeDays: 5,
    shelfLifeMonths: 12,
    certifications: ["FSSAI", "ISO 22000", "HACCP", "Agmark Grade I"],
    applications: ["Edible oil brands", "Private-label mustard oil", "FMCG fill lines"],
    labNotes:
      "Batch GC for AITC. No palmolein blending. Plate-and-frame filtered. Simulated CoA for buyer preview.",
  },
  {
    id: "refined-sunflower-oil",
    sku: "PF-SFO-RF-03",
    name: "Refined Sunflower Oil",
    isHero: false,
    grade: "Refined",
    botanicalName: "Helianthus annuus",
    origin: "Imported seed, Jaipur refine",
    process: "Neutralized, bleached, deodorized",
    tagline: "Light RBD sunflower oil for national FMCG SKUs and QSR fry programs.",
    purity: 99.9,
    ffaMax: 0.1,
    moisture: 0.05,
    specificGravity30C: 0.918,
    refractiveIndex40C: "1.467–1.469",
    iodineValue: "118–141",
    saponificationValue: "188–194",
    pungency: "None",
    color: "Pale straw",
    odor: "Neutral",
    packaging: ["tin", "barrel", "tanker"],
    moqLiters: 500,
    basePricePerLiter: 128,
    leadTimeDays: 4,
    shelfLifeMonths: 12,
    certifications: ["FSSAI", "ISO 22000", "HACCP", "Halal"],
    applications: ["Retail bottle filling", "QSR fry oil", "Mayonnaise plants"],
    labNotes: "Peroxide value held below 2.0 meq/kg at dispatch.",
  },
  {
    id: "cold-pressed-groundnut-oil",
    sku: "PF-GNO-CP-02",
    name: "Cold-Pressed Groundnut Oil",
    isHero: false,
    grade: "Cold-Pressed",
    botanicalName: "Arachis hypogaea",
    origin: "Gujarat & Rajasthan kernels",
    process: "Cold-pressed, filtered, unrefined",
    tagline: "Nutty cold-pressed groundnut oil for snack lines and gourmet private labels.",
    purity: 99.5,
    ffaMax: 1.0,
    moisture: 0.1,
    specificGravity30C: 0.914,
    refractiveIndex40C: "1.460–1.464",
    iodineValue: "85–99",
    saponificationValue: "188–196",
    pungency: "None",
    color: "Pale gold",
    odor: "Mild nutty",
    packaging: ["tin", "barrel", "tanker"],
    moqLiters: 500,
    basePricePerLiter: 172,
    leadTimeDays: 7,
    shelfLifeMonths: 9,
    certifications: ["FSSAI", "ISO 22000", "HACCP"],
    applications: ["Snack fryers", "HORECA bulk", "Private-label groundnut oil"],
    labNotes: "Aflatoxin screened per FSSAI limits. Winterized on request.",
  },
];

export const MILL_STATS = [
  { label: "Annual crush capacity", value: "84,000 MT" },
  { label: "On-time tanker dispatch", value: "98.4%" },
  { label: "Private-label SKUs live", value: "46" },
  { label: "Lab CoA turnaround", value: "< 8 hrs" },
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function asNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function getProducts() {
  return asArray(PRODUCTS).filter(Boolean);
}

export function getPackagingById(id) {
  return asArray(PACKAGING_FORMATS).find((item) => item?.id === id) ?? null;
}

export function getHubById(id) {
  return asArray(HUBS).find((item) => item?.id === id) ?? null;
}

export function getProductById(id) {
  if (!id) return null;
  return getProducts().find((item) => item?.id === id) ?? null;
}

export function getHeroProduct() {
  const list = getProducts();
  return list.find((item) => item?.isHero) ?? list[0] ?? null;
}

export function listPackaging(product) {
  return asArray(product?.packaging)
    .map((id) => getPackagingById(id))
    .filter(Boolean);
}

export function formatInr(amount) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(asNumber(amount));
  } catch {
    return `₹${asNumber(amount)}`;
  }
}

export function formatInrExact(amount) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(asNumber(amount));
  } catch {
    return `₹${asNumber(amount).toFixed(2)}`;
  }
}

export function formatLiters(n) {
  return `${new Intl.NumberFormat("en-IN").format(asNumber(n))} L`;
}

export function volumeDiscountRate(liters) {
  const volume = asNumber(liters);
  if (volume > 50000) return 0.12;
  if (volume > 20000) return 0.07;
  if (volume > 5000) return 0.03;
  return 0;
}

export function clampVolume(value, product) {
  const min = Math.max(VOLUME_MIN, asNumber(product?.moqLiters, VOLUME_MIN));
  const raw = asNumber(value, min);
  return Math.min(VOLUME_MAX, Math.max(min, Math.round(raw)));
}

export function unitsRequired(liters, pack) {
  const cap = asNumber(pack?.capacityLiters, 1) || 1;
  return Math.ceil(asNumber(liters) / cap);
}

export function calculateQuote({
  productId,
  volumeLiters,
  packagingId,
  hubId,
} = {}) {
  const product = getProductById(productId) ?? getHeroProduct();
  const pack =
    getPackagingById(packagingId) ??
    listPackaging(product)[0] ??
    asArray(PACKAGING_FORMATS)[0];
  const hub = getHubById(hubId) ?? asArray(HUBS)[0];
  const volume = clampVolume(volumeLiters, product);
  const unitPrice = asNumber(product?.basePricePerLiter);
  const baseSubtotal = unitPrice * volume;
  const discountRate = volumeDiscountRate(volume);
  const discountAmount = baseSubtotal * discountRate;
  const discountedSubtotal = baseSubtotal - discountAmount;
  const packagingCost = asNumber(pack?.surchargePerLiter) * volume;
  const freight = FREIGHT_PER_LITER * asNumber(hub?.distanceCoeff, 1) * volume;
  const taxable = discountedSubtotal + packagingCost + freight;
  const gst = taxable * GST_RATE;
  const grandTotal = taxable + gst;

  return {
    product,
    pack,
    hub,
    volume,
    unitPrice,
    baseSubtotal,
    discountRate,
    discountAmount,
    discountedSubtotal,
    packagingCost,
    freight,
    gst,
    gstRate: GST_RATE,
    taxable,
    grandTotal,
    units: unitsRequired(volume, pack),
  };
}

export const GSTIN_PATTERN =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export function validateGstin(value) {
  const gstin = String(value ?? "")
    .trim()
    .toUpperCase();
  if (!gstin) return "Enter a 15-character GSTIN.";
  if (!GSTIN_PATTERN.test(gstin)) {
    return "GSTIN must match 15-character format (e.g. 08ABCDE1234F1Z5).";
  }
  return "";
}

export function validateEmail(value) {
  const email = String(value ?? "").trim();
  if (!email) return "Enter a work email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  return "";
}

export function validatePhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length < 10) return "Enter a 10-digit contact number.";
  return "";
}

export function generateRfqId(year = 2026) {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `PFOM-${year}-${n}`;
}

export function buildCoAText(product) {
  const safe = product ?? {};
  const packs = listPackaging(safe)
    .map((item) => item?.label)
    .filter(Boolean)
    .join(", ");
  const issued = new Date().toISOString().slice(0, 10);
  const lot = `LOT-${issued.replaceAll("-", "")}-${String(safe.sku || "SKU").slice(-4)}`;

  return [
    "PRIME FRESH OIL MILLS PVT. LTD.",
    "Certificate of Analysis (simulated mill copy)",
    "------------------------------------------------",
    `Mill: ${COMPANY.millCode} | ${COMPANY.location}`,
    `FSSAI: ${COMPANY.fssai} | ${COMPANY.iso}`,
    `Phone: ${COMPANY.phone}`,
    `Issued: ${issued} | Lot: ${lot}`,
    "",
    `Product: ${safe.name ?? "—"}`,
    `SKU: ${safe.sku ?? "—"}`,
    `Grade: ${safe.grade ?? "—"}`,
    `Botanical name: ${safe.botanicalName ?? "—"}`,
    `Process: ${safe.process ?? "—"}`,
    "",
    "Laboratory parameters",
    `  Purity (%): ${safe.purity ?? "—"}`,
    `  Free Fatty Acids, max (%): ${safe.ffaMax ?? "—"}`,
    `  Moisture (%): ${safe.moisture ?? "—"}`,
    `  Specific Gravity at 30°C: ${safe.specificGravity30C ?? "—"}`,
    `  Refractive Index at 40°C: ${safe.refractiveIndex40C ?? "—"}`,
    `  Iodine Value: ${safe.iodineValue ?? "—"}`,
    `  Saponification Value: ${safe.saponificationValue ?? "—"}`,
    `  Pungency: ${safe.pungency ?? "—"}`,
    `  Color: ${safe.color ?? "—"}`,
    "",
    `Packaging formats: ${packs || "—"}`,
    "",
    safe.labNotes ?? "",
    "",
    "This file is a simulated CoA for buyer preview. Commercial lots ship with a signed lab original.",
    "Authorized: Quality Manager, Prime Fresh Oil Mills",
  ].join("\n");
}

export function downloadCoA(product) {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  try {
    const text = buildCoAText(product);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const slug = String(product?.id ?? "oil").replace(/[^\w-]+/g, "-");
    link.href = url;
    link.download = `PrimeFresh_CoA_${slug}.txt`;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}
