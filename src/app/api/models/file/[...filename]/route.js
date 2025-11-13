import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, context) {
  try {
    // Get filename from params - handle different Next.js versions
    const params = context.params || {};
    const filename = params.filename ? params.filename.join('/') : '';
    console.log('File route accessed with filename:', filename);
    console.log('Context:', context);
    
    if (!filename) {
      return NextResponse.json(
        { error: 'No filename provided' },
        { status: 400 }
      );
    }
    
    // Security check to prevent directory traversal
    const normalizedPath = path.normalize(filename).replace(/^(\.\.[\/\\])+/, '');
    const modelPath = path.join(process.cwd(), 'public/models', normalizedPath);
    console.log('Model path:', modelPath);

    // Check if file exists
    if (!fs.existsSync(modelPath)) {
      console.log('File not found at path:', modelPath);
      return NextResponse.json(
        { error: 'Model file not found', path: modelPath },
        { status: 404 }
      );
    }

    // Read file
    const fileBuffer = fs.readFileSync(modelPath);
    const fileExtension = path.extname(modelPath).toLowerCase();
    const fileName = path.basename(modelPath);

    // Set appropriate content type based on file extension
    let contentType = 'application/octet-stream';
    switch (fileExtension) {
      case '.glb':
        contentType = 'model/gltf-binary';
        break;
      case '.gltf':
        contentType = 'model/gltf+json';
        break;
      case '.obj':
        contentType = 'model/obj';
        break;
      case '.fbx':
        contentType = 'application/octet-stream';
        break;
      case '.usd':
      case '.usdc':
      case '.usda':
        contentType = 'model/usd';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Content-Transfer-Encoding': 'binary',
      },
    });
  } catch (error) {
    console.error('Error serving model:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}