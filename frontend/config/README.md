# Directory for configs

Required configs:
- `app.config.ts`

Examples:

- `app.config.ts`
```typescript
export const APP_CONFIG = {
    frontend: {
        host: 'localhost',
        port: 4200,
    },
    backend: {
        host: 'localhost',
        port: 3000,
    },
};
```