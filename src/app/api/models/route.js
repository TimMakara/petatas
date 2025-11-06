import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Get the requested model file from the query parameters
    const { searchParams } = new URL(request.url);
    const modelFile = searchParams.get('file');

    if (!modelFile) {
      return NextResponse.json(
        { error: 'No model file specified' },
        { status: 400 }
      );
    }

    // Security check to prevent directory traversal
    const normalizedPath = path.normalize(modelFile).replace(/^(\.\.[\/\\])+/, '');
    const modelPath = path.join(process.cwd(), 'public/models', normalizedPath);

    // Check if the file exists
    if (!fs.existsSync(modelPath)) {
      return NextResponse.json(
        { error: 'Model file not found' },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = fs.readFileSync(modelPath);
    const fileExtension = path.extname(modelPath).toLowerCase();

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
        'Content-Disposition': `inline; filename="${modelFile}"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
    });
  } catch (error) {
    console.error('Error serving model:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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