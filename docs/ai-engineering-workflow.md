# AI-Assisted Engineering Workflow

* **Version:** 1.1
* **Owner:** Amir Karimi

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

AI assistants may also be used collaboratively rather than independently. The output of one model may become structured input for another when this produces a stronger engineering result.

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
* Exploring technical dimensions and conceptual gaps in requirements

### Why

ChatGPT consistently produces the highest quality technical documentation and architectural reasoning.

It is particularly effective when a problem has not yet been fully understood and requires extended discussion to identify conceptual boundaries, hidden assumptions, software edge cases, and missing requirements.

For this reason, ChatGPT is currently the primary assistant for extracting a formal specification from an initially informal problem description.

A typical specification workflow begins with an extended discussion of the problem using ChatGPT. The resulting specification then becomes the primary engineering artifact used to align subsequent AI-assisted work.

ChatGPT also tends to produce highly comprehensive documentation. This reduces conceptual ambiguity and makes important gaps less likely to remain unnoticed.

### Limitations

The free version has comparatively restrictive usage limits, making it unsuitable as the primary assistant for day-to-day code generation.

Its tendency toward conceptual completeness can also introduce unnecessary complexity or process overhead. In this workflow, generated documentation should therefore be reviewed for proportionality and operational necessity rather than accepted solely because it is comprehensive.

When rewriting large existing documents, ChatGPT may prefer concise change-oriented output rather than reproducing the entire revised document.

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
* Implementation synthesis from multi-model analysis

### Why

Gemini provides a practical balance between response quality, implementation capability, and generous usage limits.

Its generated code generally requires less review than code produced by Grok or DeepSeek.

Gemini is also used to synthesize implementation guidance from structured inputs produced by other AI assistants. When appropriate, a detailed implementation prompt can be constructed from the original engineering discussion, specification, and reviews produced by multiple models.

---

## Claude

Primary responsibility:

* Debugging
* Git workflow
* Commit generation
* Branch naming
* Engineering reasoning
* Long-form document rewriting and refinement

### Why

Claude demonstrates strong reasoning capabilities during debugging and implementation analysis.

A dedicated Claude project is maintained with engineering context, including project conventions and the Git Observatory documentation.

Keeping this context continuously updated has significantly improved the consistency and quality of:

* Commit messages
* Branch names
* Pull request preparation
* Git-related workflows

Claude is also frequently used for debugging when implementation issues require deeper logical reasoning.

Claude tends to approach engineering problems with a more minimal and operational bias than ChatGPT. This makes it useful as a counterbalance when a specification or proposed solution may have accumulated unnecessary conceptual or procedural complexity.

Claude is particularly effective at completely rewriting long reports or documents when a full revised artifact is required, whereas ChatGPT may prefer providing a concise change log or describing the required modifications.

---

# 6. Multi-Model Specification Workflow

The project uses AI assistants collaboratively when defining complex engineering work.

The preferred workflow for extracting the technical dimensions of a problem is:

```text
Informal Problem
      │
      ▼
Extended Discussion with ChatGPT
      │
      ▼
Specification Draft
      │
      ├───────────────┐
      ▼               ▼
Claude Review    Other AI Review
      │               │
      └───────┬───────┘
              ▼
       Gap / Edge-Case Review
              │
              ▼
      Consolidated Prompt
              │
              ▼
            Gemini
              │
              ▼
       Implementation
```

ChatGPT is currently used most heavily during the initial exploration phase because extended discussion tends to expose conceptual gaps and produce a more complete specification.

The resulting specification is then reviewed through other AI assistants for complementary concerns, including:

* Scientific or technical correctness.
* Missing software concerns.
* Unconsidered edge cases.
* Internal consistency.
* Excessive complexity or unnecessary process.
* Formatting and summarization that may have obscured important requirements.

The purpose of multi-model review is not to require agreement between models. It is to use disagreement and different reasoning styles as a mechanism for discovering omissions and improving the specification.

When implementation is the next step, the relevant findings can be consolidated into a detailed implementation prompt and provided to Gemini for code generation.

This workflow is especially useful when the initial problem statement is incomplete or ambiguous. For smaller, well-understood changes, the full multi-model pipeline is unnecessary.

---

# 7. Engineering Workflow

A typical development workflow is:

1. Identify the problem and its intended outcome.
2. Discuss complex or ambiguous problems extensively with ChatGPT.
3. Extract the resulting technical understanding into a specification.
4. Review the specification with Claude and, when useful, other AI assistants.
5. Check for conceptual, scientific, software, edge-case, and consistency gaps.
6. Remove unnecessary complexity and ensure the specification remains proportionate to the problem.
7. Research libraries or framework behavior using Grok or DeepSeek when necessary.
8. Construct an implementation prompt from the specification and relevant review findings.
9. Generate implementation using Gemini.
10. Debug complex issues using Claude.
11. Validate architectural decisions using ChatGPT when necessary.
12. Generate Git artifacts using Claude.
13. Perform final human review before merging.

The full multi-model specification workflow is applied selectively. It is not a mandatory ceremony for every change.

---

# 8. Guiding Principles

The project intentionally avoids depending on any single AI assistant.

Responsibilities are distributed according to observed strengths so that each tool contributes where it provides the greatest value.

Different models may be used sequentially on the same engineering problem when their combined output is more valuable than the output of any individual model.

The objective is not to maximize the amount of AI-generated material. The objective is to maximize engineering clarity while minimizing unnecessary complexity and human review cost.

If future model capabilities change, this document should be updated accordingly without affecting the overall engineering workflow.
