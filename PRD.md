# DOCUMENT CONTROL
# Title: Product Requirements Document: AkshoAI
# Version: 2.3
# Created: 2025-10-15
# Last Updated: 2026-02-17
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

The Lounge is the social heart of AkshoAI, serving as both a discovery engine for new characters and a secure interface for private interaction.

#### 3.2.1 The Main Lounge (Gallery Interface)
The entry point is a responsive, grid-based card gallery designed for discovery and curation.

**Visual Layout:**
-   **Vertical Navigation Sidebar:** Navigation tabs are stacked vertically on the left side of the screen, anchored under the Sumi logo.
-   **Dynamic Grid:** Rows of character cards that scale and reflow automatically based on viewport size.
-   **Card Anatomy:** Horizontal layout displaying Avatar (Left), Name (Top), Bio (Right), and Tags (Bottom).

**Sidebar Tabs:**
1.  **Your Hosts:** A dedicated view of the user's own creations.
2.  **Timeline:** A chronological feed from "Favorited" creators.
3.  **Swipy:** (See 3.2.2) Tinder-style discovery queue.
4.  **New / Trending / Popular:** Standard discovery feeds.
5.  **Male / Female:** Quick-filters by gender.
6.  **Random:** Serves a randomized assortment of characters.

**Gallery Restrictions:**
-   **Supporters:** Can publish characters to the Public Gallery (Subject to Quality/Style Gates).
-   **Economy Passengers:** Can browse and chat locally, but **cannot publish** to the Gallery.

#### 3.2.2 The "Swipy" Discovery Engine
A gamified discovery interface designed to break "choice paralysis."
-   **The Queue:** Presents a curated stack of 5-10 Hosts based loosely on user preferences.
-   **Mechanic:**
    -   **Swipe Left:** Skip (Remove from queue).
    -   **Swipe Right:** Chat (Immediately opens a new chat session).

#### 3.2.3 The Chat Interface & Avatar Logic
**Layout:**
-   **Left Column:** Large Portrait-oriented Character Avatar.
-   **Right Column:** Chat stream (bubbles/rectangles).
-   **Host State:** A small dynamic tag showing the character's current emotional/physical state.

**Avatar Rendering Modes:**
1.  **Static:** Displays a single chosen image.
2.  **Gallery Cycle:** Rotates through the Host's gallery with every reply.
3.  **Emotional (Context-Aware):** Dynamically changes the avatar based on **Host State** (e.g., context = "sad" → loads `sad.webp`).

#### 3.2.4 Proprietary Frameworks (Immersion)
-   **Sonarcore:** An in-house engine that injects a real-time status line (*Clothes, Location, Time*) under every reply and adds onomatopoeic SFX (*PLAP, SHLURP*) based on context.
-   **Picturize:** A manual image generation feature that lets users click a button to generate contextual images based on the current chat state (location, clothing, pose, etc.) using their configured image provider (ComfyUI local, RunPod BYOK, NovelAI, etc.). If a Host specifies an exclusive model (Business tier+), the system displays a recommendation to use that model for authentic visuals matching the creator's gallery, but users can generate with their own setup if preferred. See Section 4.8.1 for Exclusive Model Library details.

#### 3.2.5 The Chat Engine (Backend)
-   **BYOK Engine:** Direct client-side connection to Anthropic, OpenAI, Deepseek, and OpenRouter. Keys are stored locally or in the Vault.
-   **"Aksho Mini":** A free, hosted 7B model for casual users (Limit: 50 messages/24h).
-   **Context Management:** The engine automatically handles Character Definition injection, Lorebooks (World Info), and Chat History management.

#### 3.2.6 Privacy & Content Safety
**Zero-Knowledge Privacy:**
-   Private chat logs are **encrypted client-side** using the Vault Password before sync.
-   AkshoAI cannot read private chats even if compelled, as we do not hold the decryption keys.

**The Sumi Scale (Content Rating):**
We use **Sumi**, our squid mascot, as a visual indicator for content rating.

| Level | Name | Icon State | Description |
|-------|------|------------|-------------|
| **1** | **SFW (Clean)** | Pink squid | Safe for work. Family-friendly. |
| **2** | **NSFW (Leaking)** | Pink squid, dripping ink | Explicit erotica/nudity. Adults only. |
| **3** | **NSFL (Splatter)** | Pink squid covered in ink explosion | Extreme content/Gore. Opt-in only. |

**The Sumi Overlay Mechanic:**
Instead of generic blur/pixelation, restricted content is covered with a stylized **Ink Overlay** featuring Sumi.
-   **SFW Avatars:** Always visible.
-   **NSFW Avatars:** Covered with **Ink Overlay** by default. Click once to reveal.
-   **NSFL Avatars:** Covered with **Heavy Splatter**. Click to reveal (Requires Settings Opt-in).
-   **Hard Restriction:** Thumbnails must **never** contain close-up genitals or penetration, even if covered.

### 3.3 ATELIER - The Image Generator
**Tagline:** "Flexible image generation with custom API keys and multiple backend support."

**Features:**
- **Integrations:** NovelAI, Tensor.art, and RunPod API support (BYOK).
- **Exclusive Model Library (Business+):** Curated collection of creator-uploaded models available exclusively to Business tier and above. Models are injected into user's RunPod instance (user provides RunPod API key). Used for authentic Picturize visuals and premium character aesthetics. See Section 4.8.1.
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
| **$3** | $5 | Charter Priority | 🪽 Silver Wing | Priority | 💳 Silver Status Card |
| **$10** | $15 | Charter Business | 🪽 Gold Wing | Business Class | 💳 Gold Status Card |
| **$20** | $25 | Charter First Class | 🪽 Diamond Wing | First Class | 💳 Platinum Status Card |
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

