const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx');
const path = require('path');

async function createPOCKickoffDeck() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Gladly';
    pptx.title = 'AI Deployment POC Kickoff';
    pptx.subject = 'POC Kickoff Presentation';

    const slidesDir = path.join(__dirname, 'poc-kickoff-slides');

    const slides = [
        'slide01-title.html',
        'slide02-opportunity.html',
        'slide03-pathway.html',
        'slide04-configure.html',
        'slide05-criteria.html',
        'slide06-together.html',
        'slide07-nextsteps.html',
        'slide08-resources.html',
        'slide09-thankyou.html'
    ];

    console.log('Creating POC Kickoff Deck...\n');

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

    const outputPath = path.join(__dirname, 'POC-Kickoff-Deck.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved to: ${outputPath}`);

    return outputPath;
}

createPOCKickoffDeck().catch(err => {
    console.error('Failed to create presentation:', err);
    process.exit(1);
});
