# DOCUMENT CONTROL
# Title: Product Requirements Document: AkshoAI
# Version: 2.1 (Post-Migration)
# Created: 2025-10-15
# Last Updated: 2026-01-23
# Status: Active Development
# Author: Aksho Technologies

## 1. Product Overview

**Product Name:** AkshoAI
**Company:** Aksho Technologies
**Contact:** contact@akshotechnologies.com
**Vision:** The complete AI creative companion for character creators, combining character design, image generation, interactive chat, and community sharing in one unified BYOK (Bring Your Own Key) platform.

**Mission:** Empower creators to build, visualize, and interact with their characters using their own AI API keys, while fostering a community of creative sharing and collaboration.

**Core Philosophy:** "Create freely, share responsibly." We believe users should have absolute freedom in their private creative expression (via Zero-Knowledge privacy), while maintaining a safe and curated environment in public community spaces.

**Business Model:** BYOK Freemium - Users bring their own API keys (Anthropic, OpenAI, NovelAI, etc.) and access the platform for free with ads, or upgrade for ad-free experience, cloud sync, and community features.

## 2. Target Users

**Primary Users:**
- AI enthusiasts seeking advanced character creation tools
- Creative writers and worldbuilders needing detailed character development
- AI art enthusiasts wanting integrated creation-to-visualization workflows
- Users of Character.AI seeking more granular creative control
- API key holders looking for a unified creative platform

## 3. The Five Products (Core Pillars)

AkshoAI is built around five distinct products, each representing a core pillar of the creative experience:

### 3.1 HANGAR - The Character Creator
**Tagline:** "Design complete characters with detailed appearance, personality, traits, and backstories."

The Hangar is the entry point for all character creation. It features a dual-mode architecture catering to both beginners and power users, funneling all output into a standardized "Manifest" definition.

#### 3.1.1 Creation Modes

**A. The Dynamic Creator (Wizard Mode)**
A guided, step-by-step visual builder designed to prevent "writer's block" and ensure anatomical consistency.
-   **Step-Based Flow:** Users progress linearly through anatomical zones (Skin → Features → Head → Torso → Bottoms).
-   **Visual Tag Cards:** Instead of writing text, users select options from visual cards. Each card features a preview image demonstrating the tag (e.g., "Cat Ears").
-   **The Visual Models:** To maintain consistency, tag preview images use standardized mascot models based on the selected species:
    -   **Humans:** Modeled by *Emi*.
    -   **Demi-Humans:** Modeled by *Kali*.
    -   **Furries:** Modeled by *Sarai*.
-   **Taxonomy Support:**
    -   **Species:** Human, Demi-Human (Monster Girl/Kemonomimi), Furry.
    -   **Biological Sex:** Male, Female, Futa.
-   **Structured Output:** The system automatically compiles selected tags into a rigorously formatted prompt string (e.g., `(tag1:1.2), tag2, tag3`), ensuring optimal token ordering for image generation.
-   **Live Preview:** A floating "Atelier Preview Box" on the right side renders a real-time snapshot of the current tag configuration using the selected Style.

**B. The Advanced Creator (Free-form Mode)**
A traditional "power user" interface for those who prefer direct prompt engineering.
-   **Raw Fields:** Empty text areas for "Appearance," "Personality," and "Scenario."
-   **Manual Tagging:** Users type or paste raw Danbooru tags and prompts directly.
-   **Hybrid Workflow:** Users can import a "Closet" or "Stage" preset to auto-fill specific sections while keeping the rest free-form.

#### 3.1.2 The Manifest Export Flow
Both the **Dynamic** and **Advanced** creators focus on the *physical* and *visual* design of the character. Once the physical design, personality, identity and background are complete, the user clicks **"Export to Manifest."**

**Manifest (The Card Editor)** handles the V2 Character Card metadata:
-   **Identity:** Name, Description. (Basic Info, Physical Traits, Personality, Identity&Quirks and Background)
-   **Dialogue:** First Message, Chat Examples, Greetings.
-   **System:** System Prompt, Post-History Instructions, Jailbreak overrides.
-   **Final Output:** Generates the PNG Character Card containing the embedded V2 JSON payload.