#### 🥈 Charter Priority → Priority (Beta: $3/mo | Launch: $5/mo)
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
- ✅ **Exclusive Model Library:** Access to curated creator models for authentic Picturize visuals and premium aesthetics (Section 4.8.1).
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

##### E. Codeshare Agreements (Creator Payouts) ✈️
*Passive income for active creators.*

**Lore:** *"We provide the lounge, you provide the company. When fellow **Passengers** interact with your **Hosts**, you earn Codeshare Royalties."*

**The Mechanic (RPM):**
Creators earn PWA Miles based on the engagement their public Hosts generate.
* **Metric:** Messages received by your **Hosts** from *unique authenticated* **Passengers** (Self-chats and Economy guest accounts excluded — see Section 4.8.5).
* **Payout Schedule:** Credited daily at 00:00 UTC.
* **Safety Cap:** Max **1,000 Miles** per day per creator (prevents inflation exploits).

**The Commercial License (Standardized Rate):**
To ensure fairness, all publishing creators earn at the same rate. Income is determined by the quality of your Host, not your subscription tier.

* **Eligibility:** Must hold **Priority ($5)** status or higher (to publish to Public Gallery).
* **The Flat Rate:** **1 Mile per 5 Messages.**
* *Note: Economy Passengers cannot publish, therefore they cannot accrue Codeshare Miles.*

**Why this works:**
1.  **Meritocratic:** A $5 Priority subscriber creating an amazing character earns just as much as a $50 Shareholder.
2.  **Anti-Slop:** Since the rate is fixed (1:5), you can't just pay for a higher multiplier to farm miles with low-effort content. You actually need engagement.

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
| 1 Month Priority ($5) | 5,000 Miles | Priority tier for 1 month |
| 1 Month Business ($15) | 20,000 Miles | Business tier for 1 month |
| 1 Month First Class ($25) | 35,000 Miles | First Class tier for 1 month |

**Reward:** The Gifter earns "Philanthropist" Heart Pins.

##### C. Developer & Community Utility
Theoretical uses for "Sunken" currency.

##### D. The Ad Board (Marketing Sinks) 📢
*Reinvest your earnings to grow your audience.*

Creators can spend Miles to promote their Hosts in dedicated "Sponsored" slots on the Lounge Sidebar or "Swipy" queue.

| Action | Cost | Effect |
| :--- | :--- | :--- |
| **Priority Boarding** | 2,000 Miles | Your Host appears 2x more frequently in "Swipy" for 24h. |
| **Lounge Pass** | 5,000 Miles | Your Host is pinned to the "Recommended" Sidebar tab for 24h. |
| **Global Announce** | 10,000 Miles | A one-time "New Arrival" push notification to your followers. |

*Why this works:* It creates a deflationary loop. Creators earn Miles from engagement, then burn those Miles to get *more* engagement. The platform wins because the "Miles" are destroyed in the process.

##### E. The High Roller Suite (Prestige Sinks) 🎩
*Extremely expensive items for the 1% who have "too many miles."*

