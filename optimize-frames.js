const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'hero-frames');

async function optimizeFrames() {
    const files = fs.readdirSync(framesDir).filter(file => file.endsWith('.jpg'));
    console.log(`Found ${files.length} JPG frames. Converting to WebP...`);

    let totalOriginalSize = 0;
    let totalNewSize = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputPath = path.join(framesDir, file);
        const outputPath = path.join(framesDir, file.replace('.jpg', '.webp'));

        // Get original size
        const stats = fs.statSync(inputPath);
        totalOriginalSize += stats.size;

        // Convert to webp with 60% quality
        await sharp(inputPath)
            .webp({ quality: 60 })
            .toFile(outputPath);

        // Get new size
        const newStats = fs.statSync(outputPath);
        totalNewSize += newStats.size;

        // Delete old jpg
        fs.unlinkSync(inputPath);

        if (i % 50 === 0) {
            console.log(`Processed ${i}/${files.length} frames...`);
        }
    }

    console.log(`Done!`);
    console.log(`Original total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New total size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB`);
}

optimizeFrames().catch(console.error);