#### 3.1.3 Style & Visualization Engine
The "Style" determines how the character is rendered in the Hangar Preview, Atelier, and in-chat visualization (*Project "Picturize"*).

**Global Style Selector:**
Users select a "Base Style" that attaches to the character card metadata. This ensures the character looks consistent across the platform.
1.  **2D Anime:** Standard flat anime aesthetic.
2.  **2.5D / Semirealism:** High-fidelity anime with realistic lighting.
3.  **3D / Render:** CGI-style aesthetic.
4.  **Furry:** Specialized checkpoint optimized for anthropomorphic features.
5.  **Aksho Signature:** Our in-house proprietary stack (Checkpoint + LoRA configuration) designed for maximum aesthetic coherence.

*Note: This default style can be temporarily overridden inside Atelier for specific image generation sessions without altering the character's permanent master definition.*

#### 3.1.4 Hangar Sub-Modules
Modular tools that allow users to save "fragments" of prompts for reuse.

-   **🧥 The Closet (Outfit Builder):**
    -   A dedicated editor for creating reusable clothing sets (e.g., "School Uniform," "Cyberpunk Armor").
    -   Saved outfits appear as dropdown selections in Creator Preview, Atelier or Picturize*.
-   **🎭 The Stage (Environment Builder):**
    -   A tool for defining reusable backgrounds and ambient lighting tags (e.g., "Cyberpunk City," "Forest Glade").
    -   Used to set the default background for character cards, Creator Preview, Atelier or Picturize*.
-   **🎬 The Scene (Pose Editor):**
    -   A "Poser" creator that defines physical action tags and camera angles.
    -   Used to set poses for characters to use in: Creator Preview, Atelier or Picturize*.
-   **🏷️ Tag Wiki:**
    -   An indexed library of Danbooru tags.
    -   Future Roadmap: Visual dictionary showing example generations for every tag to help users understand obscure terminology.

**The Quality Gate (Anti-Slop):**
- **Visual Quality Meter:** A UI indicator showing character depth ("Weak" → "Publishable" → "Excellent").
- **Publishing Lock:** The "Publish to Gallery" button is **disabled** unless the character meets minimum depth requirements (e.g., >300 tokens of background definition).

**The Style Gate (Avatar Compliance):**
- **Source:** Users are required to generate avatars internally via **Atelier** to ensure Terms & Conditions compliance.

### 3.2 LOUNGE - The Character Chat
**Tagline:** "Explore community characters and engage in dynamic conversations."

**Features:**
- **BYOK Engine:** Direct client-side connection to Anthropic, OpenAI, Deepseek, and OpenRouter.
- **"Aksho Mini":** Free, limited access to a hosted 7B model (50 messages/24h limit).
- **Zero-Knowledge Privacy:** Private chat logs are encrypted client-side using the Vault Password before sync.
- **Context Management:** Character definition injection, lorebooks, and chat history.
- **Gallery Restrictions:** Economy Passengers can browse and chat, but **cannot publish** to the Gallery.

**Content Rating System (The Sumi Scale):**
AkshoAI uses **Sumi**, our squid mascot, as a visual content rating indicator. Sumi has three states:

| Level | Name | Icon State | Description |
|-------|------|------------|-------------|
| **1** | **SFW (Clean)** | Bright pink squid, no ink | Safe for work. Family-friendly content. |
| **2** | **NSFW (Leaking)** | Darker purple/flushed squid, ink dripping | Explicit erotica/nudity. Adults only. |
| **3** | **NSFL (Splatter)** | Squid covered in ink explosion | Extreme content (gore, dark themes). Opt-in only. |

**Avatar Visibility Logic (Sumi Overlay):**
- **SFW Avatars:** Always visible (Clean squid icon).
- **NSFW Avatars:** Covered with **ink overlay** by default (Leaking squid icon). Click once to reveal.
- **NSFL Avatars:** Covered with **heavy ink splatter** by default (Splatter squid icon). Click once to reveal. Requires explicit opt-in in settings.
- **User Toggle:** Authenticated users can enable "Auto-reveal NSFW/NSFL" in settings.
- **Hard Restriction:** Avatars (the thumbnails) must not contain close-up genitals or penetration, even if NSFW. Full nudity/erotica is allowed if ink-covered.

