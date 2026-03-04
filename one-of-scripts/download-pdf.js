

// Website: https://www.acju.lk/prayer-times/

/**
 * Get all unique ACJU Prayer Time PDF links
 * - From wp-content/uploads
 * - Only .pdf files
 * - Excludes Ramadaan files
 * - Removes duplicates
 */
// function getPrayerTimePdfLinks() {
//   const anchorElements = document.querySelectorAll("a");

//   const uniquePdfLinks = new Set();

//   anchorElements.forEach((anchor) => {
//     const url = anchor.href;

//     if (!url) return;

//     const isUploadsLink = url.includes("/wp-content/uploads/");
//     const isPdf = url.toLowerCase().endsWith(".pdf");
//     const isNotRamadaan = !url.toLowerCase().includes("ramadaan");

//     if (isUploadsLink && isPdf && isNotRamadaan) {
//       uniquePdfLinks.add(url);
//     }
//   });

//   return Array.from(uniquePdfLinks);
// }

// Example usage:
// const urls = getPrayerTimePdfLinks();
// console.log(urls);


const urls = [
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-4-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-4-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/02-JAFFNA-DISTRICT-NALLUR-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/04-MANNAR-DISTRICT-PUTTALAM-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/05-ANURADHAPURA-DISTRICT-POLONNARUWA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/06-KURUNEGALA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/08-BATTICALOA-DISTRICT-AMPARA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/09-TRINCOMALEE-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/12-GALLE-DISTRICT-MATARA-DISTRICT-12-Dec.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-1-Jan.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-2-Feb.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-3-Mar.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-4-Apr.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-5-May.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-6-June.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-7-July.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-8-Aug.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-9-Sep.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-10-Oct.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/07/13-HAMBANTOTA-DISTRICT-11-Nov.pdf",
  "https://www.acju.lk/wp-content/uploads/2025/12/13-HAMBANTOTA-DISTRICT-12-Dec.pdf"
]

// download-pdfs.js — saves into pdfs/{folder-name}/ where folder = e.g. 01-COLOMBO-DISTRICT-..., 02-JAFFNA-DISTRICT-NALLUR
const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, 'pdfs');

// Derive folder name from filename: strip trailing -N-Month or .-N-Month (e.g. -1-Jan, .-1-Jan)
const MONTHS = 'Jan|Feb|Mar|Apr|May|June|July|Aug|Sep|Oct|Nov|Dec';
const TRAILING_DATE_RE = new RegExp(`\\.?-?\\d{1,2}-(${MONTHS})$`, 'i');

function getFolderNameFromUrl(url) {
  const basename = path.basename(new URL(url).pathname, '.pdf');
  const folder = basename.replace(TRAILING_DATE_RE, '');
  return folder || basename;
}

function downloadPdf(url, index) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const filename = path.basename(urlObj.pathname) || `file-${index}.pdf`;
    const folderName = getFolderNameFromUrl(url);
    const folderPath = path.join(outDir, folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    let targetPath = path.join(folderPath, filename);
    if (fs.existsSync(targetPath)) {
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      targetPath = path.join(folderPath, `${base}-${index}${ext}`);
    }

    console.log(`Downloading -> ${path.join(folderName, path.basename(targetPath))}`);

    const file = fs.createWriteStream(targetPath);

    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(targetPath, () => { });
        return reject(new Error(`Request failed: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      file.close();
      fs.unlink(targetPath, () => { });
      reject(err);
    });
  });
}

(async () => {
  console.log("urls.length", urls.length);
  for (let i = 0; i < urls.length; i++) {
    try {
      await downloadPdf(urls[i], i);
    } catch (err) {
      console.error(`Failed for URL #${i}:`, err.message);
    }
  }
  console.log('Done.');
})();