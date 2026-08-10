# Usage Examples & Guidelines for Capabilities (`docs\capability`)

> This document provides practical usage examples and guidelines for capabilities documented under docs/capability.
>
> It focuses on how capabilities should be used within the application and does not define their underlying implementation or API contract.

---

## 1. Application Logger

### Purpose

Use the centralized application logger (`@/shared/logger`) for operational,
diagnostic, warning, and error logging across application layers.

### When to Use

Use the application logger for:

- Operational events that are useful for monitoring.
- Diagnostic information needed during development or troubleshooting.
- Non-fatal conditions that may require attention.
- Exceptions and failed operations where the stack trace is useful.

### Logging Guidelines

- Use structured metadata instead of embedding contextual values in the message.
- Use the appropriate log level for the event.
- Avoid logging sensitive information.
- When handling errors, preserve the original error object whenever possible.

### Basic Usage & Log Levels

```typescript
import { logger } from '@/shared/logger';

// Info: General operational events
logger.info('Application started successfully');

// Debug: Diagnostic data (won't appear in production if LOG_LEVEL is info)
logger.debug('Cache revalidation in progress', { cacheKey: 'user_123' });

// Warn: Non-fatal issues
logger.warn('Rate limit threshold approaching', { ip: '192.168.1.1', attempts: 4 });
```

---

### Logging with Metadata & Automatic Sanitization

Sensitive keys like `password`, `token`, `secret`, and `authorization` are automatically redacted in the structured JSON payload.

```typescript
import { logger } from '@/shared/logger';

// The password and secret fields will automatically be converted to '[REDACTED]'
logger.info('User authentication attempt', {
  username: 'admin_user',
  password: 'user_clear_password', // Redacted
  token: 'jwt_access_token_value',   // Redacted
  ip: '10.0.0.1',                   // Preserved
});
```

---

### Error Handling & Stack Traces

When catching errors, always pass the error object or include it in the log call to preserve the stack trace.

```typescript
import { logger } from '@/shared/logger';

try {
  // Simulating an operation
  await database.connect();
} catch (error) {
  logger.error(error as Error, 'Failed to connect to primary database', {
    retryCount: 3,
  });
}
```

---

### Layer Integration Patterns

#### A. Middleware / Request Logging

```typescript
import { logger } from '@/shared/logger';

export function middleware(req: Request) {
  logger.info('Incoming HTTP Request', {
    method: req.method,
    url: req.url,
  });
}
```

#### Service / Repository Layer

```typescript
import { logger } from '@/shared/logger';

export class UserService {
  async createUser(data: CreateUserDTO) {
    logger.debug('Creating new user record', { email: data.email });

    try {
      const user = await userRepository.save(data);
      logger.info('User created successfully', { userId: user.id });
      return user;
    } catch (err) {
      logger.error(err as Error, 'User creation failed in repository');
      throw err;
    }
  }
}
```