**The Sumi Overlay Mechanic:**
Instead of generic blur/pixelation, restricted content is covered with a stylized overlay featuring Sumi. Users click once to reveal the content beneath.

### 3.3 ATELIER - The Image Generator
**Tagline:** "Flexible image generation with custom API keys and multiple backend support."

**Features:**
- **Integrations:** NovelAI and Tensor.art API support (BYOK).
- **Workflow:** Seamlessly visualize characters created in Hangar.
- **Compliance:** Built-in safeguards to prevent generation of photorealistic/deepfake content for public use.
- **Privacy:** Generated images are not stored on servers unless published to the Gallery.

### 3.4 MANIFEST - The Card Creator
**Tagline:** "Create and edit character cards with V2 formatting."

**Features:**
- **Standards:** V2 Character Card specification compliance.
- **Interoperability:** Import/Export JSON and PNG cards from other platforms (Chub.ai, etc.).

### 3.5 DREAMLAND - The Desktop Companion
**Tagline:** "Desktop companion for seamless character interaction."
**Availability:** Charter First Class ($25/mo) and above.

**Features:**
- Native Electron application (Windows/Mac/Linux).
- Offline mode for saved characters.
- System tray integration and native notifications.

## 4. Monetization & Tiers

### 4.1 BYOK Philosophy
Users pay third-party AI providers directly. AkshoAI provides the interface and tools.

### 4.2 Account Tiers — ✈️ Pan World Airlines: The Charter Program (Beta)

> **Launch Phase (Now):** *"Join the Charter Program. Earn your Wings. Found the 46th."*
> **Live Phase (Later):** *"Join PWA. Earn Status. Get your Black Card."*

| Beta Price | Launch Price | Beta Name (Founders) | Beta Pin | Regular Name (Passengers) | Regular Pin |
|------------|--------------|---------------------|------------|---------------------------|---------------|
| Free | Free | Economy | Ticket Stub | Economy | Ticket Stub (Standard Blue) |
| **$3** | $3 | Charter Priority | 🪽 Silver Wing | Priority | 💳 Silver Status Card |
| **$10** | $15 | Charter Business | 🪽 Gold Wing | Business Class | 💳 Gold Status Card |
| **$15** | $25 | Charter First Class | 🪽 Diamond Wing | First Class | 💳 Platinum Status Card |
| **$35** | $50 | Founding Shareholder | 🪽 The 46th Pin (Onyx) | Executive Elite | 💳 The Black Card |

#### 💰 Beta Pricing & Grandfathering Rules

> **Grandfathering:** Beta subscribers who maintain an active subscription are **locked in at beta pricing forever**. Cancel and rejoin = launch pricing.

> **30-Day Grace Period:** If you cancel (or payment fails), you have **30 days** to resubscribe before losing:
> - 🪽 Your Charter Wings pin
> - 💰 Your grandfathered beta pricing
> - 🏛️ Your Founder status (for The 46th members)
>
> After 30 days, you rejoin as a regular "Passenger" with a Status Card at launch pricing.

---

#### 🎫 Economy (Free with Ads)
**Account Type:** Cookie-based "Passenger" accounts.
- **Beta Lore:** *"Standard seating for the maiden voyage."*
- **Live Lore:** *"Standard seating on Pan World Airlines."*
- ✅ **Aksho Mini:** 50 messages/day (Free Hosted Model).
- ✅ **Unlimited BYOK:** Chat without limits using your own keys.
- ✅ **Local Storage:** Data lives 100% in the browser (IndexedDB).
- ❌ **No Sync:** Data does not transfer between devices.
- ❌ **Data Risk:** Clearing cookies results in permanent data loss.
- ❌ **No Publishing:** Cannot post to Community Gallery.
- 🎖️ **Pin:** Ticket Stub

#### 🥈 Charter Priority → Priority (Beta: $3/mo | Launch: $3/mo)
**Account Type:** Persistent Vault Account.
- **Beta Lore:** *"Charter status grants permanent priority boarding to the Vault."*
- **Live Lore:** *"Guaranteed priority access to the Cloud Vault."*
- ✅ **Ad-Free:** No programmatic ads.
- ✅ **Secure Cloud Sync:** Encrypted characters/chats sync across devices via Vault Password.
- ✅ **Secure Key Storage:** Encrypted BYOK keys in the Cloud Vault.
- ✅ **Community:** Publish characters to the Public Gallery (Subject to Quality/Style Gates).
- 🎖️ **Beta Pin:** Silver Wing | **Live Pin:** Silver Status Card

