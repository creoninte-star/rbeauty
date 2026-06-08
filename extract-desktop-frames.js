/**
 * Extract frames from the upscaled animated WebP
 * and save them as individual high-quality WebP files
 * into public/hero-frames/ (replacing existing frames).
 *
 * Usage:  node extract-desktop-frames.js
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "public", "hero section desktop upscaled.webp");
const OUTPUT_DIR = path.join(__dirname, "public", "hero-frames");

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read metadata to get frame count and page height
  const meta = await sharp(INPUT).metadata();
  const totalPages = meta.pages || 1;
  const pageWidth = meta.width;
  const pageHeight = meta.pageHeight || meta.height;

  console.log(`Source: ${pageWidth}x${pageHeight}, ${totalPages} frames`);
  console.log(`Extracting to: ${OUTPUT_DIR}`);
  console.log();

  // Process frames in batches to avoid memory issues
  const BATCH_SIZE = 10;

  for (let batch = 0; batch < totalPages; batch += BATCH_SIZE) {
    const end = Math.min(batch + BATCH_SIZE, totalPages);
    const promises = [];

    for (let i = batch; i < end; i++) {
      const outName = `frame_${String(i).padStart(4, "0")}.webp`;
      const outPath = path.join(OUTPUT_DIR, outName);

      const p = sharp(INPUT, { page: i })
        .resize(1920, 1080)
        .webp({ quality: 85, effort: 4 })
        .toFile(outPath)
        .then(() => {
          process.stdout.write(`\r  Extracted frame ${i + 1} / ${totalPages}`);
        })
        .catch((err) => {
          console.error(`\n  ✗ Frame ${i}: ${err.message}`);
        });

      promises.push(p);
    }

    await Promise.all(promises);
  }

  console.log(`\n\n✓ Done! ${totalPages} frames extracted to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
