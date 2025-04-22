import * as unzipper from 'unzipper';
import fs from 'node:fs/promises';

async function fetchRemoteAndExtract(url: string, destinationPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  const directory = await unzipper.Open.buffer(Buffer.from(buffer));
  await directory.extract({ path: destinationPath });
}

async function fetchLocalAndExtract(path: string, destinationPath: string): Promise<void> {
  const stats = await fs.stat(path);

  if (stats.isDirectory()) {
    // If the path is a directory, copy it as-is
    await fs.cp(path, destinationPath, { recursive: true });
  } else {
    // If the path is a zip file, extracts it
    const directory = await unzipper.Open.file(path);
    await directory.extract({ path: destinationPath });
  }
}

export async function downloadAndExtractModule(url: string, destinationPath: string): Promise<void> {
  if (url.startsWith('file://')) {
    await fetchLocalAndExtract(url.replace('file://', ''), destinationPath);
  } else {
    await fetchRemoteAndExtract(url, destinationPath);
  }
}
