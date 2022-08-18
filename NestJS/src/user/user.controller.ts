import {Body, Controller, Delete, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreateDto} from "../_Shared/JavaScript/models/user/UserCreateDto";
import {UserCredentialsDto} from "../_Shared/JavaScript/models/user/UserCredentialsDto";
import {userRepository} from "../_Shared/JavaScript/repositories/repositoryManager";

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post("/signup")
    async signUp(@Body() dto: UserCreateDto) {
        return await this.userService.signUp(dto);
    }

    // *** DEBUG API ***//
    @Delete()
    async deleteAll() {
        return await userRepository.deleteAll();
    }
}