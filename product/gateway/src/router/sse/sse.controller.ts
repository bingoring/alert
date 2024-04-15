import { Controller, Injectable, Session, Sse, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SseInterceptor } from '@root/gateway/interceptor/sse.interceptor';
import { SessionType } from '../sign-up/session.type';
import { SseResponseDto } from './dto/sse.dto';

@ApiTags('Sse')
@Injectable()
@UseInterceptors(SseInterceptor)
@Controller('/sse/alarm')
export class SseController {
    constructor(private readonly sseService: SseService) {}

    @Sse()
    @ApiOperation({ summary: 'alarm sse' })
    public async sse(@Session() session: SessionType): Promise<SseResponseDto> {
        return await this.sseService.sse(session.organizationId);
    }
}
