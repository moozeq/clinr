# Directory for configs

Required configs:
- `app.config.ts`
- `auth.config.ts`
- `database.config.ts`

Examples:

- `app.config.ts`
```typescript
export default () => ({
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
});
```
- `auth.config.ts`
```typescript
export default () => ({
    jwtConstants: {
        secret: 'super-secret-2137',
    }
});
```
- `database.config.ts`
```typescript
export default () => ({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: 'clinr',
    password: '',
    dialect: 'postgres',
    database: 'postgres',
    logging: true
});
```