#### 🥇 Charter Business → Business Class (Beta: $10/mo | Launch: $15/mo)
- **Beta Lore:** *"Luxury amenities for our earliest patrons."*
- **Live Lore:** *"Premium amenities for our valued passengers."*
- ✅ ALL Priority benefits.
- ✅ **Profile Customization:** Themes, banners, nameplates.
- ✅ **Recognition:** Wall of Fame listing.
- 🎖️ **Beta Pin:** Gold Wing | **Live Pin:** Gold Status Card

#### 💎 Charter First Class → First Class (Beta: $15/mo | Launch: $25/mo)
- **Beta Lore:** *"Inaugural access to the Dreamland suite."*
- **Live Lore:** *"Standard access to the Dreamland Suite."*
- ✅ ALL Business Class benefits.
- ✅ **Dreamland Access:** Download the desktop app.
- ✅ **Visual Flair:** Shiny diamond border in Gallery.
- 🎖️ **Beta Pin:** Diamond Wing | **Live Pin:** Platinum Status Card

#### 🏛️ Founding Shareholder → Executive Elite (Beta: $35/mo | Launch: $50/mo)
- **Beta Lore:** *"Your name is etched in the fuselage forever."*
- **Live Lore:** *"The highest level of commercial service Pan World Airlines offers."*
- ✅ ALL First Class benefits.
- ✅ **VIP Status:** Permanent special thanks on the homepage.
- 🎖️ **Beta Pin:** The 46th Pin (Onyx) | **Live Pin:** The Black Card

### 4.3 📜 The Wall of Fame: "The Charter Manifest"

**Homepage Section Title:** The Charter Manifest
**Subtitle:** *"Recognizing the founding passengers of Pan World Airlines Flight 001."*

The Wall of Fame displays supporter names in three boarding groups, styled like an airport gate screen or memorial plaque.

#### 1. The Headliners — "The 46th" ($50 Tier)
- **Section Title:** The 46th
- **Visuals:** Top placement, largest font, gold/onyx decorative box
- **Pin Displayed:** The 46th Pin (Onyx)
- **Lore:** *The key investors. The Secret Club.*

#### 2. The High Flyers — First Class ($25 Tier)
- **Section Title:** First Class
- **Visuals:** Medium font size, prominent placement
- **Pin Displayed:** Diamond Wing

#### 3. The Patrons — Business Class ($15 Tier)
- **Section Title:** Business Class
- **Visuals:** Standard columnar list format, legible but compact
- **Pin Displayed:** Gold Wing

### 4.4 💳 The Visual Shift: Wings vs. Cards

**The Retention Hook:** *"Keep your subscription active to keep your Wings. If you cancel and rejoin later, you will be issued a Card."*

| Aspect | 🪽 Charter Pins (Beta - Wings/Pins) | 💳 Standard Pins (Post-Launch - Cards) |
|--------|--------------------------------------|------------------------------------------|
| **Style** | 3D, textured, metallic Wing or Pin | Flat, modern, clean Card icon |
| **Look** | Distinct, "vintage," premium feel | Like an Amex or Airline Loyalty card |
| **Animation** | Holographic shimmer effect | Static, solid appearance |
| **Mark** | "EST. 2026" founder year stamp | No year mark |
| **Exclusivity** | Limited to beta participants only | Available to all post-launch subscribers |

> **Legacy Rule:** Charter pin holders retain their Wings permanently as collectibles, displayed alongside their current tier pin. Wings cannot be re-earned after beta ends.

### 4.5 🏢 The 46th Transition (Founders vs. Members)

**During Beta — Founding Shareholder ($50):**
- **Pin:** The 46th Pin (Onyx & Gold)
- **Lore:** *"You are a Founder of the 46th. You helped build the club."*
- **Wall of Fame:** Listed at the very top under "The 46th" section.

