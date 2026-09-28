# Portfolio Main Body

**Version:** 1.0  
**Last Updated:** 2026-09-28  
**Owner:** Amir Karimi  

---

## 1. Purpose

Portfolio Main Body is the landing surface of the Portfolio: the first experience a visitor has of the person behind it — their professional identity, positioning, availability, background, work, and how to reach them.

Portfolio Main Body communicates who the owner is, what they do professionally, whether they are currently available for work or counseling, their educational and language background, the software projects they have built, and how a visitor can get in touch.

The main body of the Portfolio previously existed as a hardcoded set of components. This specification defines it as an independent, read-only feature backed by persisted data, consistent with the rest of the Portfolio's feature architecture.

---

## 2. Scope

### Included

* Five independent sections: Banner, StackSection, InfoSection, ProjectsSection, ContactSection.
* Reading of Person, Contact, Education, Language, and Project data from persistence.
* The data shape each of these domains requires in order to satisfy Portfolio Main Body's needs.
* Reading of Person's introductory content (Short Introduction, Professional Narrative) and Work Availability explanation.
* Consumption of Stack Mapping data by StackSection, without redefining it.
* Navigation from Banner to the existing Blog feature.

### Excluded

* Any write/mutation of Person, Contact, Education, Language, or Project data through Portfolio Main Body. All data is read-only in this version.
* Administrative editing UI for any domain Portfolio Main Body consumes. Where such data changes, it changes outside Portfolio Main Body in this version (e.g. via direct data management).
* Definition or redesign of Stack Mapping's own domain — StackSection only consumes it.
* Definition of Blog content, routing, or article behavior — Banner only links to it.
* Project status, release history, project media (icon/screenshot/cover), rich Project content, structured project relationships (predecessor/successor), and a finalized Project ↔ Stack mapping mechanism. The Project domain is explicitly transitional and will be redesigned in a later sub-version.
* Visibility configuration, ordering configuration, or administrative control over which Contact methods or External Profiles are exposed.
* UI, layout, visual design, and component decisions. This specification defines what each section must be able to satisfy; how it is presented is a Product Design responsibility.

Future versions may introduce write capability, administrative editing, Project domain redesign, and configurable presentation based on demonstrated need.

---

## 3. Related Documents

| Document                   | Project Path                                              | Purpose                                      |
|----------------------------|-----------------------------------------------------------|----------------------------------------------|
| Portfolio V2 Specification | `docs/portfolio-v2-spec.md`                               | Project-level scope and architectural intent |
| Interactive Stack Mapping  | `docs/feature/interactive-stack-mapping/specification.md` | Stack domain consumed by StackSection        |
| Public Content Platform    | `docs/feature/public-content-platform/specification.md`   | Blog destination linked from Banner          |

---

## 4. Domain Model

### 4.1 Person

**Identity**

* **Professional Name** — the name the person is publicly and professionally known by (e.g. "Amir Karimi").
* **Full Name** — the person's full/legal name, with an explicit, machine-readable relationship to the Professional Name (e.g. "Amir Karimi" is "Amirhosein Karimkhani").
* Exactly one Person entity exists; a Person is not duplicated per audience.

**Professional Positioning**

* `profession` — the person's primary professional scope (e.g. "Full-Stack Engineering").
* `focus` (optional) — an area of concentration within that scope (e.g. "Frontend").
* Positioning shall not include seniority, expertise-level, or specialization claims (e.g. "Senior", "Expert", "Architect"); such claims belong to the Stack domain.

**Introductory Content**

* **Short Introduction** — a brief, high-level introduction of the person, consistent with Professional Positioning.
* **Professional Narrative** — a longer description of the person's professional approach and the kind of problems they like to solve. It shall not restate Stack Mapping's technology inventory or Projects' portfolio of work.

**Work Availability**

* `status` — whether the person is open to work, scoped to work availability specifically.
* `employmentType` — e.g. full-time, part-time.
* `workMode` — e.g. remote, hybrid, on-site.
* `engagementType` (optional) — e.g. employment, contract/freelance, project-based.
* `explanation` (optional) — free-form text elaborating on Work Availability (e.g. "I'm open to full-time remote opportunities..."). It does not itself assert the underlying availability facts; those are carried by the fields above.

**Counseling Availability**

* `status` — whether the person is open to counseling, independent of Work Availability. Neither availability may be derived from the other.

**Professional Image**

* A single reference URL (hosted on a CDN) to the person's professional profile image. This is the only image considered part of Person data; decorative or artwork imagery is a presentation concern.

**External Profiles**

* A collection of external professional/social profiles (e.g. GitHub, LinkedIn). Each section that displays a profile link consumes from this single collection; profiles are not duplicated per consuming section.

### 4.2 Contact

* `methods[]` — a list of contact methods, each with:
  * `type` — one of `email`, `booking`, `telegram`, `whatsapp`.
  * `value` — the method's current value (an address, a booking link, a handle).
