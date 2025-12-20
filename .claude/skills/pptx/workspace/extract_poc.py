from pptx import Presentation

prs = Presentation('/Users/steve.westgladly.com/Downloads/AI Deployment and POC Meeting Decks.pptx')
print(f'Total slides: {len(prs.slides)}')
print('='*80)

for i, slide in enumerate(prs.slides):
    print(f'\n--- SLIDE {i} ---')
    for shape in slide.shapes:
        if hasattr(shape, 'text') and shape.text.strip():
            print(shape.text.strip())
    print()
