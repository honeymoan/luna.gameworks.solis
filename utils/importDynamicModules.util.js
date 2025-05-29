import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import logger from './logger.util.js';

export async function importDynamicModules(folderName, typeName) {
    const __filename = fileURLToPath(import.meta.url).replace('utils', ''); // TODO: god this is sooooo dirty lol.
    const __dirname = path.dirname(__filename);
    const __folder = path.join(__dirname, folderName);
    let modules = [];

    try {
        const files = await fs.readdirSync(__folder);

        for (const file of files) {
            if (file.endsWith(typeName)) {
                const filePath = path.join(__folder, file);
                const filePathNormalized = "file://" + filePath.replace(/\\/g, '/'); // Normalize path for import
                const module = await import(filePathNormalized);
                modules.push(module);
            }
        }
    } catch (error) {
        logger.error('Error reading directory:', error);
    }

    return modules;
}