* Contact is an independent domain and is not merged into Person.
* A phone number is not modeled as an independent fact solely because WhatsApp is used; the fact is "reachable via WhatsApp", not "has phone number X".
* `booking` names the capability ("can book a session"), not a specific tool (e.g. not `googleMeet`).
* No `label`, `priority`, or `provider` fields exist; these are presentation concerns.
* Changing a method's value is a data change, not a model change.

### 4.3 Education

* `degree.level` — from a controlled vocabulary (e.g. Bachelor's, Master's).
* `degree.field` — free text (e.g. "Software Engineering").
* `institution.name`, `institution.website`.
* `institution.logo` — a CDN URL referencing the institution's logo. The logo is served from the CDN, not from application-local assets.
* `date.start`, `date.end` — year precision, representing the study/enrollment period, not graduation.
* No `status`, `graduationDate`, or "expected graduation" fields exist; a past `end` date is sufficient to indicate completion.
* Institution location is not part of this domain.

### 4.4 Language

* `name` — the language's full name.
* `native` — nullable; when the language is native, an object of `{ nationality, language }` asserting the language's relationship to the person's native identity (not a boolean). `null` for non-native languages.
* Four independent capabilities — `reading`, `writing`, `listening`, `speaking` — each with:
  * `level` — one of a functional vocabulary: Limited, Conversational, Professional, Strong, Fluent.
  * `evidence[]` — free-form text list of supporting evidence.
  * `note` (optional).
* No single aggregate proficiency exists per language; the four capabilities are independent and may differ.

### 4.5 Project

This domain is explicitly transitional and will be redesigned in a later sub-version. Only the following minimal shape exists for this version:

* `name`, `version` (e.g. "v1.0.0").
* `description` — short plain text, not rich content.
* `repository` — a GitHub URL.
* `authorship` — a short phrase describing how the project was built (e.g. "developed end-to-end, independently").
* A contextual note, where present, describing the project's relationship to other projects (e.g. one project succeeding another). This is unstructured context, not a structured predecessor/successor relationship.
* References to Stack entries, at whatever level the current model allows; a full Project ↔ Stack mapping mechanism is deferred.
* The Portfolio itself is one of the Projects.

Deferred for this domain: status, media (icon/screenshot/cover), rich content, structured authorship roles, structured project relationships, release history.

---

## 5. Section Overview

Portfolio Main Body is composed of five sections. Each section is defined by what it must be able to satisfy for the visitor, not by its UI: how a requirement is presented is a Product Design responsibility.

| Section         | Consumes                                                                                                  | Does not own                                           |
|-----------------|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| Banner          | Person (identity, positioning, introductory content, availability, professional image, external profiles) | Contact, Stack, Projects, Blog content                 |
| StackSection    | Stack Mapping (external feature)                                                                          | Positioning/skill detail surfaced in Banner            |
| InfoSection     | Education, Language                                                                                       | Person positioning, Stack Mapping                      |
| ProjectsSection | Project, references to Stack                                                                              | Stack entry definitions                                |
| ContactSection  | Contact, External Profiles (where needed)                                                                 | Availability, profile ownership, contact configuration |

No section owns data another section also consumes; sections that share Person data (Banner, ContactSection) each consume a distinct slice of it.

---

## 6. Functional Requirements

### 6.1 Banner

* Banner shall introduce the person by their Professional Name.
* Banner shall make the relationship between Professional Name and Full Name available to the visitor; the prominence and manner of presenting this relationship is a Product Design decision, not a fixed requirement.
* Banner shall communicate Professional Positioning (`profession`, and `focus` where present).
* Banner shall communicate Work Availability (status, employment type, work mode, and engagement type where present) and Counseling Availability, independently of one another.
* Banner shall present the person's Professional Image.
* Banner shall provide access to the GitHub and LinkedIn entries from External Profiles.
* Banner shall present the Short Introduction and the Professional Narrative from Person, and may present the Work Availability explanation.
* Banner shall provide navigation to the Blog feature. The destination, its content, and its behavior are outside this specification.
* Banner shall not present Contact methods, Stack skill detail, or Blog content directly.

### 6.2 StackSection

* StackSection shall be present within Portfolio Main Body and shall consume Stack Mapping data.
* StackSection's internal requirements, data shape, and presentation are defined by the Stack Mapping feature, not by this specification.

### 6.3 InfoSection

* InfoSection shall present the person's Education: degree level, field, institution, and study period.
* InfoSection shall be able to present the institution logo referenced by `institution.logo`.
* InfoSection shall not present institution location, graduation status, graduation date, or an "expected graduation" state.
* InfoSection shall present, per Language, the four independent capabilities (reading, writing, listening, speaking) rather than a single aggregate proficiency.
* InfoSection shall be able to reflect a language's native relationship when `native` is present, and shall treat `null` as non-native.
* Whether and how `evidence` and `note` are surfaced for each language capability is a Product Design decision.

### 6.4 ProjectsSection

