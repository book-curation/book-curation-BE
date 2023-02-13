import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";
import { UsersService } from "./users.service";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    await this.usersService.checkPassword(loginDto.userId, loginDto.password);
    return res
      .status(HttpStatus.OK)
      .send({ message: "User successfully login" });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService.create(createUserDto);

    return res
      .status(HttpStatus.CREATED)
      .send({ message: "User successfully created." });
  }

  @Get(":id")
  async getUser(@Param("id") id: string, @Res() res: Response) {
    const user = await this.usersService.findById(id);
    const data = {
      id: user.userId,
      name: user.name,
      status: user.status,
      registerAt: user.registerAt,
    };
    return res
      .status(HttpStatus.OK)
      .send({ message: "User information successfully provided", data });
  }

  @Patch(":id")
  async resetPassword(
    @Param("id") id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response
  ) {
    await this.usersService.resetPassword(id, resetPasswordDto);
    return res
      .status(HttpStatus.OK)
      .send({ message: "Password successfully reset" });
  }

  @Delete()
  async delete(@Body() loginDto: LoginDto, @Res() res: Response) {
    await this.usersService.delete(loginDto.userId, loginDto.password);
    return res
      .status(HttpStatus.OK)
      .send({ message: "User successfully deleted" });
  }
}
