```todo
✅ step: upload git observatory to claude
```

```todo
✅ step: ask for new branching name for foundation name - Application Logging Layer
```

```todo
✅ step: change observatory based in reviewed suggestions
```

```todo
✅ commit changes
```

```todo
✅ step: make branch: feature/logging
```

```todo
✅ step: Design and build the main foundation and Contract (Foundation)
```

```todo
✅ step: Define Types and Interfaces (main contract): Define Logger Interface with six-level methods (trace, debug, info, warn, error, fatal)
```

```todo
✅ commit changes
```

```todo
✅ step: Define Types and Interfaces (main contract): Define standard Struct/Payload for structured logging (including metadata, message, timestamp and ...)
```

```todo
✅ commit changes
```

```todo
✅ step: Define Log Levels: Implement Enum/Types related to log levels (Trace to Fatal)
```

```todo
✅ commit changes
```

```todo
✅ step: Implement central Logging API (Facade pattern): Build central layer that operates independently of the main vendor/transport so programming code does not depend on a specific library
```

```todo
✅ step: Implement central Logging API (Facade pattern): Apply error management (Safe failure behavior) so that failure in sending or payload error in the logger does not cause crash or disruption in user requests
```

```todo
✅ step: Set behavior based on environment (Environment-Awareness): Set log level and output method based on environment (e.g. Dev vs Prod)
```

```todo
✅ commit changes
```

```todo
✅ step: Integration and replacement in different layers (Integration): Middleware layer: Integrate logger to record events and incoming requests in middlewares
```

```todo
✅ commit changes
```

```todo
✅ step: update 02-foundations\TRACKING.md
```

```todo
✅ commit changes
```

```todo
✅ step: v2.0\TRACKING.md
```

```todo
✅ commit changes
```

```todo
✅ step: add ADR 13 about our testing policies
```

```todo
✅ step: commit ADR 13
```

```todo
✅ step: Implement central Logging API (Facade pattern): Observe security cases (Sanitization) to prevent logging of sensitive information (such as passwords, tokens, secrets)
```

```todo
✅ commit changes
```

```todo
✅ step: Add vitest library with bun: bun add -d vitest
```

```todo
✅ step: Add test script to package.json
```

```todo
✅ commit changes
```

```todo
✅ step: Add vitest config file
```

```todo
✅ commit changes
```

```todo
✅ step: Set up test file src/shared/logger/logger.test.ts and implement tests for Logger Contract & Level Mapping
```

```todo
✅ commit changes
```

```todo
✅ step: Test Structured Payload & Timestamp Generation
```

```todo
✅ commit changes
```

```todo
step: Test Metadata Attachment & Sanitization
```

```todo
✅ commit changes
```

```todo
✅ step: Test Invalid Payload & Unexpected Metadata Values
```

```todo
✅ commit changes
```

```todo
✅ step: Test Transport & Internal Error Resilience (testing that the application does not crash on internal error or sudden pressures - concepts: Error Testing)
```

```todo
✅ commit changes
```

```todo
✅ step: Update Capability status and tracking of the main spec file
```

```todo
✅ commit changes: docs(logger): update verification checklist
```

```todo
✅ step: Document contracts and logging standards in conventions.md
```

```todo
✅ step: add changelog in conventions.md
```

```todo
✅ commit changes: docs(logger): add logging standards to conventions
```

```todo
✅ step: Change the application logging directory in /capability to maintain cohesion
```

```todo
✅ step: work on Application-Logger/Specifications.md
```

```todo
✅ commit changes
```

```todo
✅ step: add scope for Usages and Guidline kind of docs in conventions.md
```

```todo
✅ step: add changelog in conventions.md
```

```todo
✅ commit changes in conventions.md
```

```todo
✅ step: Provide practical code samples (Usage Examples) for team members to use
```

```todo
✅ commit changes
```

```todo
step: change ./TRACKING.md status for Application Logging Layer:
✅ change Status to: Completed
✅ reform Tracking table
✅ add changelogs
```

```todo
commit changes
```

```todo
step: changes \docs\runbook-v2\v2.0\TRACKING.md
✅ change Last Updated to today's date
✅ add information for foundation:
✅   targeted milestone date
✅   completed date
✅ add changelogs
```

```todo
✅ commit changes
```

```todo
draft other irrelevant changes
```

```todo
chackout staging
```

```todo
merge feature/logging into staging
```

```todo
go to staging-runbook.md line 99
```

