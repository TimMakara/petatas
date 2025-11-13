import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    // Get the file path from the slug
    const filePath = params.slug.join('/');
    console.log('Direct route accessed with filePath:', filePath);
    console.log('Params:', params);
    
    // Security check to prevent directory traversal
    const normalizedPath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const modelPath = path.join(process.cwd(), 'public/models', normalizedPath);
    console.log('Model path:', modelPath);

    // Check if the file exists
    if (!fs.existsSync(modelPath)) {
      console.log('File not found at path:', modelPath);
      return NextResponse.json(
        { error: 'Model file not found', path: modelPath },
        { status: 404 }
      );
    }

    // Read the file
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

    // Return the file with appropriate headers
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