#!/usr/bin/env node

/**
 * SA DATA VALIDATION HARNESS
 *
 * Validates all SA ingredient data files for:
 * - Syntax correctness (loads without error)
 * - Referential integrity (no orphaned IDs)
 * - Required field completeness
 * - Coverage statistics
 *
 * Run: node validate-sa-data.js
 */

// Mock window object for Node.js environment
if (typeof window === 'undefined') {
  global.window = {};
}

// Load all SA data files
try {
  require('./sa-ingredient-retailers.js');
  require('./sa-ingredient-pack-sizes.js');
  require('./sa-ingredient-seasonality.js');
  require('./sa-ingredient-cost-variants.js');
  require('./sa-ingredient-substitutes.js');
  require('../recipes/ingredient-taxonomy.js');
} catch (err) {
  console.error('❌ SYNTAX ERROR loading SA data files:');
  console.error(err.message);
  process.exit(1);
}

const {
  SA_INGREDIENT_RETAILERS = {},
  SA_INGREDIENT_PACK_SIZES = {},
  SA_INGREDIENT_SEASONALITY = {},
  SA_INGREDIENT_COST_VARIANTS = {},
  SA_INGREDIENT_SUBSTITUTES = {},
  INGREDIENT_TAXONOMY = {}
} = window;

const TAXONOMY_IDS = new Set(Object.keys(INGREDIENT_TAXONOMY));

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('✅ SA INGREDIENT DATA VALIDATION REPORT');
console.log('═══════════════════════════════════════════════════════════════\n');

let errorCount = 0;

// 1. Validate SA_INGREDIENT_RETAILERS
console.log('📍 SA_INGREDIENT_RETAILERS (Retailers + Pricing)');
console.log('─────────────────────────────────────────────────');

const retailerKeys = Object.keys(SA_INGREDIENT_RETAILERS);
console.log(`  Coverage: ${retailerKeys.length} ingredients mapped`);

let retailerErrors = 0;
retailerKeys.forEach(id => {
  if (!TAXONOMY_IDS.has(id)) {
    console.error(`  ❌ Orphaned ID: ${id} not in taxonomy`);
    retailerErrors++;
  }
  const retailer = SA_INGREDIENT_RETAILERS[id];
  const requiredRetailers = ['pnp', 'checkers', 'woolworths'];
  requiredRetailers.forEach(r => {
    if (!retailer[r]) {
      console.warn(`  ⚠️  Missing retailer "${r}" for ${id}`);
    }
    if (retailer[r] && retailer[r].stock && !retailer[r].price_r) {
      console.warn(`  ⚠️  No price for ${r} (stock: true) in ${id}`);
    }
  });
});

if (retailerErrors === 0) {
  console.log(`  ✅ No orphaned references\n`);
} else {
  console.log(`  ❌ ${retailerErrors} orphaned references\n`);
  errorCount += retailerErrors;
}

// 2. Validate SA_INGREDIENT_PACK_SIZES
console.log('📦 SA_INGREDIENT_PACK_SIZES (Pack Sizes + Waste Risk)');
console.log('─────────────────────────────────────────────────');

const packKeys = Object.keys(SA_INGREDIENT_PACK_SIZES);
console.log(`  Coverage: ${packKeys.length} ingredients mapped`);

let packErrors = 0;
packKeys.forEach(id => {
  if (!TAXONOMY_IDS.has(id)) {
    console.error(`  ❌ Orphaned ID: ${id} not in taxonomy`);
    packErrors++;
  }
  const pack = SA_INGREDIENT_PACK_SIZES[id];
  if (!pack.unit) {
    console.warn(`  ⚠️  No unit defined for ${id}`);
  }
  if (!['high', 'medium', 'low'].includes(pack.waste_risk)) {
    console.warn(`  ⚠️  Invalid waste_risk for ${id}: ${pack.waste_risk}`);
  }
});

if (packErrors === 0) {
  console.log(`  ✅ No orphaned references\n`);
} else {
  console.log(`  ❌ ${packErrors} orphaned references\n`);
  errorCount += packErrors;
}

// 3. Validate SA_INGREDIENT_SEASONALITY
console.log('📅 SA_INGREDIENT_SEASONALITY (Seasonal + Pricing)');
console.log('─────────────────────────────────────────────────');

const seasonKeys = Object.keys(SA_INGREDIENT_SEASONALITY);
console.log(`  Coverage: ${seasonKeys.length} ingredients mapped`);

let seasonErrors = 0;
seasonKeys.forEach(id => {
  if (!TAXONOMY_IDS.has(id)) {
    console.error(`  ❌ Orphaned ID: ${id} not in taxonomy`);
    seasonErrors++;
  }
  const season = SA_INGREDIENT_SEASONALITY[id];
  if (!season.availability) {
    console.warn(`  ⚠️  No availability defined for ${id}`);
  }
  if (!['year-round', 'seasonal'].includes(season.availability)) {
    console.warn(`  ⚠️  Invalid availability for ${id}: ${season.availability}`);
  }
  if (!['high', 'medium', 'low'].includes(season.risk)) {
    console.warn(`  ⚠️  Invalid risk for ${id}: ${season.risk}`);
  }
});

