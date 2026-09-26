# Canonical Data Guidelines

## Purpose

This document is the authoritative reference for the portfolio's **canonical data model**: what the underlying domain entities are, what each of their fields means, which decisions about them have been accepted (and which are still open or intentionally deferred), and the rules for deriving web, SEO, and AI-facing representations from them.

This document does not *contain* the canonical data itself. **Atlas is the source of truth** for the actual canonical values (Person, Education, Languages, Stack, Projects, Contact, etc.). This document is the source of truth about the **model and the rules that govern it**.

```
AI Knowledge Spec
        │
        │ references
        ▼
Canonical Data Guidelines   ← this document
        │
        ├── Canonical Model (semantics, entities, fields)
        │
        ▼
      Atlas                 ← actual canonical data (source of truth)
        │
        ▼
 ┌──────┼──────┐
 ▼      ▼      ▼
Web    SEO     AI
```

The general `ai-knowledge` spec should never hardcode facts about this specific person or project (e.g. it must not say "Amir's professional name is Amir Karimi"). Instead it should say things like "the AI knowledge representation MUST derive person identity from the project's canonical data model," and this document is where that identity is actually defined.

## Scope

This document covers the **static/canonical portion** of the portfolio: the domain entities behind the homepage sections (Banner, InfoSection, StackSection, ProjectsSection, ContactSection) and the domains that are already served from Atlas (e.g. the tech stack).

It does not cover editorial/blog content modeling (articles, series) as an independent subject, except where a shared concept (e.g. the Rich Content Model) is defined here because it originated from the Stack domain and is reused elsewhere.

## Core Principle

> **Canonical data describes the person, projects, and other domain entities — not how those entities happen to be presented by the portfolio UI.**

> **UI sections, copy, layout, CTA labels, animations, and other presentation concerns MUST NOT be treated as canonical data unless they represent an actual domain fact.**

A second, equally important principle governs how this model is built:

> **The canonical model is derived from domain reality, not from the shape of the UI.** We do not extract a `BannerSchema`, an `InfoSchema`, a `ProjectsSchema`, etc. from existing components. We model the underlying domain (`Person`, `Education`, `Project`, ...) first, and UI sections consume that domain model. If the homepage layout changes tomorrow (e.g. the Banner is replaced by a sidebar), the canonical `Person` entity must not need to change.

```
Domain / Reality
       ↓
Canonical Model
       ↓
UI sections
       ↓
AI / SEO representations
```

A third principle, learned repeatedly across sections, is the separation between:

- **fact** — a stable, authoritative statement about the domain ("Amir is native in Persian")
- **assessment** — a qualitative judgment derived from facts ("English: Strong")
- **evidence** — a supporting reference for an assessment ("maintains an English-language technical blog")
- **presentation** — copy, layout, CTA wording, ordering, styling ("Hi, I'm...", "Checkout my Blog", "Get in Touch")

Only the first three belong in the canonical model, in their own right — never collapsed into a single free-form paragraph or UI string.

Related implementation-detail rules, arrived at independently but consistent across every section:

- **Database identifiers are not canonical identity.** Fields like Mongo `_id`, `createdAt`, and internal `uniqueId` strings (`cat_...`, `sbc_...`, `ste_...`) are Atlas/storage concerns, not canonical domain data. Relationships between canonical entities are expressed structurally/semantically (e.g. nesting: `Category → Subcategory → Stack Entry`), not via database IDs. This may be revisited later if canonical entities need independent, cross-document identity — that would be a deliberate, separate decision.
- **Local/UI asset paths are not canonical.** Where a CDN is used for media (profile photo, project images, etc.), the canonical value is the CDN URL — never a local path like `/me.svg` or a component-specific asset reference.
- **Interactive/alternate UI behavior is presentation, not multiple canonical facts.** E.g. an image that swaps between two visual states on click is one canonical `profileImage` plus presentation behavior — not two canonical images — unless the two images are later found to be semantically distinct entities (e.g. a photo vs. a personal logo/mark).
- **Storage/editor representations are not canonical representations.** Rich text authored in Tiptap is stored as Tiptap JSON in Atlas; this is a *source* representation. The canonical representation is an independent, semantic **Rich Content Model** (defined below), with Tiptap JSON as one derivable source of it, not the canonical model itself.
- **A field describing internal skill/experience level is not automatically a professional title or claim.** E.g. `Category.level: Senior` inside the Stack domain is a proficiency assessment about one skill category, not evidence for a claim like "Senior Frontend Engineer" being the professional title — those two concepts must stay decoupled in the model, even though the title claim can later be supported by the underlying skill data.

