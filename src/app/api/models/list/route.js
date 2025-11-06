import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const modelsDir = path.join(process.cwd(), 'public/models');
    
    // Check if the models directory exists
    if (!fs.existsSync(modelsDir)) {
      return NextResponse.json({ models: [] });
    }
    
    // Read all files in the models directory
    const files = fs.readdirSync(modelsDir);
    
    // Filter for supported 3D model files and exclude README
    const supportedExtensions = ['.glb', '.gltf', '.obj', '.fbx', '.usd', '.usdc', '.usda'];
    const modelFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return supportedExtensions.includes(ext) && file !== 'README.md';
      })
      .map(file => ({
        name: file,
        displayName: file.replace(/\.[^/.]+$/, ""), // Remove extension for display
        extension: path.extname(file).toLowerCase(),
        size: fs.statSync(path.join(modelsDir, file)).size
      }));
    
    return NextResponse.json({ models: modelFiles });
  } catch (error) {
    console.error('Error listing models:', error);
    return NextResponse.json(
      { error: 'Failed to list models' },
      { status: 500 }
    );
  }
}