# common
커먼하게 사용할 모듈을 모아두고 있습니다.

## Redis 사용법
- initRedis 함수를 사용하면 globalThis.redis를 초기화합니다.
```typescript
// initService에 initRedis를 추가합니다.
export async function initService() {
    await initRedis();
}
```

- redis 사용하기
```typescript
const getResult = await redis.get('key');
```

- redis 함수 찾아보기
https://redis.io/commands/
