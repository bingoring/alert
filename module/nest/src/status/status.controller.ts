import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from '../constant/httpStatus.constant';

@ApiTags('HealthCheck')
@Controller('/health-check')
export class StatusController {
    @Get()
    public async get() {
        return { statusCode: HttpStatusCode.ok };
    }
}