**Post-Beta — Executive Elite ($50):**
- **Pin:** The PWA Black Card (Matte Black with Diamond text)
- **Lore:** *"You are a Member of the 46th, but not a Founder. You have access to the club, but you didn't build it."*
- **Wall of Fame:** Listed in "The 46th" section, but below the Founders (with different icon).

### 4.6 📦 Evolution Summary

| Phase | Tagline | Pin System | Top Tier |
|-------|---------|--------------|----------|
| **Launch (Beta)** | "Join the Charter Program. Earn your Wings. Found the 46th." | Wings & Pins (3D, metallic, vintage) | Founding Shareholder |
| **Live (Post-Beta)** | "Join PWA. Earn Status. Get your Black Card." | Status Cards (flat, modern, clean) | Executive Elite |

### 4.7 ✈️ PWA Mileage Plus (Beta)

**System:** Virtual Loyalty Economy
**Currency Symbol:** ✈️ (PWA Miles)
**Core Philosophy:** *"Miles are paid for Presence and Quality, not Volume."*

#### 4.7.1 The Economic Engine (Status Multipliers)

Miles are earned through daily actions, but the rate of earning is determined by the user's Charter Tier. This incentivizes subscriptions by making the "grind" up to 10x faster for premium users.

| Beta Tier | PWA Status Name | Multiplier | Flavor Text |
|-----------|-----------------|------------|-------------|
| Free | Economy | 1.0x (Base) | *"Earning miles the hard way."* |
| $3 | Charter Priority | 1.5x Boost | *"A nice little tailwind."* |
| $10 | Charter Business | 3.0x Boost | *"Flying supersonic."* |
| $15 | Charter First Class | 5.0x Boost | *"Miles pile up while you sleep."* |
| $35 | Founding Shareholder | 10.0x Boost | *"You own the airline."* |

#### 4.7.2 Sources: Earning Miles (Accrual)

##### A. Daily Operations (Subject to Multiplier)
Primary drivers for Daily Active Users (DAU).

**The Boarding Pass (Daily Check-In)**
- **Action:** Click the "Check In" stamp on the user dashboard.
- **Base Value:** 10 Miles.
- *(e.g., A Shareholder earns 100 Miles instantly).*

**Flight Time (Chat Activity)**
- **Action:** Sending a message to any character.
- **Base Value:** 1 Mile per message.
- **Cap:** First 20 messages per day only.
- **Why:** Prevents bot spamming while rewarding genuine usage.

##### B. Performance Rewards (Flat Rate - No Multiplier)
Rewards for quality content, not volume. Prevents "slop" spam.

| Achievement | Reward | Condition |
|-------------|--------|-----------|
| Trending Character | 500 Miles | User's character appears on the "Trending/Popular" homepage tab for 24h. |
| Frequent Flyer Favorite | 250 Miles | User's character reaches 100 unique chats started by others. |

##### C. Career Achievements (One-Time Stimulus)
Fixed rewards to guide users through the features.

| Achievement | Reward | Condition |
|-------------|--------|-----------|
| Maiden Voyage | 50 Miles | First message sent. |
| Passport Control | 100 Miles | Complete Profile: Bio, Avatar, Banner. |
| Squid Groper | 1,000 Miles | Unlock the "Family Secret" toggle. |
| Co-Pilot Referral | 200 Miles (+1,000 Bonus) | Refer a friend (bonus if friend subscribes). |

##### D. Weather Events (Server-Side)
- **"Strong Tailwind Weekend":** Global 2x Modifier on all Daily Operations.

#### 4.7.3 Sinks: Spending Miles (Deflation)

##### A. The Duty-Free Shop 🛍️
Cosmetics and Progression.

**Cosmetic Upgrades:**
| Item Type | Examples | Cost Range |
|-----------|----------|------------|
| Chat Bubbles | Neon, Parchment, Holographic | 500 - 2,000 Miles |
| Profile Skins | Cockpit, Deep Sea, Night Flight | 1,000 - 5,000 Miles |

**The Pin Collection:**
| Pin | Cost |
|-----|------|
| "Sumi Fan Club" | 500 Miles |
| "Mile High Club" | 6,900 Miles |

**Award Travel (Subscription Redemption):**
Exchange miles for 1 Month of Status.

