import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import Anthropic from '@anthropic-ai/sdk';

// PDF parsing - dynamic import to handle potential issues
async function parsePDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(buffer);
  return data.text;
}

// PPTX parsing - extract text from XML
async function parsePPTX(buffer: Buffer): Promise<string> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(buffer);

  const slideTexts: string[] = [];

  // Get all slide XML files
  const slideFiles = Object.keys(zip.files).filter(
    (name) => name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
  );

  // Sort slides by number
  slideFiles.sort((a, b) => {
    const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0');
    const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0');
    return numA - numB;
  });

  for (const slideFile of slideFiles) {
    const content = await zip.files[slideFile].async('string');
    // Extract text from <a:t> tags (text elements in PPTX)
    const textMatches = content.match(/<a:t>([^<]*)<\/a:t>/g);
    if (textMatches) {
      const slideText = textMatches
        .map((match) => match.replace(/<\/?a:t>/g, ''))
        .filter((text) => text.trim())
        .join(' ');
      if (slideText.trim()) {
        const slideNum = slideFile.match(/slide(\d+)/)?.[1];
        slideTexts.push(`[Slide ${slideNum}]\n${slideText}`);
      }
    }
  }

  return slideTexts.join('\n\n');
}

// Initialize Anthropic for image analysis
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Analyze image using Claude's vision
async function analyzeImage(base64Data: string, mimeType: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: base64Data,
            },
          },
          {
            type: 'text',
            text: `Please extract and transcribe ALL text visible in this image. If it appears to be a slide or presentation:
- Capture the title/heading
- Capture all bullet points and body text
- Capture any notes or annotations
- Describe any diagrams or charts briefly

Format the output as plain text, preserving the structure where possible. If there are multiple sections, separate them with line breaks.`,
          },
        ],
      },
    ],
  });

  return message.content[0].type === 'text' ? message.content[0].text : '';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    let extractedText = '';
    let fileType = 'unknown';

    // TXT files
    if (fileName.endsWith('.txt')) {
      fileType = 'txt';
      extractedText = fileBuffer.toString('utf-8');
    }
    // DOCX files
    else if (fileName.endsWith('.docx')) {
      fileType = 'docx';
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value;
    }
    // PDF files
    else if (fileName.endsWith('.pdf')) {
      fileType = 'pdf';
      extractedText = await parsePDF(fileBuffer);
    }
    // PPTX files
    else if (fileName.endsWith('.pptx')) {
      fileType = 'pptx';
      extractedText = await parsePPTX(fileBuffer);
    }
    // Image files
    else if (
      fileName.endsWith('.png') ||
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.gif') ||
      fileName.endsWith('.webp')
    ) {
      fileType = 'image';
      const base64 = fileBuffer.toString('base64');
      let mimeType = 'image/png';
      if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
        mimeType = 'image/jpeg';
      } else if (fileName.endsWith('.gif')) {
        mimeType = 'image/gif';
      } else if (fileName.endsWith('.webp')) {
        mimeType = 'image/webp';
      }
      extractedText = await analyzeImage(base64, mimeType);
    }
    else {
      return NextResponse.json(
        { error: `Unsupported file type: ${fileName.split('.').pop()}` },
        { status: 400 }
      );
    }

    // Clean up the extracted text
    extractedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!extractedText || extractedText.length < 10) {
      return NextResponse.json(
        { error: 'Could not extract meaningful text from the file' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileType,
      fileName: file.name,
      characterCount: extractedText.length,
    });

  } catch (error: unknown) {
    console.error('Error parsing file:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to parse file', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to parse file', message: 'Unknown error' },
      { status: 500 }
    );
  }
}
