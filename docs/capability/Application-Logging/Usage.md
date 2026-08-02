# Application Logger - Usage Examples & Guidelines

This document provides practical code snippets for utilizing the centralized application logger (`@/shared/logger`) across different layers of the codebase.

---

## 1. Basic Usage & Log Levels

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

## 2. Logging with Metadata & Automatic Sanitization

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

## 3. Error Handling & Stack Traces

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

## 4. Layer Integration Patterns

### A. Middleware / Request Logging

```typescript
import { logger } from '@/shared/logger';

export function middleware(req: Request) {
  logger.info('Incoming HTTP Request', {
    method: req.method,
    url: req.url,
  });
}
```

### B. Service / Repository Layer

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