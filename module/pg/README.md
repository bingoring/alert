# pg

Postgresql을 다룰 수 있도록 TypeORM 기반으로 작성된 모듈입니다.

## Building

Run `nx build pg` to build the library.

## Running unit tests

Run `nx test pg` to execute the unit tests via [Jest](https://jestjs.io).

## Repository 사용 방법
- 초기화
초기화 방법에는 2가지가 있는데, tenantId 기반 초기화와, DataSource 기반 초기화가 있다. 
객체를 생성한 이후 `.initialize()`를 호출해서 초기화 작업을 완료해야만 한다.

```typescript
    const tenantId = 'tenant';
    const dataSource: DataSource;

    // tenantId based repsoitory is initailize required.
    const tenantBasedRepository = new TenantBasedRepository({ tenantId });
    await tenantBasedRepository.initialize();
```


- Entity가 있는 Repository인 경우
```typescript
import { AbstractEntityRepository } from '@root/pg/repository/abstractEntity.repository';


export class TempRepository extends AbstractEntityRepository<Temp> {
    constructor (tenantId: string) {
        super(Temp, { tenantId });

        // DataSource 기반인 경우는 아래와 같이 수행
        // super(Temp, { dataSource });
    }

    public async get() {
        // same => dataSource.getRepository(Temp);
        const repository = this.getRepository();
        // ...
    }
}

```

- Entity가 없는 Repository 인 경우
```typescript
import { AbstractRepository } from '@root/pg/repository/abstract.repository';


export class TempRepository extends AbstractRepository<Temp> {
    constructor (tenantId: string) {
        super(Temp, { tenantId });

        // DataSource 기반인 경우는 아래와 같이 수행
        // super(Temp, { dataSource });
    }

    public async get() {
        const dataSource = this.getDataSource();
        // ...
    }
}

```
