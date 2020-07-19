import { Controller, Post, Body, Get, Req } from "@nestjs/common";
import { AuthData } from "./user.interface";
import { UserService } from "./user.service";
import { Request } from "express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sign")
  public async sign(@Body() data: AuthData) {
    return await this.userService.sign(data);
  }
}

export default {};
