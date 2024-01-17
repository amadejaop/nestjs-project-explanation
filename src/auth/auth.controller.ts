import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentials: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authcredentials);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentials);
    }
}
