import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpPostBodyDto, SignUpPostResponseDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from '@root/nest/constant/httpStatus.constant';

@ApiTags('SignUp')
@Controller('/sign-up')
export class SignUpController {
    constructor(private readonly signUpService: SignUpService) {}

    @Post()
    @ApiResponse({ type: SignUpPostResponseDto })
    public async signUp(@Body() body: SignUpPostBodyDto): Promise<SignUpPostResponseDto> {
        const value = await this.signUpService.signUp(body);
        return {
            statusCode: HttpStatusCode.ok,
            value,
        };
    }
}
