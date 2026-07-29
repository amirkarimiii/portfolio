# ADR-0012: Introduce an Application Logging Layer

-   **Status:** Accepted
-   **Date:** 2026-07-29

---

## Context

The application currently relies on direct `console.*` statements for server-side logging. This approach has several limitations:

- Logging is inconsistent across the codebase.
- There is no shared contract for recording application events.
- Business code is coupled to a specific logging mechanism.
- The current approach does not provide a clear evolution path toward structured logging, centralized log management, or future observability capabilities.

Logging is a cross-cutting concern rather than a domain feature. Multiple parts of the application—including API routes, infrastructure code, and future features—need a consistent way to record operational events.

As the project evolves, the logging infrastructure should remain replaceable without requiring changes throughout the application.

## Decision

Introduce a dedicated **Application Logging Layer** as a standalone infrastructure feature.

This layer will become the only public entry point for application logging.

The logging layer will:

- Provide a consistent API for recording application events.
- Produce structured logs.
- Hide implementation details from application code.
- Decouple business logic from any logging vendor or runtime.
- Be designed to support future extensions without changing its public API.

Application code must no longer invoke `console.*` directly for server-side logging. Instead, all logging must go through the logging layer.

## Scope

This ADR covers **application logging only**.

The following concerns are explicitly out of scope:

- Error reporting
- Alerting
- Metrics
- Distributed tracing
- Analytics
- Notification channels (Telegram, Slack, etc.)
- Long-term log storage
- Vendor-specific integrations

These concerns may be introduced in future ADRs.

## Consequences

### Positive

- Consistent logging throughout the application.
- Centralized logging policy.
- Easier migration between logging implementations.
- Reduced coupling between business code and infrastructure.
- Better foundation for future observability initiatives.

### Negative

- Introduces an additional abstraction layer.
- Requires all new server-side code to follow the logging contract.

## Future Evolution

The logging layer is expected to evolve incrementally.

Future iterations may introduce:

- Structured context enrichment
- Correlation and request identifiers
- Multiple log transports
- Integration with external observability platforms
- Environment-specific logging policies

These enhancements should be implemented without changing the public logging API consumed by application code.