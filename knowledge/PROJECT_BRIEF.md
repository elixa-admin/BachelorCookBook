# Project Brief — The Ultimate Bachelor Cookbook

> Canonical source of truth for the project. Update this; do not duplicate it.

## Tagline & lede

- **Hero tagline:** "Dinner is on you."
- **Supporting lede:** "Feed yourself well. Impress everyone else."

## Overview

The Ultimate Bachelor Cookbook is the cookbook for the **eligible man** — capable,
sociable, and in command of his life. Cooking is his unfair advantage: eat well on a
Tuesday, **impress a date on a Friday**, **host a table on a Saturday**. Not survival
food for someone eating alone — a toolkit for a man who wants every meal to say
something about him.

**v1 leads with the Date occasion** — the showstoppers that close the evening. Solo and
Host follow.

## Audience

The **eligible bachelor**:
- Has his life together; cooking is the skill that completes the picture.
- Cooks for himself most nights but lives for the moment food becomes an occasion.
- Wants dishes that look more impressive than they are difficult.
- Appreciates technique, taught inline, with zero condescension.

## Three occasions

1. **Solo** — weeknight for one. Feed yourself like you matter.
2. **Date** *(v1 lead)* — cook to impress. The showstoppers.
3. **Host** — feed a table. Scale up, look effortless, be generous.

## Voice — Warm Premium

Sensory, unhurried, assured. Write like a calm host who knows exactly what he's doing —
atmosphere over punch, generosity over swagger. Lead with the senses (smell, heat,
sound), short confident sentences, then let it breathe.

- *Right:* "A great steak is less recipe than ritual. Salt it early, let the pan get
  properly hot, baste in foaming butter and thyme. Cook it for someone you'd like to
  keep talking to."
- *Wrong:* "Steak. The cheat code. You're a legend." (too punchy / wingman)

Cooking is leverage and generosity — **never consolation**. Forbidden: "never eat alone
again," "tired of takeout for one?," "you deserve." No pity, no desperation, no
sad-solo framing. Ever.

## Look & feel — Dark & Moody

"The cookbook after dark." Candlelit, intimate, cinematic — low-key lighting, deep warm
backgrounds, food as the jewel caught in a glint. Full system in `DESIGN.md`.

## Goals

1. A browsable, searchable library organised by **occasion** (solo / date / host).
2. Recipes that scale — one dish serves one, two, or a table — with ingredients that
   re-calculate.
3. The **Signature 12**: the dozen dishes every man should own by heart.
4. Mobile-first: gorgeous and usable propped up next to the stove.

## Non-goals (v1)

- Meal planning / grocery logistics.
- Accounts and social feeds.
- Video.

## Stack

TypeScript · Next.js (Server Components) · Tailwind · shadcn/ui.
Recipe content is markdown + frontmatter (see `CONTENT_MODEL.md`).

## Status

AISP OS structure in place. **Locked:** positioning (eligible / impress / host), voice
(Warm Premium), look (Dark & Moody), v1 lead (Date).
**Next:** draft the Signature 12 (date-led), write the first hero date recipe in voice,
bootstrap Next.js, and build the recipe page with serving-scaling + occasion filtering.
