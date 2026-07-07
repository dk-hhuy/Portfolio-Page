/**
 * Upload CV PDF to Sanity Site Settings (singleton document id: siteSettings).
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=your_token node scripts/upload-cv-to-sanity.mjs
 *   SANITY_API_WRITE_TOKEN=your_token node scripts/upload-cv-to-sanity.mjs path/to/resume.pdf
 *
 * Create token: https://www.sanity.io/manage/project/9udx7y4i/api#tokens
 * Permissions: Editor (or at least create + upload assets)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sanityClient from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  || process.env.REACT_APP_SANITY_PROJECT_ID
  || '9udx7y4i';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN
  || process.env.SANITY_WRITE_TOKEN
  || process.env.NEXT_PUBLIC_SANITY_TOKEN
  || process.env.REACT_APP_SANITY_TOKEN;

const defaultPdf = path.join(rootDir, 'public', 'Hoang_Huy_Le_Resume.pdf');
const pdfPath = path.resolve(process.argv[2] || defaultPdf);
const SITE_SETTINGS_ID = 'siteSettings';

function loadEnvFile() {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key] && value) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const resolvedToken = token
  || process.env.SANITY_API_WRITE_TOKEN
  || process.env.SANITY_WRITE_TOKEN
  || process.env.NEXT_PUBLIC_SANITY_TOKEN
  || process.env.REACT_APP_SANITY_TOKEN;

if (!resolvedToken) {
  console.error(`
Missing Sanity write token.

1. Open https://www.sanity.io/manage/project/9udx7y4i/api#tokens
2. Create a token with Editor permissions
3. Add to .env (do NOT commit):
   SANITY_API_WRITE_TOKEN=your_token_here
4. Run again:
   node scripts/upload-cv-to-sanity.mjs
`);
  process.exit(1);
}

if (!fs.existsSync(pdfPath)) {
  console.error(`PDF not found: ${pdfPath}`);
  process.exit(1);
}

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2022-02-01',
  token: resolvedToken,
  useCdn: false,
});

async function main() {
  console.log(`Uploading: ${pdfPath}`);

  const asset = await client.assets.upload(
    'file',
    fs.createReadStream(pdfPath),
    {
      filename: 'Hoang_Huy_Le_Resume.pdf',
      contentType: 'application/pdf',
    },
  );

  await client.createOrReplace({
    _id: SITE_SETTINGS_ID,
    _type: 'siteSettings',
    title: 'Site Settings',
    cvFile: {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    },
  });

  const published = await client.fetch(`*[_id == "${SITE_SETTINGS_ID}"][0]{
    "cvUrl": cvFile.asset->url,
    "cvFileName": cvFile.asset->originalFilename
  }`);

  console.log('\nCV uploaded successfully.');
  console.log('Asset URL:', asset.url);
  console.log('Site Settings:', published);
}

main().catch((error) => {
  console.error('\nUpload failed:', error.message);
  if (error.statusCode === 401) {
    console.error('Token invalid or missing Editor permissions.');
  }
  process.exit(1);
});
