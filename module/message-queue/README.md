# message-queue

## MessageConsumer
### Building
```typescript
// for Pulsar
import { MessageConsumer } from '@root/message-queue';
import { PulsarClientFactory, PulsarConsumeAdapter } from '@root/message-queue/mq-adapter/pulsar';

const pulsarClient = PulsarClientFactory.create({
    pulsarUrl: env.pulsar.url,
    password: env.pulsar.passwd,
});
const pulsarConsumeAdapter = new PulsarConsumeAdapter(pulsarClient, {
    // pulsar consume option
});
const messageConsumer = new MessageConsumer(pulsarConsumeAdapter);
```
- 되도록이면 위 방식과 NestJS IOC Container를 결합하여 클래스 내에 `MessageConsumer` 를 직접 주입하는 방식으로 사용하는 것을 권장합니다.
- 의존성 주입을 통해 사용할 경우, 향후 MQ 기술을 변경하더라도 실제 로직은 수정되지 않도록 구성되어 있기 때문입니다.
### Using
```typescript
// Msg 처리 콜백 등록
messageConsumer.subscribe(async (msg: string)=> {
    // msg 처리 로직
})
```
- Ack 처리는 로직 내부에서 알아서 처리됩니다. 이 때 `subscribe` 를 통해 등록할 콜백 실행 직전에 Ack를 수행할지, 혹은 직후에 실행할지는 `PulsarAdapter` 를 생성할 때 옵션으로 추가할 수 있습니다.

## MessageProducer
### Building
```typescript
// for Pulsar
import { MessageProducer } from '@root/message-queue';
import { PulsarClientFactory, PulsarProduceAdapter } from '@root/message-queue/mq-adapter/pulsar';

const pulsarClient = PulsarClientFactory.create({
    pulsarUrl: env.pulsar.url,
    password: env.pulsar.passwd,
});
const pulsarProduceAdapter = new PulsarProduceAdapter(pulsarClient, 'SOME_TARGET_TOPIC' ,{
    // pulsar produce option
});
const messageProducer = new MessageProducer(pulsarProduceAdapter);
```
### Using
```typescript
// Msg 전송
const stringForSend = '~~~';
await messageProducer.send(stringForSend);
```
