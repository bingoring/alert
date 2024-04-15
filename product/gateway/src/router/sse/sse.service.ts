import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { MessageConsumer } from '@root/message-queue/index';
import { SseResponseDto } from './dto/sse.dto';

@Injectable()
export class SseService {
    constructor(private readonly eventEmitter: EventEmitter2, private readonly messageConsumer: MessageConsumer) {}
    public async sse(tenantId: string) {
        const result = fromEvent(this.eventEmitter, tenantId) as Observable<SseResponseDto>;
        this.messageConsumer.subscribe((msg) => {
            const messageData = JSON.parse(msg);
            const messageEvent = { value: messageData };
            this.eventEmitter.emit((messageData as any).tenantId, messageEvent);
        });
        return result;
    }
}
