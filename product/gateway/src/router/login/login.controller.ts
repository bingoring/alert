import { Controller, Post, Request } from '@nestjs/common';
import { LoginPostResponseDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('/login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    @ApiResponse({ type: LoginPostResponseDto })
    public async login(@Request() req): Promise<LoginPostResponseDto> {
        const result = await this.loginService.login(body);
        return result;
    }
}