if (seasonErrors === 0) {
  console.log(`  ✅ No orphaned references\n`);
} else {
  console.log(`  ❌ ${seasonErrors} orphaned references\n`);
  errorCount += seasonErrors;
}

// 4. Validate SA_INGREDIENT_COST_VARIANTS
console.log('💰 SA_INGREDIENT_COST_VARIANTS (Budget Alternatives)');
console.log('─────────────────────────────────────────────────');

const costKeys = Object.keys(SA_INGREDIENT_COST_VARIANTS);
console.log(`  Coverage: ${costKeys.length} ingredients with variants`);

let costErrors = 0;
costKeys.forEach(id => {
  if (!TAXONOMY_IDS.has(id)) {
    console.error(`  ❌ Orphaned ID: ${id} not in taxonomy`);
    costErrors++;
  }
  const variant = SA_INGREDIENT_COST_VARIANTS[id];
  if (!TAXONOMY_IDS.has(variant.budget_variant)) {
    console.error(`  ❌ Budget variant ${variant.budget_variant} not in taxonomy (for ${id})`);
    costErrors++;
  }
  if (!variant.cost_delta_r) {
    console.warn(`  ⚠️  No cost_delta_r for ${id}`);
  }
  if (!['minimal', 'noticeable', 'significant'].includes(variant.quality_tradeoff)) {
    console.warn(`  ⚠️  Invalid quality_tradeoff for ${id}: ${variant.quality_tradeoff}`);
  }
});

if (costErrors === 0) {
  console.log(`  ✅ No orphaned references\n`);
} else {
  console.log(`  ❌ ${costErrors} orphaned references\n`);
  errorCount += costErrors;
}

// 5. Validate SA_INGREDIENT_SUBSTITUTES
console.log('🔄 SA_INGREDIENT_SUBSTITUTES (Availability Fallbacks)');
console.log('─────────────────────────────────────────────────');

const substKeys = Object.keys(SA_INGREDIENT_SUBSTITUTES);
console.log(`  Coverage: ${substKeys.length} ingredients with substitutes`);

let substErrors = 0;
substKeys.forEach(id => {
  if (!TAXONOMY_IDS.has(id)) {
    console.error(`  ❌ Orphaned ID: ${id} not in taxonomy`);
    substErrors++;
  }
  const substitutes = SA_INGREDIENT_SUBSTITUTES[id];
  if (!Array.isArray(substitutes)) {
    console.error(`  ❌ Substitutes for ${id} is not an array`);
    substErrors++;
  } else {
    substitutes.forEach((sub, idx) => {
      if (!TAXONOMY_IDS.has(sub.substitute_id)) {
        console.error(`  ❌ Substitute ${sub.substitute_id} not in taxonomy (for ${id}, index ${idx})`);
        substErrors++;
      }
      if (!['out-of-season', 'unavailable', 'cost-prohibitive', 'quality-issue'].includes(sub.reason)) {
        console.warn(`  ⚠️  Invalid reason for ${id}[${idx}]: ${sub.reason}`);
      }
      if (![1, 2, 3].includes(sub.priority)) {
        console.warn(`  ⚠️  Invalid priority for ${id}[${idx}]: ${sub.priority}`);
      }
    });
  }
});

if (substErrors === 0) {
  console.log(`  ✅ No orphaned references\n`);
} else {
  console.log(`  ❌ ${substErrors} orphaned references\n`);
  errorCount += substErrors;
}

// 6. Coverage Summary
console.log('📊 COVERAGE SUMMARY');
console.log('─────────────────────────────────────────────────');

const totalTaxonomy = TAXONOMY_IDS.size;
const retailerCoverage = (retailerKeys.length / totalTaxonomy * 100).toFixed(1);
const packCoverage = (packKeys.length / totalTaxonomy * 100).toFixed(1);
const seasonCoverage = (seasonKeys.length / totalTaxonomy * 100).toFixed(1);
const costCoverage = (costKeys.length / totalTaxonomy * 100).toFixed(1);
const substCoverage = (substKeys.length / totalTaxonomy * 100).toFixed(1);

console.log(`  Taxonomy total: ${totalTaxonomy} canonical ingredients`);
console.log(`  Retailers: ${retailerKeys.length}/${totalTaxonomy} (${retailerCoverage}%)`);
console.log(`  Pack sizes: ${packKeys.length}/${totalTaxonomy} (${packCoverage}%)`);
console.log(`  Seasonality: ${seasonKeys.length}/${totalTaxonomy} (${seasonCoverage}%)`);
console.log(`  Cost variants: ${costKeys.length}/${totalTaxonomy} (${costCoverage}%)`);
console.log(`  Substitutes: ${substKeys.length}/${totalTaxonomy} (${substCoverage}%)`);

// 7. Final Status
console.log('\n═══════════════════════════════════════════════════════════════');

if (errorCount === 0) {
  console.log('✅ VALIDATION PASSED — All SA data files are clean and consistent');
  console.log('═══════════════════════════════════════════════════════════════\n');
  process.exit(0);
} else {
  console.log(`❌ VALIDATION FAILED — ${errorCount} error(s) found`);
  console.log('═══════════════════════════════════════════════════════════════\n');
  process.exit(1);
}
