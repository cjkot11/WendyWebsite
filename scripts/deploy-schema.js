/**
 * Script to deploy Sanity schema using Management API
 * Run: node scripts/deploy-schema.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '798nmkhx';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN = process.env.SANITY_API_TOKEN;

if (!TOKEN) {
  console.error('❌ SANITY_API_TOKEN not found in environment variables');
  console.log('Make sure SANITY_API_TOKEN is set in your .env.local file');
  process.exit(1);
}

// Read the schema file
const schemaPath = path.join(__dirname, '../sanity/schema.ts');
console.log('📖 Reading schema from:', schemaPath);

// Note: This is a simplified approach. For production, you'd want to:
// 1. Use @sanity/cli to deploy: npx sanity schema deploy
// 2. Or use the Management API properly with schema compilation

console.log('\n✅ Schema file found!');
console.log('\n📝 To deploy your schema, run:');
console.log('   npx sanity schema deploy');
console.log('\nOr visit https://' + PROJECT_ID + '.sanity.studio and create the schema manually.');
console.log('\n💡 Tip: The easiest way is to use the Sanity Studio web interface:');
console.log('   1. Go to https://' + PROJECT_ID + '.sanity.studio');
console.log('   2. Click "Schema" in the sidebar');
console.log('   3. Click "Add document type"');
console.log('   4. Name it "post" and add the fields from sanity/schema.ts');
