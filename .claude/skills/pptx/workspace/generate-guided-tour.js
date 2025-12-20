const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx');
const path = require('path');

async function createGuidedTourDeck() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Gladly';
    pptx.title = 'POC Guided Tour';
    pptx.subject = 'Guided Tour Training';

    const slidesDir = path.join(__dirname, 'guided-tour-slides');

    const slides = [
        'slide01-title.html',
        'slide02-overview.html',
        'slide03-answers.html',
        'slide04-guides.html',
        'slide05-testing.html',
        'slide06-resources.html'
    ];

    console.log('Creating Guided Tour Deck...\n');

    for (let i = 0; i < slides.length; i++) {
        const slidePath = path.join(slidesDir, slides[i]);
        console.log(`Processing slide ${i + 1}/${slides.length}: ${slides[i]}`);
        try {
            await html2pptx(slidePath, pptx);
        } catch (error) {
            console.error(`Error on ${slides[i]}:`, error.message);
            throw error;
        }
    }

    const outputPath = path.join(__dirname, 'POC-Guided-Tour.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved to: ${outputPath}`);

    return outputPath;
}

createGuidedTourDeck().catch(err => {
    console.error('Failed to create presentation:', err);
    process.exit(1);
});