| Redemption | Cost |
|------------|------|
| 1 Month Priority | 5,000 Miles |
| 1 Month Business | 15,000 Miles |

##### B. The Passenger Upgrade Program (Gifting) 🎁
Wealthy users sponsor subscriptions for others.

> **Rule:** Only Paid Charter Members can send gifts.

| Gift | Cost | Recipient Gets |
|------|------|----------------|
| 1 Month Priority ($3) | 5,000 Miles | Priority tier for 1 month |
| 1 Month Business ($15) | 20,000 Miles | Business tier for 1 month |
| 1 Month First Class ($25) | 35,000 Miles | First Class tier for 1 month |

**Reward:** The Gifter earns "Philanthropist" Heart Pins.

##### C. Developer & Community Utility
Theoretical uses for "Sunken" currency.

- **Roadmap Voting:** Users spend Miles to vote on the next feature.
- **Global Goals:** *"If the community burns 10 Million Miles, we release a new exclusive background."*

#### 4.7.4 The Mini-Game: "Security Check" 🎲

A Daily RNG interaction with Sumi.

**Trigger:** "Pass Security" Button on Dashboard.
**Logic:** d20 Roll.

| Roll | Result | Reward |
|------|--------|--------|
| 1 | Pat Down 🚨 | 1 Mile + "Contraband" Achievement |
| 2-10 | Cleared 🛂 | 25 Miles |
| 11-19 | Preferred ✨ | 75 Miles |
| 20 | VIP Access 👑 | 500 Miles + "Diplomat" Achievement |

**Streak Bonus:** 7-Day Login Streak grants "Advantage" (Roll twice, take highest).

**The Sink (Bribery):** Users can pay 50 Miles to Re-Roll (Max 3x/day).

##### Security Achievements (Milestone Tracks) 🏆
Long-term tracking for rolls and bribes.

**🚨 The "Most Wanted" Track (Accumulating Nat 1s)**

| Count | Title | Reward | Flavor |
|-------|-------|--------|--------|
| 1x | Contraband | 50 Miles | *"Survivor of a comprehensive Sumi pat-down."* |
| 5x | Person of Interest | 250 Miles | *"Security has flagged you for 'Enhanced Screening'."* |
| 20x | Sumi's Favorite | 1,000 Miles + Title "Inked" | *"We think you're getting caught on purpose."* |

**👑 The "VIP" Track (Accumulating Nat 20s)**

| Count | Title | Reward | Flavor |
|-------|-------|--------|--------|
| 1x | Diplomatic Immunity | 200 Miles | *"You walked right past security."* |
| 5x | Global Entry | 1,000 Miles | *"Your face is your boarding pass."* |
| 20x | The Untouchable | 5,000 Miles + Title "Diplomat" | *"Rules are for other people."* |

**💸 The "Bribery" Track (Accumulating Paid Re-Rolls)**

| Count | Title | Reward | Flavor |
|-------|-------|--------|--------|
| 1x | Under the Table | 10 Miles | *"Paying to look the other way."* |
| 50x | Lobbyist | 500 Miles | *"Significantly donated to the Security Fund."* |
| 100x | Kingmaker | Unique "Gold Coin" Chat Bubble | *"You single-handedly funded the new terminal."* |

**✨ Special Streaks**

| Achievement | Reward | Condition |
|-------------|--------|-----------|
| Iron Bladder | 1,000 Miles | 30-Day continuous Login Streak |
| High Roller (Hidden) | 5,000 Miles | Roll two Nat 20s in a row |

#### 4.7.5 🎪 The Collectibles Vault (FOMO Engine)

**Design Philosophy:** *"If you weren't there, you missed it forever."*

The Collectibles Vault is designed to create urgency, reward loyalty, and give long-term users bragging rights. Every item tells a story of "I was there."

##### A. Collectible Categories

| Category | Description | FOMO Level |
|----------|-------------|------------|
| 🪽 **Charter Pins** | Beta-only Wings (see 4.4) | **PERMANENT** - Never available again |
| 🎫 **Event Pins** | Holiday/anniversary exclusives | **SEASONAL** - Returns annually (maybe) |
| 💬 **Chat Bubbles** | Message styling cosmetics | **MIXED** - Some permanent, some rotating |
| 🎨 **Profile Skins** | Dashboard themes | **MIXED** - Some permanent, some rotating |
| 📌 **Pins** | Collectible achievements | **PERMANENT** - One-time unlock windows |
| 🏷️ **Titles** | Display name prefixes/suffixes | **MIXED** - Earned or purchased |

