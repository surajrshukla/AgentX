import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from '@app/common/models';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @CurrentUser() user: UserDocument,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.login(user, response);
        response.send(user);
    }
    @Get()
    getHello(): string {
        return this.authService.getHello();
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('authenticate')
    async authenticate(@Payload() data: any) {
        return data.user;
    }
}
