# Recipe Standardization Specification
**Objective:** Ensure all 72 recipes meet consistent standards across structure, depth, tone, and presentation.

---

## 1. STORY/PROVENANCE STANDARDIZATION

**Current state audit needed:**
- [ ] Check all 72 recipes have `prov` field
- [ ] Measure word count: ideal range 80-150 words
- [ ] Verify tone: warm, premium, sensory (never instructional)

**Standard structure:**
```
[Opening context] — [Cultural/historical significance] — [Why it matters] — [Sensory/emotional note]

Example: "Risotto Milanese is the soul of Lombardy's cooking — saffron-kissed rice, creamy and luxurious, built on stock and patience. It's not just a dish; it's ritual. The constant stirring, the gradual coax of starch into creaminess, is how you honor the technique. Best served fresh, fragrant, to someone worth the effort."
```

**Voice rules (enforced across all):**
- No instructional tone ("Learn to make...", "Follow these steps")
- Sensory language required (taste, texture, aroma, appearance)
- Reference origin/culture respectfully
- End with why it matters to the cook or diner
- 80-150 words

---

## 2. PANTRY SECRETS / "DID YOU KNOW" STANDARDIZATION

**Current state audit needed:**
- [ ] Check all 72 recipes have pantry lore entry
- [ ] Verify PANTRY_LORE window object is populated
- [ ] Measure word count: ideal 40-70 words

**Standard structure:**
```
[Ingredient/technique] was historically [fact] — [cultural context] — [sensory or practical relevance]

Example: "In the 19th century, vinegar was a popular cosmetic. Women drank diluted vinegar to achieve a pale, delicate, 'romantic' complexion, which was the beauty standard of the era."
```

**Rules:**
- One fact per recipe, tied to main ingredient or technique
- Historical/cultural angle (not just nutritional)
- Surprising but credible
- 40-70 words
- Format: "**Did you know?** [fact]"

---

## 3. STORAGE STANDARDIZATION

**Current state:** 58 recipes have storage (see storage-reheating.js)

**Standard structure:**
```javascript
"recipe-slug": {
  fridge: "<b>Up to X days</b> in [container]. [Key condition/note]",
  freezer: "<b>Up to X months</b> — [Texture/quality impact if relevant] OR 'Not recommended'",
  reheat: "[Method], [temperature/time]. [Critical warning if applicable]"
}
```

**Rules:**
- Duration always bolded: `<b>Up to X days</b>`
- Container specified (airtight, glass jar, foil)
- Freezer line includes quality caveat or "Not recommended"
- Reheat line includes method + specific temp/time
- One critical warning per category max
- Consistent voice: practical, brief, authoritative

---

## 4. IMAGES STANDARDIZATION

**Current state audit needed:**
- [ ] 72 recipes mapped in recipes-images.js (currently ~131 mapped)
- [ ] Verify all images match dark moody aesthetic (wine-red/gold theme)
- [ ] Check image dimensions/aspect ratios
- [ ] Remove/replace off-theme images

**Standard:**
- All images must fit wine-red/dark editorial theme
- Minimum resolution: 600px width
- Aspect ratio: 16:9 or 4:3 (landscape preferred)
- Lighting: warm, intimate (candlelit or golden-hour)
- Avoid: bright/white backgrounds, clinical plating, artificial light

---

## 5. HEADING/TITLE STANDARDIZATION

**Current state audit needed:**
- [ ] Recipe titles: Check for consistent casing (sentence case)
- [ ] Tier labels: Verify all recipes have correct tier assignment
- [ ] Cuisine/origin tags: Ensure consistent tagging

**Standard:**
- Title: Sentence case, no all-caps ("Pasta carbonara", not "PASTA CARBONARA")
- Tier: One of [Signature, Aspirational, Heritage, Adopted, Component]
- Cuisine: Consistent with regional taxonomy
- Collection: Ensure all 72 assigned to correct tier

---

## 6. FUNCTION FORMAT STANDARDIZATION (CODE)

**Target:** All recipe objects follow consistent field order and format

**Standard structure:**
```javascript
{
  slug: "recipe-slug",
  t: "Recipe Title",
  tier: "Signature",
  tierName: "Signature Collection",
  cui: "South African",
  diff: "Medium",
  method: "Stovetop",
  course: "Main",
  time: "1 hr",
  blurb: "[Short 1-liner]",
  brief: { lead: "...", expect: [...], stats: [...], kit: [...] },
  prov: { consists_of: "...", [other prov fields] },
  ing: [[group1], [group2], ...],
  steps: [[step1], [step2], ...] OR brief (no steps for non-Signature),
  plating: "[Recipe-specific plating notes]" OR universal,
  pair: [[pairing1], [pairing2], ...],
  image: "url-from-images.js"
}
```

