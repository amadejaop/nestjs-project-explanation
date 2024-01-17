import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

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

    @Post('/test')
    @UseGuards(AuthGuard())
    authTest(@GetUser() user) {
        console.log('user', user);
    }
}
