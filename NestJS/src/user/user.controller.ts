import {Body, Controller, Post} from '@nestjs/common';
import {User} from "../_Shared/JavaScript/models/user/User";
import {UserService} from "./user.service";
import {UserCreateDto} from "../_Shared/JavaScript/models/user/UserCreateDto";

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    async signUp(@Body() user: UserCreateDto) {
        return await this.userService.signUp(user);
    }
}