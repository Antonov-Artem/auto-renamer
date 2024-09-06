import { readdir, rename, stat } from 'fs/promises';
import { extname } from 'path';

interface File {
  fileName: string;
  birthTime: number;
  extension: string;
}

const PATH = process.argv[2];

try {
  const files: File[] = [];

  const filesNames = await readdir(PATH);

  for (const fileName of filesNames) {
    const stats = await stat(`${PATH}/${fileName}`);

    files.push({
      fileName,
      birthTime: stats.birthtimeMs,
      extension: extname(fileName),
    });
  }

  files.sort((f1, f2) => f1.birthTime - f2.birthTime);

  for (let i = 0; i < files.length; i++) {
    await rename(
      `${PATH}/${files[i].fileName}`,
      `${PATH}/${i + 1}${files[i].extension}`
    );
  }
} catch (error) {
  throw error;
}