* ProjectsSection shall present the software Projects associated with the person, including the Portfolio itself.
* For each Project, ProjectsSection shall be able to present: name, current version, short description, GitHub repository, and authorship.
* Where a contextual note about a Project's relationship to another Project exists in the data, ProjectsSection shall be able to present it; ProjectsSection shall not itself infer or compute such relationships.
* Where Stack references to exist for a Project, ProjectsSection shall be able to present them, at whatever level the current Project data allows.
* ProjectsSection shall not require or present Project status, release history, media assets, rich content, or structured authorship roles in this version.

### 6.5 ContactSection

* ContactSection shall expose every Contact method currently associated with the person, using each method's current value.
* Presence of a Contact method in the data is, in this version, sufficient and necessary for its presentation in ContactSection; selective visibility and per-method configuration are deferred.
* ContactSection shall not determine or reflect Work or Counseling Availability.
* ContactSection shall not duplicate External Profiles already available via Banner; where a profile is also relevant as a contact path, it is sourced from the single External Profiles collection.
* Ordering, labels, icons, and styling of Contact methods are presentation concerns.

---

## 7. Technical Design

* Portfolio Main Body is a read-only feature in this version: no section performs create, update, or delete operations against Person, Contact, Education, Language, or Project data.
* Portfolio Main Body reads its data server-side through repositories using the shared MongoDB helper. No API routes are introduced for data retrieval, and the client does not fetch its data over HTTP.
* Where an underlying value can currently be changed only outside the application (e.g. by direct data management), that is an accepted limitation of this version, not a defect.
* Work/Counseling Availability status and similar operationally-changing facts are controlled through existing administrative access elsewhere in the system; Portfolio Main Body only reads their current value.
* Portfolio Main Body shall follow the existing feature-based project structure and application service boundaries.
* StackSection integrates with Stack Mapping as an external feature dependency; Portfolio Main Body does not reimplement or duplicate Stack Mapping's data access.

---

## 8. Routes

### Public

Portfolio Main Body is presented on the root portfolio page. No dedicated routes are required per section.

### Protected

None. This version introduces no administrative routes; existing administrative access elsewhere in the system is unaffected.

---

## 9. State Management

The server is the source of truth for all data Portfolio Main Body reads. It holds no client-side mutable state for Person, Contact, Education, Language, or Project data; there is nothing to reconcile because no writes are performed.

---

## 10. Content and Media Rules

* The Professional Image is referenced exclusively by its CDN URL; Portfolio Main Body does not process, transform, or embed image bytes.
* The institution logo is referenced exclusively by its CDN URL; logos are not served from application-local assets.
* Decorative imagery (e.g. an art-line treatment of the Professional Image) is a presentation asset, not part of Person data.
* Short Introduction, Professional Narrative, and the Work Availability explanation are plain text in this version; they are not rich content and do not require the rich-content editor or renderer.
* Project descriptions remain plain, short text in this version; they are not rich content.

---

## 11. Security Considerations

* All Portfolio Main Body data is publicly readable; no visitor-level restriction is required.
* The feature introduces no write path and therefore no new write-authorization surface.
* Where the underlying data (e.g. Work Availability) is changed by an administrator through another part of the system, that change's authorization is governed by that other part of the system, not by Portfolio Main Body.

---

## 12. Reference Implementation Structure

The feature shall follow the existing feature-based project structure.

An illustrative structure is:

```text
src/
├── features/
│   └── portfolio-main-body/
│       ├── components/
│       │   ├── banner/
│       │   ├── stack-section/
│       │   ├── info-section/
│       │   ├── projects-section/
│       │   └── contact-section/
│       ├── repository/
│       ├── schemas/
│       ├── services/
│       └── types/
│
└── ...
```

The structure is illustrative and shall follow the actual project architecture. Stack Mapping remains owned by its own feature and is only consumed here.

---

## 13. Dependencies

### Requires

* Existing persistence infrastructure (shared MongoDB helper) for Person, Contact, Education, Language, and Project data.
* Stack Mapping feature, for StackSection.
* Public Content Platform feature, as Banner's Blog navigation target.
* Existing administrative access elsewhere in the system, for any operationally-changing fact Portfolio Main Body reads (e.g. Work Availability status).

### Enables

Portfolio Main Body provides the Portfolio's primary landing experience: an introduction to the owner, their availability, background, work, and how to reach them.

---

## 14. Notes

Portfolio Main Body is the first specification to define the Person, Contact, Education, Language, and Project domains formally. These domains are not owned by it — it is one of, likely several, consumers — but this document is, for now, where their shape is defined.

The Project domain is intentionally minimal and transitional; a later sub-version will redesign it without being constrained by decisions made here beyond the current minimal shape.

Data currently changed only outside the application (e.g. via direct data management) is an accepted characteristic of this version and is expected to change once write capability is introduced in a later version.

---

## 15. Changelog

| Version | Date       | Changes                                   |
|---------|------------|-------------------------------------------|
| 1.0     | 2026-09-28 | Initial Portfolio Main Body specification |