# AI-Assisted Engineering Workflow

**Status:** Active

**Version:** 1.0

**Owner:** Amir Karimi

---

# 1. Purpose

This document defines how AI assistants are integrated into the engineering workflow of this project.

Rather than relying on a single AI assistant, this project uses multiple models, each selected according to its observed strengths, practical limitations, and suitability for specific engineering tasks.

The goal is to maximize productivity while maintaining engineering quality, consistency, and human ownership of all technical decisions.

---

# 2. Engineering Philosophy

AI assistants are engineering tools—not decision makers.

All architectural decisions, implementation choices, security considerations, and business logic remain under human responsibility.

AI-generated content is considered a draft until it has been reviewed and approved.

Every generated artifact—including code, documentation, commit messages, and architectural suggestions—must comply with the project's specifications, ADRs, conventions, and engineering standards.

---

# 3. Evaluation Criteria

Tool selection is based on practical experience using the **best available free version** of each AI assistant during this project.

Evaluations are intentionally empirical rather than theoretical.

The responsibilities defined in this document may evolve as models improve or project requirements change.

---

# 4. Responsibility Matrix

| Engineering Task              | Primary AI     | Secondary AI |
|-------------------------------|----------------|--------------|
| Specifications                | ChatGPT        | Claude       |
| ADRs                          | ChatGPT        | Claude       |
| Technical Documentation       | ChatGPT        | Claude       |
| Architecture Discussions      | ChatGPT        | Claude       |
| Framework / Library Research  | Grok, DeepSeek | Gemini       |
| Prompt Engineering            | Grok, DeepSeek | —            |
| Code Generation               | Gemini         | Claude       |
| Debugging                     | Claude         | ChatGPT      |
| Git Workflow                  | Claude         | —            |
| Translation / Text Formatting | Grok, DeepSeek | Claude       |

---

# 5. AI Responsibilities

## ChatGPT

Primary responsibility:

* Project specifications
* ADR authoring
* Technical documentation
* Engineering best practices
* Software architecture discussions
* Infrastructure-related questions

### Why

ChatGPT consistently produces the highest quality technical documentation and architectural reasoning.

Because architecture-related questions occur relatively infrequently, its stricter usage limits are not considered a significant limitation for these tasks.

### Limitations

The free version has comparatively restrictive usage limits, making it unsuitable as the primary assistant for day-to-day code generation.

It may also be consulted during difficult debugging sessions when additional architectural insight is required.

---

## Grok

Primary responsibility:

* Framework research
* Library documentation research
* Prompt generation
* Documentation lookup
* Short text transformation

### Why

Grok performs particularly well at collecting recent information from public documentation and online resources.

It is also useful for identifying files likely to be affected by a requested change, making it valuable during prompt preparation for other AI assistants.

### Limitations

Generated code often requires significant review and refinement before adoption.

---

## DeepSeek

Primary responsibility:

* Framework research
* Documentation lookup
* Prompt preparation
* Text transformation

### Why

DeepSeek offers excellent availability with minimal usage restrictions while providing strong performance for research-oriented tasks.

It is frequently used to prepare prompts, identify impacted files, or summarize documentation before implementation begins.

### Limitations

Code quality is generally below the project's expectations and requires careful review.

---

## Gemini

Primary responsibility:

* Code generation
* Implementation assistance
* Secondary technical review

### Why

Gemini provides a practical balance between response quality, implementation capability, and generous usage limits.

Its generated code generally requires less review than code produced by Grok or DeepSeek.

Gemini is also used to validate or review technical findings gathered from other AI assistants.

---

## Claude

Primary responsibility:

* Debugging
* Git workflow
* Commit generation
* Branch naming
* Engineering reasoning

### Why

Claude demonstrates strong reasoning capabilities during debugging and implementation analysis.

A dedicated Claude project is maintained with engineering context, including project conventions and the Git Observatory documentation.

Keeping this context continuously updated has significantly improved the consistency and quality of:

* Commit messages
* Branch names
* Pull request preparation
* Git-related workflows

Claude is also frequently used for debugging when implementation issues require deeper logical reasoning.

---

# 6. Engineering Workflow

A typical development workflow is:

1. Read the Specification and relevant ADRs.
2. Research libraries or framework behavior using Grok or DeepSeek.
3. Generate implementation using Gemini.
4. Debug complex issues using Claude.
5. Validate architectural decisions using ChatGPT when necessary.
6. Generate Git artifacts using Claude.
7. Perform final human review before merging.

---

# 7. Guiding Principles

The project intentionally avoids depending on any single AI assistant.

Responsibilities are distributed according to observed strengths so that each tool contributes where it provides the greatest value.

If future model capabilities change, this document should be updated accordingly without affecting the overall engineering workflow.
