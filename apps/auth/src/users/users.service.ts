import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async craete(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        });
    }
    async validateCreateUserDto(createUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email });
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException('User already exists');
    }
    async validateUser(email, passport) {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(passport, user.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid');
        }

        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto);
    }
}