##### B. Limited-Time Events (The Panic Button)

**Seasonal Events:**
| Event | Window | Exclusive Items | Returns? |
|-------|--------|-----------------|----------|
| 🎄 **Winter Flight** | Dec 15 - Jan 5 | Snowflake Bubble, "Frostbite" Title | Annually (different items each year) |
| 🌸 **Cherry Blossom Festival** | Mar 20 - Apr 10 | Sakura Skin, "Hanami" Pin | Annually (different items each year) |
| 🎃 **Phantom Flight** | Oct 15 - Nov 1 | Spooky Bubble, "Specter" Title | Annually (different items each year) |
| 🎂 **Anniversary Flight** | Launch Date | "Year One" Pin, Founder Skin | **NEVER** - Each year is unique |

**Flash Sales (48-72 Hours Only):**
- Random weekends with exclusive recolors
- "Lightning Deal" banner with countdown timer
- Items NEVER return in the same form

##### C. The Rotating Shop (Duty-Free Carousel)

**Mechanic:** The Duty-Free Shop has two sections:
1. **Permanent Stock** - Always available basics
2. **Rotating Stock** - 3-5 items that change weekly

**The Hook:**
> *"This item leaves the shop in 3 days. 47 users have purchased it."*

**Rotation Rules:**
- Items rotate every **Monday at midnight UTC**
- Retired items may return in **6+ months** (no guarantee)
- Some items are marked **"Final Flight"** = Never returning

##### D. Achievement Windows (You Had to Be There)

Some achievements can ONLY be earned during specific periods:

| Achievement | Window | Reward | Status |
|-------------|--------|--------|--------|
| **Founding Passenger** | Beta Period Only | Exclusive "EST. 2026" frame | 🔒 Locked after launch |
| **First 1,000** | First 1,000 users | "Pioneer" Title + Gold border | 🔒 Permanently locked |
| **Launch Day** | First 24 hours of live | "Day One" Pin | 🔒 Permanently locked |
| **Bug Hunter** | Report accepted bug in beta | "Exterminator" Pin | 🔒 Locked after launch |
| **The OG 46** | First 46 Shareholders | Secret cosmetic + credits | 🔒 Permanently locked |

##### E. The "Missed Flights" Display (Maximum FOMO)

**Profile Section:** Users can optionally display a "Missed Flights" section showing:
- Grayed-out pins they *could* have earned but didn't
- Event items they didn't purchase in time
- Achievement windows that have closed

**Purpose:**
- Shows other users what they missed (social proof)
- Motivates current users to not miss future events
- Creates "veteran" vs "newbie" visual distinction

