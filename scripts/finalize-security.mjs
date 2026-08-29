import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runFinalizeSecurity } from './lib/finalize-security.mjs';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(rootDirectory, 'dist');

const result = await runFinalizeSecurity({ rootDirectory, outputDirectory });
console.log(`Security policy finalized in ${result.htmlFiles} HTML files (${result.themeHashesVerified} com hash de tema verificado, concorrência ${result.concurrency}).`);
