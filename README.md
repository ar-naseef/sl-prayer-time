# SL Prayer Time

Prayer times for Sri Lanka. Web UI and scripts to work with [ACJU](https://www.acju.lk/prayer-times/) prayer time PDFs.

## Project structure

- **`ui/`** — Next.js app: today’s prayer times, next prayer countdown, mobile-friendly UI.
- **`one-of-scripts/`** — One-off scripts (e.g. download/parse ACJU PDFs).

## Run the app

```bash
cd ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

From `one-of-scripts/` you can run scripts to fetch or process ACJU prayer time PDFs. See comments in each script for usage.