## Canonical Model

### Person

#### Identity

A single `Person` entity represents one real individual across all audiences. The model must be able to describe a Person with multiple names/representations depending on audience/context, **without creating a separate Person entity per audience.**

- **`professionalName`** (public/working name): `Amir Karimi` — the international public/professional name, used as the primary interface for English/international audiences.
- **`fullName`** (full/identification name): `Amirhosein Karimkhani` — canonical spelling is **`Amirhosein`**, one word, not `Amir Hossein` or `Amirhossein` (this has been the consistent self-identification across legal/registration contexts, and separating "Amir" from "Hosein" misleadingly implies a Western-style middle name).
- Field naming: `fullName` was deliberately chosen over `realName`, `originalName`, `passportName`, or `identificationName` — the latter options either overclaim (`realName`), are too document-specific (`passportName`), or are unnaturally technical (`identificationName`).
- The relationship between the two names must be explicit and machine-readable (i.e. an AI/recruiter querying "Who is Amir Karimi?" should be able to resolve "Amir Karimi is Amirhosein Karimkhani"). This is intentional: the professional name is expected to somewhat reduce the discoverability of the full name via search, and that trade-off is accepted/desired, since people searching the full name are more likely to want the professional identity anyway.
- **Persian public identity: intentionally undecided.** The portfolio is currently English-only, and whether a Persian-facing name/representation will ever be exposed is an open, deliberate non-decision. The model must be *capable* of adding a Persian identity later without requiring one now — i.e. **model scalability for future audiences is required, but no Persian data should be forced into the schema today.**
- Audience/context grouping for identity is accepted as a modeling concept (e.g. "international identity" vs. "Persian identity" containers), without freezing an exact nested schema for it yet.
- Canonical identity completeness (having both names on file) is independent from UI visibility (what the Banner chooses to display). The Banner's exact display decision is explicitly **out of scope** for this document — a separate, dedicated UI collection is used for Banner-exclusive copy, even though the underlying facts still originate from Atlas.

#### Profile / Professional Positioning

Canonical facts about professional positioning are modeled as discrete facts, not as a single bio paragraph:

- **Professional scope**: `Full-Stack Engineering` (accepted)
- **Primary specialization**: `Frontend` (accepted, clearly the dominant and longest-running axis of experience)
- **Derived professional title** (a *representation*, not itself the canonical fact): `Full-Stack Engineer, Frontend-focused`. This wording won over `Frontend Developer`, `Frontend Engineer` (alone), and `Full-Stack Engineer (Frontend-first)` — the latter was rejected because "frontend-first" reads ambiguously as a product-priority statement rather than a specialization statement.
  - **`Senior` is deliberately left out of the canonical title** for now. Seniority can be *derived/corroborated* from the underlying skill-level data (see Stack, where several categories — Frontend Engineering, Architecture, Engineering Process & Documentation — are independently marked `Senior`), but the decision to add "Senior" to the public professional title is a positioning decision, not an automatic consequence of internal skill levels, and remains **open**.
  - Rationale for scope over `Frontend Developer`/`Frontend Engineer` alone: the underlying skill taxonomy shows meaningful, non-trivial experience across Backend Engineering, Architecture, Database & Data, Security, Testing & Quality, DevOps & Infrastructure, and Engineering Process & Documentation, not merely "a frontend specialist with some backend knowledge."
- **Focus areas / positioning themes** such as high-performance, scalable applications, clean architecture, maintainability, and engineering process are treated as **canonical facts derivable from the underlying skill/project data** (they are backed by evidence, notably the Architecture and Engineering Process & Documentation categories), but the *Banner prose itself* ("Frontend Developer focused on building high-performance, scalable web applications...") remains a **derived presentation representation**, not the canonical fact.
- A sentence like "where I can contribute to impactful products, adapt quickly to team needs, and continue growing as an engineer" is **positioning/marketing copy**, not a canonical fact, and stays out of the Person schema.

#### Availability

Professional availability is a canonical fact, modeled semantically rather than as a marketing sentence:

```
availability
  employmentType: full-time
  workMode: remote
  status: open
```

("I'm open to full-time remote opportunities..." → the semantic fact is what's canonical; the marketing sentence is presentation.)

#### Media

- The canonical profile image is a **CDN-backed asset URL**, not a local path.
- Any interactive/alternate visual state (e.g. an image that swaps on click) is presentation behavior on top of one canonical image, unless a future need arises to model two semantically distinct assets (e.g. `profilePhoto` vs. a `personalMark`/logo).

#### External Profiles

- Social/professional profiles (GitHub, LinkedIn, Twitter/X, etc.) are modeled as a `profiles` collection under `Person`, independent of Banner copy/CTA wording.
- Because there is a plan to eventually maintain **audience-specific profiles** (e.g. a new international-facing LinkedIn distinct from the existing Persian-network-facing one, a new English-language Twitter/X), the model must be able to associate a given profile with a specific audience/context, without this being fully specified yet.
- A `More on GitHub`/`Checkout my Blog`/`Get in Touch`-style CTA label is presentation copy; the underlying profile/site URL is the canonical fact.

### Education

```
Education
  degree
    level     # controlled vocabulary, e.g. Bachelor's, Master's
    field     # canonical text, e.g. "Software Engineering"

  institution
    name      # canonical institution name
    website   # official institution URL

  date
    start     # year precision
    end       # year precision
```

Decisions:

- `degree.level` uses a controlled vocabulary; `degree.field` is canonical free text.
- Institution is represented as `name + website` only. **`location` is deliberately excluded** — an institution's administrative/geographic location is not necessarily meaningful to the person's relationship with it (e.g. Kharazmi University is officially "Kharazmi University, Tehran" in government records, even though the campus attended was in Karaj), and including it risks being both misleading and low-value to an employer. Institution identity is carried by its canonical name and official website instead.
- `date.start`/`date.end` are year-precision and represent **the period of study/enrollment for that degree** — not the date the degree/document was issued, and not necessarily a formal graduation date. If a real graduation date is ever needed, it should be modeled as a separate, independent concept later rather than overloading `date.end`.
- No `status` field (e.g. `completed`/`ongoing`) — the presence of `end` in the past is sufficient for now; this can be revisited if a genuinely ongoing/paused education record is added later.
- No `graduationDate` field.
- `"Expected graduation"` is **deprecated** and must be removed from current UI copy — both existing degrees are completed.
- University/institution **logos are not canonical** — same rule as profile image: any logo is a CDN media asset associated presentationally with the institution, not a canonical Education field.

**Status: Closed** for the current version.

### Language

```
Language
  name        # e.g. "English" (not an abbreviation like "lang")
  native?     # boolean, present only where meaningfully true (e.g. Persian)

  reading
    level     # controlled vocabulary (see below)
    evidence[]  # free-text list of heterogeneous supporting evidence
    note?     # optional, only when it adds real context

  writing
    level
    evidence[]
    note?

  listening
    level
    evidence[]
    note?

  speaking
    level
    evidence[]
    note?
```

Decisions:

- No overall/aggregate `proficiency` field at the Language level — the four skill dimensions (reading/writing/listening/speaking) are the canonical facts; an aggregate would be redundant or potentially misleading (e.g. strong reading/writing but weaker speaking). An aggregate can be *derived* later if ever needed.
- **`level` uses a deliberately functional (not academic) vocabulary**, because CEFR-style labels like "Intermediate" do not map intuitively for an external audience trying to judge "how would this person come across in a team / in society" — a goal considered more important than academic precision:

  | Level            | Meaning                                                         |
  |------------------|-----------------------------------------------------------------|
  | `Limited`        | Can communicate only in specific, narrow situations/topics      |
  | `Conversational` | Can hold everyday, real conversations                           |
  | `Professional`   | Can use the language effectively in a professional/work context |
  | `Strong`         | High command, with only minor limitations in complex situations |
  | `Fluent`         | Natural, fluent use across a wide range of situations           |

- `evidence` is a **free-text list of strings** (`["...", "..."]`), deliberately unstructured — evidence is inherently heterogeneous (a test score, an article, a professor's or colleague's endorsement, lived experience, authored content, etc.), and forcing a rigid schema onto it would conflate evidence with its own metadata. This can evolve into `{ type, description, reference }` objects later if genuinely needed, without being over-engineered now.
- `note` is **optional**, and should only be present when it adds real interpretive context (e.g. "limited recent speaking practice"). It must never become a place for repeating evidence or writing marketing copy — if `level` + `evidence` already convey enough meaning, omit `note`.
- `native` lives at the Language level (not derived from the four skills, since native status is a distinct fact that can't cleanly be inferred from reading/writing/listening/speaking levels alone). Persian is the only language with `native: true`; the field is simply omitted (not explicitly set to `false`) for English and French unless a future need arises to distinguish `false` from `unknown`.
- Anecdotal/self-assessment phrasing from the current UI (e.g. "95% of the YouTube content I consume is in English", "I feel slightly nervous due to limited recent practice") is **not canonical** — it is presentation/anecdotal signal, not a stable fact.
- The English-language technical blog is treated as **external/derived evidence** for English proficiency and does not require a synthetic evidence-reference inside the Language entity — authored English content is itself the evidence, discoverable independently.
- Historical assessment scores (e.g. a past Duolingo score of 92) may be kept as **historical evidence**, explicitly marked as historical/point-in-time, never as a current level (e.g. `evidence: ["Duolingo score: 92 (historical)"]`). A screenshot of such a score is not canonical; a stable, citable public URL could be, but a URL must not be fabricated just to complete the schema — if no such stable reference exists, omit it.

**Status: Closed** for the current version.

### Stack (Skills)

```
Stack
└── Category
      name          # e.g. "Frontend Engineering"
      level          # descriptive attribute only — NOT a generic proficiency framework
                      # e.g. "Senior", "Mid-level", "Serious Familiarity"
      description
      └── Subcategory
            name
            └── Stack Entry
                  name
                  shortDescription
                  content        # Rich Content Model (see below)
```

Decisions:

- `Category`, `Subcategory`, and `Stack Entry` are canonical entities; each carries only the fields listed above (`name`/`level`/`description` for Category, `name` for Subcategory, `name`/`shortDescription`/`content` for Stack Entry).
- Database-only fields — `_id`, `createdAt`, DB `uniqueId` (`cat_...`, `sbc_...`, `ste_...`) — are **not** canonical fields.
- The `Category → Subcategory → Stack Entry` relationship is represented **structurally, via nesting**, not via database ID references. This makes the canonical representation closer to a **knowledge representation** (an aggregate "Professional Skill Profile") than a normalized database export — which matters because this data is built for AI/SEO consumption, not for mirroring Atlas' internal collections.
- `Category.level` is explicitly just a **descriptive attribute**, not a formal, generic proficiency framework to be reused elsewhere.
- `content` (Stack Entry body) is canonical data — the full structured text of a Stack Entry is part of the canonical model. However, the *storage/editor representation* of that content (Tiptap JSON, as currently persisted in Atlas) is **not** the canonical representation — see Rich Content Model below.

**Status: Closed** for the current version. (Relationship structure and the Rich Content Model are the two decisions from this closure most important to preserve.)

### Rich Content Model

Rich text (Stack Entry content today; Project descriptions and article bodies in the future) is stored in Atlas as Tiptap editor JSON. **Tiptap JSON is a source/storage representation, not the canonical representation.** The canonical model is an independent, semantic **Canonical Rich Content Model**, derived from (but not equivalent to) Tiptap, built to reflect only the content capabilities the system actually uses (not everything Tiptap could theoretically support — e.g. Hard Break/line break is intentionally excluded because the current system doesn't use it; it can be added later, versioned, if that changes).

```
RichContent
│
├── Heading
│   ├── level: 2 | 3 | 4
│   └── content[]                 # inline segments, same as Paragraph
│
├── Paragraph
│   └── content[]                 # inline segments
│       ├── type: text
│       ├── value: string
│       └── marks[]?              # zero or more of:
│             bold | italic | strike | underline | highlight | code
│             link { url }        # link can combine with other marks
│
├── Blockquote
│   ├── text
│   └── attribution?              # (previously "from" — renamed for clarity)
│
├── CodeBlock
│   ├── code
│   └── format?                   # not "language" — may be a language, or "html"/"text"/etc.
│
├── List
│   ├── type: ordered | bullet
│   └── items[]                   # each item may itself contain nested content/List
│                                  # (ListItem is not an independent canonical entity)
│
├── Image
│   ├── url                       # canonical CDN asset URL
│   ├── alt
│   └── caption
│
└── Reference                     # a block-level semantic reference (distinct from an inline Link mark)
    ├── kind: article | series
    └── url                       # slug-based URL is acceptable for now;
                                   # a stable internal reference identity may be added later
```

Key decisions:

- Inline formatting (`marks`) is modeled as **segments with attached marks** (`{ type: text, value, marks: [...] }`), not as character-offset ranges (`from`/`to`) — this is self-contained, AI/consumption-friendly, and naturally supports arbitrary mark combinations (e.g. bold+italic+link) without new fields per combination.
- An inline `Link` mark (within a Paragraph) and a block-level `Reference` node (linking to an article/series) are **two distinct concepts** and must not be merged.
- `Document`/root is treated as a container, not a semantically meaningful content node in its own right.
- **This is the same rule as everywhere else in this document**: Tiptap JSON = source/storage representation; Canonical Rich Content = an independent, semantic representation; a renderer/transformer sits between them.

### Project

> **This model is explicitly transitional.** The current representation is intentionally minimal and is expected to be substantially redesigned in the next sub-version (see "Known Deviations / Deferred Work" below). It must not be treated as the final Project domain model.

Current (minimal) shape:

```
Project
  name           # canonical
  version        # canonical current version (no release/history system yet)
  description    # minimal plain text — NOT Rich Content yet
  repository     # external reference — currently GitHub URL only
  authorship     # simple statement, e.g. "developed end-to-end, independently"
```

Decisions:

- **Definition**: for the current version, `Project` = **a software application**, full stop. Other kinds of work (research, open-source contribution, architectural work, etc.) are not modeled as `Project` yet, and don't exist yet as data either; a broader parent concept, under which `Project` and these other activities will sit, is planned but not built.
- `name` is canonical.
- `description` is **deliberately kept minimal** for the current version, rather than canonicalizing the full existing marketing-style "Overview" bullet content — because the Project domain (descriptions, specs, engineering-characteristic modeling, README-based documentation) is planned for a substantial rebuild in the next sub-version, and over-investing in the current shape would be wasted/misleading effort.
- Tab/Card/Badge/version-display-string/"More..."/"Overview"-as-a-UI-title/"More on GitHub" button/layout/left-right image placement are all presentation, not canonical.
- **Stack technology references from a Project should point to the existing canonical Stack entities**, not redefine technologies independently — but the exact reference mechanism is intentionally left undecided for now.
- **Version** (`v1.0.0`-style) is accepted as a canonical current-version fact; no release-history system is being built for it at this time.
- **GitHub repository URL** is the only external reference modeled right now, and is canonical (as opposed to the "More on GitHub" button label, which is presentation).
- **Media** (icon, screenshots, cover image, etc.) is **not modeled** in the current Project schema, even though such assets, when present, come from the CDN like all other canonical media.
- **Status** (e.g. planned/in-progress/archived) is **not modeled** in the current Project schema; deferred to the next sub-version.
- **Authorship**: a simple statement that the work was done end-to-end/independently is canonical, but no structured `role` model is being built for it now.
- **Portfolio itself is a Project.** It is a real software project (architecture, frontend, backend/data layer, ADRs, its own canonical-data architecture, CDN/media infrastructure) and excluding it from the Project domain would be difficult to justify. Unlike Cryptology, the Portfolio project is the **current, richer demonstration of engineering capability**, and its canonical Project data should eventually be able to reference its real specification/engineering characteristics rather than repeating Banner marketing copy.
- **Project evolution/relationships** (e.g. "Cryptology is an older, simpler project; TraderAmis is its more advanced successor") are treated as canonically meaningful facts — an AI reasoning about the portfolio should understand this evolutionary chain rather than assume Cryptology represents current engineering ability. For the current version, this relationship is **not** modeled as a structured field (e.g. `predecessor`/`successor`); it is captured only as a **contextual note** on the relevant project(s). A structured relationship model is deferred to the next sub-version.
- Cryptology specifically: it is a real project, but simple/practice-oriented and not representative of current capability; TraderAmis (planned) is expected to be its substantially more advanced successor, with stronger frontend/backend architecture and much stronger documentation. AI-facing canonical data should be able to convey this "older/simpler → newer/stronger" relationship, not just a flat list of equally-weighted projects.

**Status: Closed for the current version**, explicitly marked transitional — see the Decision Log / Known Deviations entry below.

### Contact

`Contact` is modeled as its own domain concept associated with `Person` (not folded directly into Person's own fields, and not duplicating social-profile data — see below), holding the person's ways of being reached.

```
Person
  contact
    methods[]
      type      # email | booking | telegram | whatsapp
      value     # the canonical value for that method (email address, URL, etc.)
```

Decisions:

- `value` is the canonical value appropriate to `type` (an email address, a booking URL, a Telegram URL, a WhatsApp contact URL, etc.). Changing the underlying URL/number/handle is a **data change**, not a change to the Contact model.
- **`booking`**, not `googleMeet`/`googleCalendar` — the offering is "book a call," and the underlying tool (currently Google Calendar) is an implementation detail that shouldn't leak into the semantic `type`. If the booking tool changes later, the Contact model doesn't break.
- A phone number is **not modeled independently** as a Person/Contact field merely because it's used for WhatsApp — the canonical fact currently exposed is "contact via WhatsApp," not "this is my phone number." If a WhatsApp *username*-based contact method replaces the phone-number-based one later, only `value` changes, not the model.
- **No `label` field** — CTA wording ("Book a call via Google Meet 👋", "Email me: ...", "Message me on Telegram") is presentation copy, not canonical data.
- **No `priority`/preferred-method field** for now — the current UI ordering (booking, email, Telegram, WhatsApp) is a UI decision, not a confirmed semantic preference. If a genuine "preferred contact method" fact is ever stated, that would become a canonical fact; button ordering alone is not.
- **No `provider` field** — the canonical fact is "this is a way to book a call with me," not "Google Calendar is my provider." Provider can be added later if it becomes materially useful.
- **`availability` (professional availability) is not part of Contact** — it remains under Person/Banner as a separate domain concept (full-time + remote + open); contact method and career availability are different domains and must not be merged.
- **Social profiles (GitHub, LinkedIn, etc.) are not duplicated inside Contact** — if a profile (e.g. LinkedIn) is both a social/professional profile and a contact mechanism, it is modeled once (under Person's `profiles`) and consumed by both the profile section and the contact section, to avoid duplicate truth.

**Status: Closed.**

## Section Mapping

This section records, per homepage UI section, which underlying canonical data it draws on and what parts of its current content are presentation-only.

### Banner

- **Canonical data used**: Person identity (`professionalName`, `fullName`, their relationship), professional positioning facts (engineering scope, primary specialization, focus areas), availability, profile image (CDN), external profiles (GitHub/LinkedIn/etc.).
- **Presentation-only**: "Hi, I'm...", "Checkout my Blog", "Get in Touch", "tap on photo 👆🏻", the exact wording/derivation of the displayed professional title, which name(s) are shown and how.
- **Decision**: the Banner UI draws its exact displayed copy from a separate, Banner-specific collection layered on top of canonical data; how exactly that copy is composed from canonical facts is intentionally out of scope for this document.

### InfoSection (Education & Language)

- **Canonical data used**: `Education` records, `Language` records, as defined above.
- **Presentation-only**: "Expected graduation" (deprecated wording), university logos, the Duolingo screenshot/badge, any framing/marketing sentences around language ability.

### StackSection

- **Canonical data used**: `Category` / `Subcategory` / `Stack Entry`, including `content` in the Rich Content Model.
- **Presentation-only**: tab/switcher UI, ordering, icons-as-UI-decoration (the `icon` emoji field itself may be presentational — not decided as canonical in this pass).

### ProjectsSection

- **Canonical data used**: `Project` (name, version, minimal description, repository, authorship), with the explicit caveat that the current Project model is transitional.
- **Presentation-only**: Tab/Card/Badge components, "More...", "Overview" as a UI heading, the "More on GitHub" button label, layout/image placement.

### ContactSection

- **Canonical data used**: `Contact.methods[]` (type + value), and, where relevant, `profiles` shared with Person (e.g. LinkedIn).
- **Presentation-only**: CTA labels, button ordering, icons, styling.

## Identity & Naming

- One `Person`, multiple names/representations by audience — never multiple `Person` entities.
- `professionalName`: `Amir Karimi`. `fullName`: `Amirhosein Karimkhani` (canonical spelling, one word "Amirhosein").
- The relationship between the two names is explicit/machine-readable, not left to inference.
- Persian identity: capability to add it exists in the model; no Persian identity data exists yet, and whether to add it is an open decision.
- DB-level identifiers (`uniqueId`, `_id`) are never canonical identity fields for any entity in this model.

## Audience & Locale

- The portfolio is currently **English-only**.
- International/English audience: both `Amir Karimi` and `Amirhosein Karimkhani` are in scope.
- Persian audience: intentionally not modeled with data yet; the schema must remain able to support it later (e.g. a Persian identity, and potentially Persian-specific external profiles) without requiring it now.
- Future audience-specific external profiles (e.g. a second, international-only LinkedIn or a new English-language Twitter/X, distinct from existing Persian-network-facing profiles) are anticipated; the `profiles` model should be able to carry an audience/context association per profile, though the exact structure is not finalized.

## External Profiles

- Modeled under `Person.profiles` (GitHub, LinkedIn, Twitter/X, etc.).
- A profile's CTA label/button text is presentation; the profile URL is canonical.
- Project-level external references (currently: GitHub repository URL only) follow the same rule — the URL is canonical, the button/link label is presentation.

## Canonical URLs & Media

- Any canonical image/logo/asset is referenced by its **CDN URL**, never by a local UI asset path (e.g. `/me.svg`, a bundled institution logo file).
- This applies uniformly to: Person profile image, Education institution logos (not modeled at all — logos aren't canonical, only the institution name/website are), and Project media (also not modeled yet, but would follow the same CDN-URL rule if/when added).
- Canonical URLs (institution websites, repository URLs, blog/site URLs) are treated as authoritative external references, distinct from whatever CTA copy links to them.

## Data Ownership & Authority

- **Atlas is the source of truth** for all canonical data described in this document.
- This document is the source of truth for the **model and its semantics** — not the data itself.
- Database-specific concerns (internal IDs, timestamps, storage-format representations such as Tiptap JSON) belong to Atlas/implementation and are explicitly excluded from the canonical model, even though they may be the literal storage format behind a canonical field (e.g. Rich Content is stored as Tiptap JSON but canonically modeled independently of it).
- The general `ai-knowledge` spec should reference this document for how to resolve domain semantics, rather than hardcoding person-specific or project-specific facts itself.

## Derived Representations

Canonical data is expected to be the single source from which multiple downstream representations are generated, including (non-exhaustively): the website UI itself, `JSON-LD`/Schema.org structured data, `sitemap.xml`, RSS/Atom (if applicable), `llms.txt`/AI-specific feeds, and any future API. Schema.org (or any other external vocabulary) should be treated as **one projection/consumer of the canonical model**, not as the canonical model itself — this project's canonical needs are expected to be richer and more domain-specific than what a generic external schema captures.

## Known Deviations / Deferred Work

- **Project domain is intentionally transitional.** The current minimal `Project` shape (name, version, minimal description, repository, authorship) is a placeholder. A full rebuild is planned for the next sub-version, expected to include: canonical project specifications, richer documentation (potentially README-based, replacing the current "Overview" UI section), structured engineering characteristics, explicit project evolution/relationship modeling (e.g. Cryptology → TraderAmis), and possibly status and media metadata.
- **Cryptology → TraderAmis relationship** is currently captured only as a contextual note on Cryptology, not as a structured `predecessor`/`successor` relationship. Structured project-relationship modeling is deferred to the Project domain rebuild above.
- **Rich Content in Project descriptions** does not exist yet; Project descriptions are currently plain minimal text. When the Project domain is rebuilt, project descriptions are expected to adopt the same Canonical Rich Content Model already defined for Stack Entries.
- **Hard Break / line break** is not part of the Rich Content Model because the current content system does not produce it. If it's introduced later, it should be added as an explicit, versioned model change.
- Several small identity fields remain open by design rather than by oversight: whether "Senior" is added to the public professional title, and whether/how a Persian identity is eventually added — both are deliberate, revisitable decisions, not gaps.

## Decision Log

| #  | Topic                                                | Decision                                                                      | Status                                                                                          |
|----|------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| 1  | Person plurality                                     | One Person, multiple audience-specific names/representations                  | Accepted                                                                                        |
| 2  | Professional name                                    | `Amir Karimi`                                                                 | Accepted                                                                                        |
| 3  | Full name                                            | `Amirhosein Karimkhani` (one word "Amirhosein")                               | Accepted                                                                                        |
| 4  | Name relationship                                    | Must be explicit/machine-readable                                             | Accepted                                                                                        |
| 5  | Persian identity                                     | Not modeled with data yet; schema must support it later                       | Open (deliberately)                                                                             |
| 6  | Profile image                                        | Canonical value is CDN URL; local paths are not canonical                     | Accepted                                                                                        |
| 7  | Image interactive swap                               | Presentation behavior on one canonical image                                  | Accepted                                                                                        |
| 8  | Professional scope                                   | Full-Stack Engineering                                                        | Accepted                                                                                        |
| 9  | Primary specialization                               | Frontend                                                                      | Accepted                                                                                        |
| 10 | Derived title wording                                | "Full-Stack Engineer, Frontend-focused"                                       | Accepted (as a derived representation; underlying scope/specialization are the canonical facts) |
| 11 | "Senior" in title                                    | Not included in canonical title; may be revisited                             | Open                                                                                            |
| 12 | Availability                                         | full-time + remote + open, modeled semantically                               | Accepted                                                                                        |
| 13 | Positioning sentences (e.g. "impactful products...") | Presentation copy, not canonical                                              | Accepted                                                                                        |
| 14 | External profiles                                    | Modeled under `Person.profiles`, independent of CTA copy                      | Accepted                                                                                        |
| 15 | Education model                                      | `degree{level,field} + institution{name,website} + date{start,end}`           | Accepted                                                                                        |
| 16 | Institution location                                 | Excluded from canonical Education                                             | Accepted                                                                                        |
| 17 | Education `date` meaning                             | Period of study/enrollment (year precision), not graduation date              | Accepted                                                                                        |
| 18 | Education `status`/`graduationDate`                  | Not modeled                                                                   | Accepted                                                                                        |
| 19 | Language model                                       | `name, native?, {reading,writing,listening,speaking}{level,evidence[],note?}` | Accepted                                                                                        |
| 20 | Language level vocabulary                            | Limited / Conversational / Professional / Strong / Fluent                     | Accepted                                                                                        |
| 21 | Language `evidence`                                  | Free-text list, deliberately unstructured                                     | Accepted                                                                                        |
| 22 | Historical scores (e.g. Duolingo)                    | Kept as historical evidence, never as current level                           | Accepted                                                                                        |
| 23 | Stack relationships                                  | Structural/nested, not DB IDs                                                 | Accepted                                                                                        |
| 24 | Stack `Category.level`                               | Descriptive attribute only, not a generic proficiency system                  | Accepted                                                                                        |
| 25 | Rich Content Model                                   | Independent canonical model; Tiptap JSON is a source representation only      | Accepted                                                                                        |
| 26 | Rich Content inline marks                            | Segment-based (`{text, value, marks[]}`), not offset-based                    | Accepted                                                                                        |
| 27 | Rich Content Hard Break                              | Not modeled (not used by current system)                                      | Deferred                                                                                        |
| 28 | Project definition                                   | Software application only, for now                                            | Accepted (transitional)                                                                         |
| 29 | Project description                                  | Deliberately minimal, not Rich Content yet                                    | Accepted (transitional)                                                                         |
| 30 | Project domain overall                               | Explicitly transitional; full rebuild planned next sub-version                | Accepted (transitional)                                                                         |
| 31 | Project relationships (e.g. Cryptology → TraderAmis) | Contextual note only, not structured, for now                                 | Deferred                                                                                        |
| 32 | Project media/status                                 | Not modeled yet                                                               | Deferred                                                                                        |
| 33 | Contact model                                        | `methods[]{type, value}` — email, booking, telegram, whatsapp                 | Accepted                                                                                        |
| 34 | Contact `label`/`priority`/`provider`                | Not modeled                                                                   | Accepted                                                                                        |
| 35 | Phone number as independent Contact fact             | Not modeled (WhatsApp is modeled as its own method)                           | Accepted                                                                                        |
| 36 | Availability vs. Contact                             | Kept as separate domains                                                      | Accepted                                                                                        |
| 37 | Social profiles vs. Contact                          | Not duplicated; shared from `Person.profiles`                                 | Accepted                                                                                        |