**Toggle:** Users can hide this section if they find it painful (we're not *that* cruel)

##### F. The Collector's Score

**Mechanic:** A visible score showing collection completion:
🏆 Collector's Score: 47/156 (30%) ├── Wings: 12/45 ├── Bubbles: 8/32 ├── Skins: 5/28 ├── Pins: 15/38 └── Titles: 7/13

**Leaderboard:** Top collectors displayed on a "Hall of Collectors" page.

**The Flex:** High collectors get a special animated border on their profile.

##### G. The Vault Rules (Anti-Devaluation)

> **No Comebacks:** Items marked "Limited" or "Final Flight" will NEVER be re-released in identical form. Recolors/variants are possible, but originals stay rare.

> **No Buying Completion:** Some items are achievement-locked and cannot be purchased. You MUST earn them.

> **Tier-Gated Items:** Some shop items require minimum tier to purchase (e.g., "First Class Lounge Skin" requires First Class subscription).

> **The 46th Exclusives:** Certain items are ONLY available to $50 tier members, creating aspirational FOMO for lower tiers.

#### 4.7.6 Safety & Restrictions (The No-Fly List) 🛑

> **Closed Loop Only:** NO Real Money Trading (RMT). Miles cannot be exchanged for cash.

> **No Transfers:** Users cannot send Miles directly to each other (prevents black markets).

> **No "Creation" Rewards:** No Miles for simply publishing a character or generating an image (prevents spam/cost).

> **The Whales:** The Shareholder ($50) Tier cannot be bought with Miles. It requires real money.

## 5. Technical Requirements

### 5.1 Technology Stack
- **Frontend:** Next.js 16.1.4 (Turbopack) + React 19 (backend), TypeScript, Custom CSS Variables (theme customization) + some Tailwind CSS utilities.
- **Backend:** Next.js API Routes (TSX/TypeScript).
- **Auth:** SubscribeStar.adult OAuth (Identity) + Custom Vault (Data Access).
- **Database:** Neon (PostgreSQL).
- **Storage:** Cloudflare R2 (Assets/Avatars).
- **Hosting:** Netlify (with Cloudflare DNS).
- **Encryption:** Planned - Web Crypto API (Client-Side AES-GCM). Currently: None implemented.

### 5.2 Zero-Knowledge Sync Architecture (Crucial)
To support cross-device sync without compromising privacy, we utilize a **"Two-Layer"** authentication system.

1.  **Layer 1: Identity (SubscribeStar.adult)**
    - User logs in via SubscribeStar.adult OAuth.
    - Server verifies subscription status and identity.
    - Grants access to account metadata (Settings, Profile, Public Posts).

2.  **Layer 2: Data Access (The Vault)**
    - User sets a separate **Vault Password** (never sent to server).
    - Client derives an **Encryption Key** from this password (PBKDF2/Argon2).
    - **Encryption:** Chat logs & Private Characters are encrypted with this Key -> Sent to Neon.
    - **Sync:** New device downloads encrypted blob -> User enters Vault Password -> Client decrypts data locally.
    - **Session:** The Key is cached in memory for the active session (seamless sync).

3.  **Account Recovery:**
    - A **Recovery Key** is generated client-side at setup.
    - User **MUST** download/save this key.
    - It is the **ONLY** mechanism to reset the Vault Password if lost.

### 5.3 Privacy & Safety Specs
- **Passenger Data (Economy Tier):** Stored 100% in `localStorage` / IndexedDB.
- **Supporter Data:** Zero-Knowledge Encrypted on Server.
- **Logging Policy:**
    - ✅ **Logged:** Login metadata, IP (hashed 24h), Usage counts (50/50), Error codes, Public Gallery activity.
    - ❌ **Ignored:** Private Chat text, Prompt inputs, Generated Images (unless public).

### 5.4 Frontend Architecture & State Management (Zustand)

**Core Requirement:** The application must deliver a "Native App-like" experience with zero navigation latency and instant feedback for gamified elements.

1.  **Persistent Layout Pattern (Next.js):**
    * The Application Shell (Navbar, Sidebar, Footer) must use the **Next.js Layout** pattern (`layout.tsx`) to ensure the shell remains mounted during page transitions.
    * **Navigation Stability:** Navigating between internal routes (e.g., Hangar -> Lounge) must **NOT** trigger a component unmount/remount of the shell or a data re-fetch. The Navbar must remain static and hydrated with the existing session data.

2.  **Global State (Zustand):**
    * **Zustand** must be used as the singular source of truth for high-frequency user data (Miles, Notifications, Achievements, Pins, User Identity).
    * **Reactive Updates:** Navbar components (Miles Counter, Nameplate, Notification Bell) must subscribe directly to specific slices of the Zustand store. They must update *instantly* when state changes occur (e.g., "Message Sent" → "Miles +1") without triggering a re-render of the parent layout or a server fetch.
    * **No Re-fetching on Navigate:** Navbar data (User Profile, Wallet) is fetched *once* on initialization (or re-validation) and stored in Zustand. Route changes must rely on this cached state.

3.  **Optimistic UI:**
    * All gamification events (earning miles, unlocking pins, daily check-ins) must utilize **Optimistic Updates**. The UI reflects the success state immediately while the backend request processes in the background.

## 6. Development Phases
- **Phase 1:** Foundation (Hangar) ✅
- **Phase 2:** User Infra (SubscribeStar/Neon) ✅
- **Phase 3:** Hub & Vault (Encryption/Sync) 🔄
- **Phase 4:** The Lounge (Chat & BYOK) 📋