| Item | Cost | Description |
| :--- | :--- | :--- |
| **"Private Jet" Skin** | 50,000 Miles | A gold/leather profile theme. The ultimate flex. |
| **Custom Title** | 100,000 Miles | Purchase a custom, unique text title for your profile. |
| **User ID Customization** | 250,000 Miles | Change your 6-digit User ID to a custom string (e.g., #AKSHO). |
| **The "Golden Ticket"** | 1,000,000 Miles | A physical, real-world AkshoAI pin mailed to your house. |

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

##### H. Rarity Tiers & Visual Effects

All collectibles (Pins, Achievements) follow an MMORPG-style rarity system with escalating visual effects:

| Tier | Color | Visual Effect |
|------|-------|---------------|
| **Common** | Gray | Static (no animation) |
| **Uncommon** | Green | Gentle pulse glow |
| **Rare** | Blue | Shimmer sweep effect |
| **Epic** | Purple | Pulse glow + shimmer sweep |
| **Legendary** | Gold | Intense glow + 6 gold sparkle particles |
| **Mythic** | Red | Pulsing red glow + 8 multi-color sparkles (green/blue/purple/gold) |

**Visual Hierarchy:**
- Higher rarities have more pronounced animations and particle effects
- Mythic items showcase ALL previous rarity colors in their sparkle effects
- Sparkles appear at random positions across the item card and twinkle with staggered timing
- Effects only appear on **earned/unlocked** items (locked items show static borders)

> **See:** `rarity-system.md` for full technical implementation details.

#### 4.7.6 Safety & Restrictions (The No-Fly List) 🛑

> **Closed Loop Only:** NO Real Money Trading (RMT). Miles cannot be exchanged for cash.

> **No Transfers:** Users cannot send Miles directly to each other (prevents black markets).

> **No "Creation" Rewards:** No Miles for simply publishing a character or generating an image (prevents spam/cost).

> **The Whales:** The Shareholder ($50) Tier cannot be bought with Miles. It requires real money.

#### 4.7.7 Easter Eggs 🥚

*Hidden secrets and unlockables for the curious.*

- Easter Eggs will be added over time, tied to hidden interactions within all the products.

### 4.8 🤝 Aksho Creator Partner Program (ACPP)

Tagline: "Create characters people love. Earn up to 70% — forever."

Lore: "Some Passengers don't just fly — they build the destinations. The Aksho Creator Partner Program is an invite-only, application-vetted partnership for proven creators whose Hosts convert free users into paying subscribers. Every subscriber your Host brings in earns you a permanent revenue share — up to 70% — for as long as they stay subscribed. No time limits, no windows, no caps. Your characters do the work; you collect the check. Industry-competitive rates, zero out-of-pocket risk for either side."

Core Principle: This is a conversion-driven revenue share system, entirely separate from the PWA Miles economy. Miles remain a closed-loop virtual currency (Section 4.7.6 still applies). The ACPP pays creators real money exclusively from the new subscription revenue their content generates — conversions from free to paid that are directly attributable to a creator's Hosts.

Business Rationale — The Zero Out-of-Pocket Model:
AkshoAI never pays creators from existing organic revenue. Every dollar paid out comes from a conversion that would not have happened without that creator's content. If a free Passenger chats with Creator X's Host and upgrades to a paid tier, Creator X earns a percentage of that new subscriber's revenue permanently. The result: creators are funded entirely by the conversions they drive, and Aksho's organic revenue is never touched.

The Conversion Engine — Two Paths to Upgrade:
Conversions happen through two complementary mechanisms: organic engagement (users love your Host and upgrade naturally) and exclusive model appeal (users want authentic visuals matching your gallery and upgrade for Business tier access to exclusive AI models). Both paths drive ACPP revenue share. The exclusive model library creates premium value without hard paygating — users can always generate with their own setup, but exclusive models provide aspirational appeal that drives Business tier conversions.

Two-Track Reward System:
- Cash Track (ACPP): Conversion-driven revenue share → real money payouts. Only from new revenue creators generate. Conversions driven by engagement OR exclusive model appeal both earn the same 25-70% share.
- Miles Track (Codeshare): Engagement-based rewards → PWA Miles for cosmetics/redemptions. Zero cash cost to Aksho. Rewards creators for keeping existing subscribers engaged and reducing churn.

---

#### 4.8.1 How ACPP Works

The ACPP is a conversion-driven revenue share program where Host creators earn 25-70% of subscription revenue from users they convert. Conversions happen through organic engagement (users love your Host) and exclusive model appeal (users upgrade for Business tier access to exclusive AI models that match your Host's aesthetic). Both paths earn the same revenue share — what matters is that your Host drove the conversion.

##### Eligibility Requirements (Application-Only, Vetted)

The ACPP is not open enrollment. It is an exclusive, application-only program for creators who have already proven their Hosts generate real engagement. Applications are manually reviewed by the Aksho team.

Creators must meet ALL of the following to apply:

- Must hold Priority ($5/mo) or higher (publishing gate already enforced)
- Minimum 2 public Hosts in the Community Gallery
- Minimum 10,000 total messages received from authenticated Passengers (lifetime, self-chats and Economy guest accounts excluded — see 4.8.5)
- Minimum 200 unique authenticated chatters across all Hosts (lifetime)
- Must meet at least ONE of the following quality signals:
  - At least one Host has appeared on the Trending page (resets monthly)
  - At least one Host has appeared on the Popular page (all-time engagement ranking)
  - At least one Host has a 40%+ return rate (unique users who come back for a second session)
- Account in good standing (no content policy violations, no prior fraud flags)
- Account must be at least 60 days old
- Must agree to the Creator Partner Agreement (separate legal document covering content standards, payout terms, tax obligations, and termination conditions)
- Must submit W-9 (US) or W-8BEN (international) tax form before first payout

Applications that don't meet all requirements are automatically rejected. Creators can reapply after 30 days if they've since met the thresholds.

##### Creator Partner Tiers

| Partner Tier | Monthly Conversions Driven | Conversion Revenue Share |
|---|---|---|
| 🥉 Bronze Partner | 3+ conversions/mo | 25% of converted user's net sub |
| 🥈 Silver Partner | 10+ conversions/mo | 40% of converted user's net sub |
| 🥇 Gold Partner | 25+ conversions/mo | 55% of converted user's net sub |
| 💎 Platinum Partner | 50+ conversions/mo | 70% of converted user's net sub |

Revenue share is permanent for as long as the converted subscriber remains active. There is no attribution window or time limit. If a creator's Host drives a conversion that stays subscribed for 3 years, the creator earns their share for all 3 years. Natural subscriber churn is the only limiting factor — when the subscriber cancels, the payout stops. This is fair: if your character is the reason someone keeps paying, you deserve your cut for as long as they stay.

> Definition — "Conversion": A free Economy Passenger who upgrades to any paid tier (Priority, Business, First Class, or Shareholder) within 3 days of having a qualifying engagement (10+ messages) with a creator's public Host. Conversions can happen organically (users love your Host and upgrade naturally) or via Picturize (users see exclusive model recommendation and upgrade for Business tier access). Both earn the same revenue share.

> Attribution Rule — "Last Touch": Only ONE creator gets attributed per conversion — the creator whose Host the user last had a qualifying engagement with before upgrading. This mirrors industry-standard last-click attribution (YouTube referrals, affiliate marketing). No splits, no shared credit. The last Host that engaged the user gets 100% of the conversion. If the user didn't have a qualifying engagement with any creator's Host within the 3-day window, the conversion is organic and no creator is attributed. Attribution logic is identical for both organic and Picturize-triggered conversions.

##### Revenue Attribution Model (Conversion-Based, Permanent)

Unlike a pool model that taxes all revenue, the ACPP only pays from conversions — and pays for as long as that conversion stays active. The math:

```
Per-Conversion Monthly Payout =
  Converted User's Subscription Price
  × 0.80 (after ~20% SubscribeStar cut)
  × Creator Tier Share %

Total Creator Monthly Payout =
  Sum of all active attributed conversions (no expiry — permanent while subscriber is active)

Example — Gold Partner drives a Business ($15/mo) conversion:
  $15.00 × 0.80 = $12.00 net to Aksho
  $12.00 × 0.55 (Gold tier share) = $6.60/mo to creator
  Aksho retains: $5.40/mo for as long as the subscriber stays

  If subscriber stays 12 months:
    Creator earns: $6.60 × 12 = $79.20
    Aksho retains: $5.40 × 12 = $64.80
    Without the creator: $0 (user would have stayed free)

Example — Platinum Partner drives a First Class ($25/mo) conversion:
  $25.00 × 0.80 = $20.00 net to Aksho
  $20.00 × 0.70 (Platinum tier share) = $14.00/mo to creator
  Aksho retains: $6.00/mo for as long as the subscriber stays

  If subscriber stays 12 months:
    Creator earns: $14.00 × 12 = $168.00
    Aksho retains: $6.00 × 12 = $72.00
    Without the creator: $0 (user would have stayed free)
```

Key insight: Without the creator, that user stays free = $0 revenue. With the creator, Aksho nets $1.20–15.00/mo depending on tier and subscription level. The creator payout is funded entirely by money that didn't exist before. Aksho retains 30-75% of every conversion (depending on tier), and natural churn (~5% monthly) means any given conversion cohort decays over time — after 12 months, only ~54% of a cohort remains active; after 24 months, ~29%. Even at the Platinum tier (70% to creator) on a Priority ($5) subscription, Aksho still nets $1.20/mo per conversion that would have been $0 without the creator.

##### Tier Upgrade Attribution

When a converted subscriber upgrades to a higher tier, the attribution simply updates to the new tier price:

- The original converting creator retains attribution
- The revenue share automatically increases to match the new subscription price
- No re-attribution or new conversion record needed — same creator, higher payout

```
Example — Creator originally converted a Priority ($5) user:
  Earning: $5 × 0.80 × 0.55 = $2.20/mo (Gold tier)

  User upgrades to Business ($15) at month 2:
  Payout automatically adjusts: $15 × 0.80 × 0.55 = $6.60/mo
  No window reset, no re-attribution — same creator, same conversion, higher value
```

##### The Two Conversion Paths

Conversions happen through two complementary mechanisms, both earning the same ACPP revenue share:

**Path 1 — Organic Engagement:**
Users engage with your Host, fall in love with the character and experience, and upgrade naturally to unlock more features (unlimited messages, priority generation, etc.). This is the classic conversion funnel: great content → engaged user → paying subscriber.

**Path 2 — Exclusive Model Appeal (Business+ tier):**
When you design a Host, you can assign an exclusive AI model from the Business+ tier library. Your gallery images/avatars showcase the authentic aesthetic that model creates. When free or Priority users click Picturize during chat, they see:

> "This host was designed with **'ModelName'** exclusive model. For authentic visuals matching the gallery, upgrade to Business tier to access exclusive models. You can still generate with your current provider and standard models, but results may vary from the creator's intended aesthetic."
>
> Buttons: **[Upgrade to Business]** or **[Generate Anyway]**

**Key principle:** This is NOT a hard paygate. Users can always generate with their own setup (BYOK RunPod, NovelAI, local ComfyUI, etc.). The exclusive model is aspirational — it creates value perception without blocking functionality. Users who upgrade for authentic visuals = ACPP conversion attributed to you.

**Revenue Share is Identical:**
Whether a user converts because they love your Host's personality OR because they want exclusive model access for visuals, you earn the same 25-70% revenue share. The conversion window (3 days, 10+ messages), attribution (last-touch), and payout (permanent) are identical. What matters is that your Host drove the upgrade.

**Model Creator Role:**
Model creators upload exclusive models to Aksho (application-based, curated). They gain exposure, portfolio visibility, and community recognition — but receive ZERO direct payouts. This maintains ACPP's zero-dilution principle: your 25-70% share stays unchanged. Model creators benefit from marketing exposure; you benefit from conversions their models help drive.

##### The Codeshare Miles Track (Retention Rewards — Zero Cash Cost)

The existing Codeshare system (Section 4.7.2.E) handles retention rewards entirely in Miles:

- Creators earn 1 Mile per 5 messages received from unique Passengers (existing mechanic)
- Capped at 1,000 Miles/day per creator
- Miles are spent in the Duty-Free Shop on cosmetics, subscription credit redemptions, etc.
- This costs Aksho zero real money — Miles are virtual currency in a closed loop
- Retention rewards stay in Miles; conversion rewards pay cash. The two systems never cross.

##### Payout Terms

- Payout Processor: PayPal or Stripe Connect (separate from SubscribeStar)
- Minimum Threshold: $25 accumulated before payout is issued
- Payout Cycle: Monthly, processed within 15 business days of month end
- Rollover: Sub-threshold balances roll over indefinitely until the $25 minimum is met
- Tax Compliance: US creators earning >$600/year receive a 1099-NEC. International creators are responsible for their local tax reporting. All creators must submit a W-9 (US) or W-8BEN (international) before first payout.
- Currency: USD only
- Conversion disputes: 30-day review window. If a subscriber refunds within 7 days (pro-rated refund policy), the conversion attribution is voided and no payout is issued for that conversion.

---

#### 4.8.2 The Exclusive Model Library (Technical Details)

The Exclusive Model Library is a curated collection of AI models (checkpoints, LoRAs, VAEs, adetailers) hosted on Cloudflare R2 and available exclusively to Business+ tier subscribers. When users generate images with RunPod (BYOK), Aksho injects exclusive models into their instance on-demand.

##### Infrastructure & Workflow

**Model Hosting:**
- Stored on Cloudflare R2 (~$150/mo for 50-100 models)
- Model metadata database (model_id, creator_id, model_type, tags, preview_images, host_usage_count)
- Tier-gated access (Business+ only)

**Generation Workflow:**
1. User triggers Picturize with exclusive model (Business+ tier)
2. Aksho API spins up RunPod instance using user's RunPod API key (BYOK)
3. Aksho injects exclusive model from R2 to instance `/models/` directory
4. Runs generation via ComfyUI workflow
5. Returns image to user
6. Terminates instance (user pays RunPod compute cost)
7. Logs generation event for analytics

**R2 Bucket Structure:**
```
/exclusive-models/
  /checkpoints/vete-dreamhex-v2.safetensors (3.5GB)
  /loras/style-enhancer-v1.safetensors (144MB)
  /vae/anime-vae.safetensors (335MB)
  /adetailers/face-fix-v3.pt (78MB)
```

##### Model Creator Application Process

**Eligibility:**
- Demonstrate technical skill (portfolio review)
- Meet quality standards (aesthetic coherence, no NSFL content)
- Sign Model License Agreement (Aksho exclusive hosting rights, creator retains ownership)
- Provide model metadata (tags, intended use case, preview images)

**Review Process:**
- Manual review by Aksho team
- Test generations to validate quality
- Acceptance = model goes live
- Rejection = feedback provided, can reapply after 30 days

**Model Creator Benefits:**
- Featured in "Model Creators" showcase page
- Analytics dashboard (which Hosts use your model, total generations, conversion impact)
- Public portfolio link on model detail pages
- Community recognition and exposure (leverage for external opportunities)

##### Safeguards & Quality Control

**Content Policy:**
- No photorealistic/deepfake models
- No models designed for NSFL content
- Must be legally redistributable (creator owns rights or has license)
- Violations = immediate removal, creator banned

**Host Assignment Rules:**
- Only ACPP-approved creators can assign exclusive models to Hosts
- Hosts cannot change assigned model after 100+ chats (prevents bait-and-switch)
- If model removed from library, Host reverts to standard fallback model

**Usage Monitoring:**
- Track Hosts using each model
- Track conversion rates per model (measure business impact)
- Alert if model drives disproportionate conversions (gaming detection)

##### Projected Impact

**Conservative (+15% Business conversions):**
- At 5,000 MAU with 40% paid conversion: +120 Business subscribers
- Additional monthly revenue: $1,440
- ACPP payouts (34% avg): $490/mo to Host creators
- Aksho net: $950/mo (pure incremental)
- Cost: $150/mo R2 storage (users pay RunPod via BYOK)
- Break-even: 8 Business conversions
- ROI: 760% monthly

**Optimistic (+30% Business conversions):**
- +240 Business subscribers
- Additional monthly revenue: $2,880
- ACPP payouts: $980/mo
- Aksho net: $1,900/mo
- ROI: 1,167% monthly

---

#### 4.8.3 Projected Financial Model

##### Assumptions

| Factor | Value | Notes |
|---|---|---|
| SubscribeStar platform cut | ~20% | Platform fee + payment processing |
| AI generation cost to Aksho | $0 | BYOK model — users pay their own API costs |
| Weighted ARPU (paid users) | ~$15.25/mo | Blended across Priority/Business/First Class/Shareholder (35%/40%/20%/5% distribution) |
| Net ARPU after SubscribeStar | ~$12.20/mo | $15.25 × 0.80 |
| Creator-driven conversion rate | ~40% of all conversions | Remaining 60% are organic (no payout) |
| Average conversion rev share | ~34% | Blended across tiers (most creators at Bronze/Silver) |
| Monthly subscriber churn | ~5% | Natural decay limits cumulative payouts |
| Revenue share duration | Permanent | Lasts as long as converted subscriber is active |
| Exclusive Model Library impact | +15-30% Business conversions | Conservative: +15%, Optimistic: +30% (Section 4.8.1) |

##### Growth Stage Projections

Stage 1 — Early Traction (Month ~6, 500 MAU)

| Metric | Value |
|---|---|
| Free users | 325 (65%) |
| Paying users (35% conversion) | 175 |
| Gross subscription revenue | ~$1,768/mo |
| Net subscription revenue (after SubscribeStar) | ~$1,414/mo |
| New conversions this month | ~15 |
| Creator-attributed conversions (40%) | ~6 |
| Active creator partners | ~10 |
| Cumulative active attributed subscribers (with churn) | ~30 |
| Creator payouts (30 subs × $12.20 × 34%) | ~$124/mo |
| Aksho net revenue | ~$1,332/mo |
| Aksho payout burden (% of net revenue) | 5.8% |

*At early stage, attributed subscriber base is still building. Payouts are modest but every dollar comes from revenue that wouldn't exist without creators.*

Stage 2 — Growth (Month ~18, 3,000 MAU)

| Metric | Value |
|---|---|
| Free users | 1,860 (62%) |
| Paying users (38% conversion) | 1,140 |
| Gross subscription revenue | ~$11,514/mo |
| Net subscription revenue | ~$9,211/mo |
| New conversions this month | ~80 |
| Creator-attributed conversions (40%) | ~32 |
| Active creator partners | ~60 |
| Cumulative active attributed subscribers (with churn) | ~250 |
| Creator payouts (250 subs × $12.20 × 34%) | ~$1,037/mo |
| Top 10 creators | ~$45–95/mo each |
| Aksho net revenue | ~$8,524/mo |
| Aksho payout burden (% of net revenue) | 7.5% |

*The attributed subscriber pool grows as conversions accumulate, but churn (~5%/mo) naturally decays older cohorts. Payouts are meaningful but still a small fraction of total revenue.*

Stage 3 — Scale (Month ~30, 15,000 MAU)

| Metric | Value |
|---|---|
| Free users | 9,000 (60%) |
| Paying users (40% conversion) | 6,000 |
| Gross subscription revenue | ~$60,600/mo |
| Net subscription revenue | ~$48,480/mo |
| New conversions this month | ~350 |
| Creator-attributed conversions (40%) | ~140 |
| Active creator partners | ~250 |
| Cumulative active attributed subscribers (with churn) | ~900 |
| Creator payouts (900 subs × $12.20 × 34%) | ~$3,733/mo |
| Top 20 creators | ~$70–200/mo each |
| Top 5 creators (Platinum, 70%) | ~$300–600/mo each |
| Aksho net revenue | ~$46,008/mo |
| Aksho payout burden (% of net revenue) | 5.1% |

*At scale, the cumulative attributed base is large but churn keeps it in check. Meanwhile, those creators are responsible for ~40% of all conversions — $29,268/mo in net revenue that wouldn't exist without them. Aksho pays out ~$3,733 (12.7% of creator-driven revenue) and keeps ~$25,535. Even at industry-competitive 70% Platinum rates, the payout burden stays around 5% of total net revenue because only conversion-attributed revenue is shared.*

**Exclusive Model Library Incremental Impact:**
At 15,000 MAU (Stage 3) with 40% paid conversion, the Exclusive Model Library adds ~120-240 Business tier subscribers (15-30% conversion boost). This generates $1,440-2,880/mo in additional revenue, with ~$490-980/mo paid to Host creators via ACPP for driving these conversions. Aksho nets $950-1,900/mo in pure incremental revenue that wouldn't exist without exclusive models. Cost: $150/mo (R2 storage only, users pay RunPod compute via BYOK). ROI: 633-1,167% monthly. Model creators receive zero direct payouts, maintaining ACPP revenue share percentages unchanged.

##### ROI Summary

| Metric | Without ACPP | With ACPP | With ACPP + Exclusive Models |
|---|---|---|---|
| Monthly churn rate | ~8% | ~5% (Codeshare Miles retention) | ~5% |
| Monthly organic growth | ~10% | ~14% (creator marketing + quality content) | ~16% (exclusive model appeal) |
| 24-month cumulative net revenue | ~$49K | ~$125K | ~$154K |
| 24-month total creator payouts | $0 | ~$12.9K | ~$17.7K |
| 24-month Aksho net after payouts | ~$49K | ~$112K | ~$136K |
| Incremental revenue from ACPP | — | +$76K | +$105K |
| Total creator payouts | — | -$12.9K | -$17.7K |
| Exclusive Model Library cost (24mo) | — | — | -$3.6K (R2 storage) |
| Net gain | — | +$63K | +$83.7K |
| ROI | — | 489% | 610% |
| Payout as % of creator-driven revenue | — | ~13% | ~13% (unchanged) |

The conversion model with 25/40/55/70 tiers pays ~$12.9K over 24 months without exclusive models, ~$17.7K with exclusive models — only from new revenue that creators generated. The Exclusive Model Library adds ~$29K in incremental revenue over 24 months while costing only $3.6K (R2 storage, users pay RunPod compute via BYOK), improving overall ROI from 489% to 610%. With industry-competitive rates (up to 70% for Platinum), the program becomes a genuinely attractive pitch for top creators while Aksho retains 30-75% of every conversion permanently. The remaining 60% of organic subscribers are never touched. The higher rates are a strategic investment in creator recruitment — every additional creator attracted by the competitive rates drives conversions that grow the platform.

##### Break-Even Analysis

There is no break-even point because Aksho never pays from existing revenue. Every payout is funded by a conversion that generated new revenue:

```
Conversion generates: $12.20/mo net revenue (avg)
Creator receives:     $4.15/mo (34% blended avg) for as long as subscriber is active
Aksho retains:        $8.05/mo for as long as subscriber is active
Without creator:      $0/mo (user would have stayed free)

Net position from day 1: Positive. Always.
Natural churn at 5%/mo means only ~54% of a cohort remains after 12 months.
Lifetime value per conversion to Aksho: ~$8.05 × 20mo avg lifespan = ~$161
Lifetime payout per conversion to creator: ~$4.15 × 20mo avg lifespan = ~$83

Even at Platinum (70%):
  Creator receives: $5.66/mo
  Aksho retains:    $2.42/mo — still pure profit from a user who would have paid $0

With Exclusive Model Library (Business conversions via Picturize):
  Business tier ($15/mo) conversion via exclusive model recommendation
  Net after SubscribeStar: $15 × 0.80 = $12.00/mo
  Creator receives (Gold 55%): $6.60/mo
  Aksho retains: $5.40/mo
  R2 cost per model (amortized): ~$0.05/mo per active user
  Net to Aksho: ~$5.35/mo — pure incremental profit
  Break-even: 8 Business conversions to cover $150/mo R2 cost
```

---

#### 4.8.4 Implementation Phases

##### Phase 1 — Codeshare Miles Foundation + Conversion Tracking
*Prerequisites: Miles economy operational, Gallery publishing live, Lounge chat active*

- [ ] Implement Codeshare RPM tracking engine (messages received per Host, unique Passenger filtering)
- [ ] Build daily Codeshare payout cron job (00:00 UTC, credits Miles to creator accounts)
- [ ] Enforce 1,000 Miles/day cap per creator
- [ ] Add Creator Engagement Dashboard (basic stats: messages received, unique chatters, miles earned)
- [ ] Add engagement tracking per Host (total messages, unique users, trending score)
- [ ] Enable Miles → Subscription Credit redemption in Duty-Free Shop (5,000 Miles = 1 mo Priority, 15,000 = 1 mo Business)
- [ ] Add anti-gaming protections (minimum 10 messages per unique engagement, self-chat exclusion, bot detection)
- [ ] Implement authenticated-only engagement counting (exclude Economy guest accounts from all creator metrics — see 4.8.5)
- [ ] Build account trust scoring (7-day age requirement, minimum 3 cross-creator activity, IP/device clustering detection)
- [ ] Build conversion attribution pipeline (track which Hosts each free Passenger engages with before converting)
- [ ] Implement conversion event detection (free → paid tier change triggers attribution lookup)
- [ ] Build last-touch attribution logic (identify the last creator Host engaged within 3-day window before conversion)
- [ ] Create `creator_conversions` database table (creator_id, converted_user_id, tier, share_%, monthly_payout_amount, is_active)
- [ ] Build conversion analytics dashboard (admin view: conversions per day, attributed vs organic, payout projections)

##### Phase 2 — Creator Partner Applications + Revenue Share Engine + Exclusive Model MVP (Target: MRR > $5K)
*Prerequisites: Phase 1 complete, conversion data pipeline validated with real data*

**ACPP Core:**
- [ ] Design and implement Creator Partner Application form (eligibility auto-check: tier, Host count, engagement threshold)
- [ ] Build application review dashboard (admin panel for approving/rejecting applications)
- [ ] Implement Creator Partner tier system (Bronze/Silver/Gold/Platinum based on monthly conversions driven)
- [ ] Build Creator Partner Dashboard v2 (detailed analytics: conversions driven, active attributions, estimated earnings, Host-level breakdown)
- [ ] Create Creator Partner Agreement legal document (conversion-based payout terms, content standards, tax obligations, termination policy)
- [ ] Add "Partner" badge/flair to creator profiles and their Hosts in Gallery
- [ ] Implement monthly conversion payout calculation job (sum all active attributions, compute per-creator totals)
- [ ] Build tier upgrade attribution logic (automatically adjust payout when converted subscriber upgrades tier)
- [ ] Implement refund clawback logic (void attribution if converted subscriber refunds within 7 days)
- [ ] Set up W-9 / W-8BEN collection workflow (required before first payout)
- [ ] Enable Subscription Credit payouts as interim (creators can redeem earnings as subscription months while waiting for Phase 3 cash)

**Exclusive Model Library MVP:**
- [ ] Implement exclusive model hosting on R2 (tier-gated access, Business+ only)
- [ ] Test with 5-10 curated exclusive models (internal upload)
- [ ] Build Picturize conversion tracking (detect upgrade triggers from exclusive model recommendations)
- [ ] Add exclusive model assignment UI in Hangar/Manifest (ACPP creators only)
- [ ] Build "Recommended Model" modal for Picturize (Business+ upgrade CTA)

##### Phase 3 — Cash Payouts + Full Exclusive Model Library (Target: MRR > $15K)
*Prerequisites: Phase 2 complete, legal/tax infrastructure ready, PayPal or Stripe Connect integration*

**Cash Payout Infrastructure:**
- [ ] Integrate PayPal Business Payouts or Stripe Connect for creator disbursements
- [ ] Implement $25 minimum payout threshold with rollover for sub-threshold balances
- [ ] Build monthly payout processing pipeline (calculate → review → approve → disburse within 15 business days)
- [ ] Implement automated 1099-NEC generation for US creators earning >$600/year
- [ ] Add payout history and tax document download to Creator Partner Dashboard
- [ ] Add payout method selection (PayPal, Stripe, or continue banking as subscription credit)
- [ ] Build admin payout approval workflow (manual review before disbursement for amounts >$500)
- [ ] Create Creator Program marketing page (public-facing landing page for recruitment)
- [ ] Implement creator referral bonuses (existing partners earn bonus when recruited creators drive their first 3 conversions)
- [ ] Add real-time earnings tracker to Creator Dashboard (active attributions, per-conversion status, estimated current-month earnings)
- [ ] Build subscriber churn notifications (alert creators when attributed subscribers cancel, with re-engagement suggestions)
- [ ] Update Terms of Service and Privacy Policy to reflect creator payout data handling

**Full Exclusive Model Library:**
- [ ] Build model upload interface for approved model creators
- [ ] Implement model metadata database (model_id, creator_id, tags, preview_images, host_usage_count)
- [ ] Launch with 20-30 exclusive models (curated)
- [ ] Build model creator analytics dashboard (Hosts using model, total generations, conversion impact)
- [ ] Add exclusive model conversion tracking to ACPP attribution pipeline
- [ ] Featured "Model Creators" showcase page (portfolio links, community recognition)

---

#### 4.8.5 Safeguards & Anti-Abuse

> **Conversion Fraud Prevention:** A conversion is only attributed if the authenticated user had 10+ substantive messages with the creator's Host within 3 days before upgrading. Economy guest account activity is never counted (see 4.8.6). Repeated identical messages, empty messages, and messages under 5 characters are excluded. This applies to both organic conversions AND Picturize-triggered upgrades.

> **Self-Conversion Exclusion:** Creators cannot earn attribution from their own accounts or alt accounts converting. IP and device fingerprint clustering is used for detection. More than 3 authenticated accounts from the same IP/device triggers automatic exclusion.

> **Refund Clawback:** If a converted subscriber requests a refund within the 7-day pro-rated window, the conversion attribution is voided. No payout is issued for voided conversions.

> **Last-Touch Attribution:** Only the creator whose Host was last engaged (10+ messages) within the 3-day window before conversion gets credited. No splits. If a user chatted with 5 different creators' Hosts but Creator C was the last one, Creator C gets 100% of the attribution. This incentivizes creating Hosts good enough to be the final push. Applies equally to organic and Picturize-triggered conversions.

> **Content Quality Gate:** Hosts that receive reports or violate content policy are excluded from conversion attribution. Repeated violations result in program termination and forfeiture of pending payouts.

> **Exclusive Model Safeguards:** Only ACPP-approved creators can assign exclusive models to Hosts (prevents spam/exploitation). Hosts cannot change assigned model after 100+ chats (prevents bait-and-switch). Models violating content policy (photorealistic/deepfake, NSFL content, illegal redistribution) are removed immediately, creator banned from program. See Section 4.8.2 for technical details.

> **Churn Protection:** If a creator's subscription lapses, their Partner status is suspended (not terminated) for 30 days. Existing conversion attributions continue during suspension (creators still receive payouts for active conversions). Resubscribing within 30 days restores status. After 30 days, they must reapply, but existing conversion attributions are permanently honored as long as the converted subscribers remain active.

> **The Miles Firewall:** The ACPP revenue share operates on a completely separate ledger from the PWA Miles economy. Miles cannot be converted to cash. Cash payouts come exclusively from conversion-attributed revenue. Codeshare Miles (Section 4.7.2.E) reward engagement; ACPP rewards conversions. These two systems never cross.

---

#### 4.8.6 Economy Account Exploitation Prevention

Economy (free) accounts can be created by simply clearing browser cache and visiting the site. This creates a fundamental exploitation vector: a bad actor could spin up hundreds of disposable Economy accounts to inflate engagement metrics on their own Hosts, artificially meeting ACPP eligibility requirements or farming Codeshare Miles.

##### The Attack Vectors

- Engagement Inflation: Create fake Economy accounts, send 10+ messages to own Hosts, inflate lifetime message counts and unique chatter numbers to meet ACPP eligibility
- Codeshare Miles Farming: Fake accounts generate messages that earn the creator 1 Mile per 5 messages via the Codeshare RPM system
- Trending/Popular Manipulation: Fake engagement pushes Hosts onto the Trending page, meeting a quality signal requirement
- Fake Conversions: LOW RISK — converting requires paying $5+ via SubscribeStar, making this expensive to fake at scale

##### The Solution: Authenticated-Only Engagement Counting

All engagement metrics that feed into ACPP eligibility, Codeshare Miles, and quality signals (Trending/Popular) must only count messages from authenticated accounts:

- Authenticated account: A user who has completed SubscribeStar OAuth login (has a verified identity linked to a real payment method)
- Economy guest accounts (cookie-based passenger IDs created without OAuth): Their messages are excluded from ALL creator-facing metrics:
  - Not counted toward ACPP eligibility thresholds (10k messages, 200 unique chatters)
  - Not counted toward Codeshare RPM (no Miles generated)
  - Not counted toward Trending/Popular page engagement scores
  - Not counted toward conversion attribution (guest-to-paid conversions are not attributed since the guest had no verified identity)
- Guest accounts can still chat freely — this only affects creator reward calculations, not the user experience

##### Additional Protections

- Account age requirement: Authenticated accounts must be at least 7 days old before their engagement counts toward any creator metrics
- Minimum cross-creator activity: An authenticated account's messages only count if that account has chatted with at least 3 different creators' Hosts (prevents single-purpose alt accounts)
- IP/device fingerprint clustering: If multiple authenticated accounts originate from the same IP or device fingerprint, flag for manual review. More than 3 accounts from the same source triggers automatic exclusion from creator metrics
- Rate limiting: No more than 100 messages per hour per account. Burst messaging patterns (10+ messages in under 60 seconds) are flagged and excluded
- Message quality filter: Messages under 5 characters, repeated identical messages, and gibberish (entropy analysis) are excluded from engagement counts

##### Why This Works

The key insight is that SubscribeStar OAuth is the trust anchor. Creating a fake authenticated account requires a real SubscribeStar account, which requires a real email and payment method. This makes sockpuppeting expensive and traceable. Combined with IP clustering, device fingerprinting, and minimum cross-creator activity, the cost of gaming the system exceeds any possible reward.

Economy guest accounts remain fully functional for browsing and chatting — we just don't let their activity influence reward calculations. The guest experience is unaffected; only the creator economy is protected.

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
