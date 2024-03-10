import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';
import { AlarmService } from './alarm.service';
import { AlarmPostBodyDto, AlarmPostResponseDto } from './dto';

@ApiTags('Alarm')
@Controller('/alarm')
export class AlarmController {
    constructor(private readonly alarmService: AlarmService) {}

    @Post()
    @ApiResponse({ type: AlarmPostResponseDto })
    public async post(@Body() body: AlarmPostBodyDto): Promise<AlarmPostResponseDto> {
        const value = await this.alarmService.post(body);
        return {
            statusCode: HttpStatusCode.ok,
            value,
        };
    }
}