**Rules:**
- Field order: slug → t → tier → tierName → cui → diff → method → course → time → blurb → brief → prov → ing → steps → plating → pair → image
- No extra fields (dead code)
- All strings trimmed (no leading/trailing spaces)
- No HTML in field names, only in content (brief, prov, plating)

---

## 7. DEPTH-OF-CONTENT STANDARDIZATION

**Audit checklist per recipe:**

| Field | Signature | Aspirational | Heritage | Adopted | Component |
|-------|-----------|--------------|----------|---------|-----------|
| brief | 150-200 words | 100-150 words | 100-150 words | 50-100 words | 50-100 words |
| prov | 200+ words | 150+ words | 150+ words | 80+ words | 50+ words |
| ing groups | 3-4 | 2-3 | 2-3 | 1-2 | 1 |
| steps | 8-12 timed | N/A (brief) | N/A (brief) | N/A (brief) | N/A (brief) |
| plating | Recipe-specific + universal | Universal | Universal | N/A | N/A |
| pair | 3-4 options | 2-3 options | 2-3 options | 1-2 options | 1 option |
| storage | Detailed | Category default | Category default | Category default | N/A |
| image | Required | Required | Required | Optional | Optional |

---

## 8. THEME CONSISTENCY (VISUAL)

**Color system (locked):**
- Primary accent: Gold rgba(212,175,55)
- Secondary accent: Fresh Green #A8D651 (Pantry Secrets)
- Secondary accent: Teal rgba(85,183,221) (Storage)
- Wine-red rgba(110,30,36) (Emphasis, timelines)

**Typography (locked):**
- Display: Oswald (headings)
- Body: Inter Tight (copy)
- Mono: JetBrains Mono (timing, technical)
- Voice serif: Editorial serif for quotations (Pantry Secrets)

**Layout standards:**
- Section padding: 52px vertical (dsection)
- Left borders: 2-3px (editorial accents)
- Spacing: 12-20px gaps between items
- Border radius: 8px (compact), 12px (cards)

---

## 9. EXECUTION PLAN

### Phase A: Audit (Est. 8-10k tokens)
1. Script to check all 72 recipes for missing fields
2. Word-count audit on prov, brief, pantry lore
3. Image coverage report
4. Storage completeness check
5. Generate list of recipes by standardization need

### Phase B: Standardization Tiers (Est. 30-50k tokens)
1. **Signature tier (8 recipes):** Deep standardization
   - Full prov overhaul
   - Timed steps verification
   - Premium imagery
   - Est. 3-4k tokens per recipe

2. **Aspirational tier (12 recipes):** Medium standardization
   - prov review + enhance
   - Pair review
   - Image sourcing
   - Est. 2-3k tokens per recipe

3. **Heritage tier (27 recipes):** Consistency pass
   - prov template application
   - Storage defaults
   - Image verification
   - Est. 1-2k tokens per recipe

4. **Adopted + Component (25 recipes):** Light consistency
   - Field order standardization
   - Storage/pair completeness
   - Est. 0.5-1k tokens per recipe

### Phase C: Pantry Secrets Expansion (Est. 5-8k tokens)
- Research 72 unique facts (one per recipe)
- Match to ingredient/technique
- Verify accuracy
- Format consistently

### Phase D: Image Standardization (Est. 6-10k tokens)
- Source/verify 72 images
- Ensure dark-moody aesthetic match
- Update recipes-images.js
- Test on all recipes

### Phase E: Polish & Verification (Est. 3-5k tokens)
- Voice consistency sweep
- Final formatting check
- Cross-tier depth verification

---

## 10. SUCCESS CRITERIA

- [ ] All 72 recipes have complete fields (no empty prov, brief, storage, etc.)
- [ ] Word counts within target ranges
- [ ] 100% image coverage with theme consistency
- [ ] Voice audited and consistent across all tiers
- [ ] Storage guidance complete and formatted
- [ ] Pantry Secrets unique per recipe
- [ ] All recipes render without errors
- [ ] Depth progression evident: Signature > Aspirational > Heritage > Adopted

---

## Estimated Total Cost: 50-80k tokens
**Recommended approach:** Run as 2-3 parallel background tasks or dedicated sessions.
**Priority order:** Signature tier first (highest value), then Heritage (highest volume), then Aspirational + Adopted.

