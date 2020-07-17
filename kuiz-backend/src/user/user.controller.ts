import { Controller, Post, Body, Get } from "@nestjs/common";
import { AuthData } from "./user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sign")
  public async sign(@Body() data: AuthData) {
    return await this.userService.sign(data);
  }

  @Get("test")
  public async userTest() {
    return {
      user: 1,
    };
  }
}

export default {};
