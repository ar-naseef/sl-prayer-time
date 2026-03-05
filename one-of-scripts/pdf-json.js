
import fs from "fs";
import path from "path";
import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const __dirname = path.resolve();
const PDFS_DIR = path.join(__dirname, "pdfs");
const OUT_JSON = path.join(__dirname, "prayer-times.json");

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Map month text from PDF/file name to canonical 3-letter lowercase key
const MONTH_NAME_TO_KEY = {
  jan: "jan",
  feb: "feb",
  mar: "mar",
  apr: "apr",
  may: "may",
  june: "jun",
  july: "jul",
  aug: "aug",
  sep: "sep",
  oct: "oct",
  nov: "nov",
  dec: "dec",
};
// Match trailing -N-Month (e.g. -1-Jan, -12-Dec) to get region key without number
const MONTH_SUFFIX_RE = new RegExp(
  `-\\d+-(${MONTHS.join("|")})$`,
  "i"
);

function getRegionKeyAndMonth(pdfPath) {
  const basename = path.basename(pdfPath, ".pdf");
  const match = basename.match(MONTH_SUFFIX_RE);
  if (!match) return { regionKey: basename, month: null };
  const monthName = match[1];
  const monthKey = MONTH_NAME_TO_KEY[monthName.toLowerCase()] ?? monthName.toLowerCase();
  const regionKey = basename.slice(0, -match[0].length);
  return { regionKey, month: monthKey };
}

function getAllPdfPaths(dir) {
  const list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      list.push(...getAllPdfPaths(full));
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".pdf")) {
      list.push(full);
    }
  }
  return list;
}

function rowToObject(headers, row) {
  return headers.reduce((obj, key, i) => {
    obj[key] = (row[i] ?? "").trim();
    return obj;
  }, {});
}

function findPrayerTable(result) {
  for (const page of result.pages || []) {
    for (const table of page.tables || []) {
      if (!table.length) continue;
      const firstRow = table[0];
      const headers = firstRow.map((c) => (c ?? "").trim());
      if (
        headers.includes("DATE") &&
        (headers.includes("FAJR") || headers.includes("Fajr"))
      ) {
        return { headers, rows: table.slice(1) };
      }
    }
  }
  return null;
}

async function extractTableFromPdf(pdfPath) {
  const buffer = await readFile(pdfPath);
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getTable();
    const found = findPrayerTable(result);
    if (!found) return null;
    const { headers, rows } = found;
    return rows.map((row) => rowToObject(headers, row));
  } finally {
    await parser.destroy();
  }
}

async function main() {
  const pdfPaths = getAllPdfPaths(PDFS_DIR);
  console.log(`Found ${pdfPaths.length} PDFs`);

  const out = {};

  for (let i = 0; i < pdfPaths.length; i++) {
    const pdfPath = pdfPaths[i];
    const { regionKey, month } = getRegionKeyAndMonth(pdfPath);
    if (!month) {
      console.warn(`Skip (no month): ${pdfPath}`);
      continue;
    }
    process.stdout.write(`[${i + 1}/${pdfPaths.length}] ${path.basename(pdfPath)} ... `);
    try {
      const rows = await extractTableFromPdf(pdfPath);
      if (!rows || rows.length === 0) {
        console.log("no table");
        continue;
      }
      if (!out[regionKey]) out[regionKey] = {};
      out[regionKey][month] = rows; // month is lowercase 3-letter key: jan, feb, ..., jun, jul
      console.log(`${rows.length} rows`);
    } catch (err) {
      console.log("error:", err.message);
    }
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2), "utf8");
  console.log(`\nWrote ${OUT_JSON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
