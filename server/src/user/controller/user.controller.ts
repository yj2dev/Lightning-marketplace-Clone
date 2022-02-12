import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { HttpExceptionFilter } from '../../common/exception/http-exception.filter';
import { SuccessInterceptor } from '../../common/interceptor/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserReadonlyDto } from '../dto/user.readonly.dto';
import { UserRequestDto } from '../dto/user.request.dto';
import { AuthService } from '../../auth/auth.service';
import { UserSigninDto } from '../../auth/dto/user.signin.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { User } from '../model/user.model';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  allUser(@CurrentUser() currentUser) {
    return currentUser.readonlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '성공', type: UserReadonlyDto })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('signup')
  async signUp(@Body() userRequestDto: UserRequestDto) {
    return await this.userService.signup(userRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signin(
    @Body() userSigninDto: UserSigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { jwt, user } = await this.authService.jwtSignin(userSigninDto);

    res.cookie('jwt', jwt, { httpOnly: true });
    return user.readonlyData;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Get('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
  }

  @ApiOperation({ summary: '유저 회원가입 여부 조회' })
  @ApiResponse({
    status: 200,
    description: '유저가 존재함',
    type: UserReadonlyDto,
  })
  @ApiResponse({ status: 409, description: '유저가 존재하지 않음' })
  @Get('/check')
  async isUser(@Query('phoneNumber') phoneNumber: string) {
    return await this.userService.isPhoneNumber(phoneNumber);
  }

  @Post('upload/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 12, multerOptions('user.profile')))
  uploadFile(
    @CurrentUser() currentUser: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('profile');
    console.log('files', files);
    // const imgURI = `http://localhost:8000/static/user.profile/${file.filename[0]}`;
    // console.log('imgURI >> ', imgURI);
    return this.userService.uploadImg(currentUser, files);
  }

  @Get('test')
  testHi(@Body() body) {
    console.log(body);
    return 'res nextJS';
  }

  @Post('upload/product')
  @UseInterceptors(FilesInterceptor('image', 12, multerOptions('user.profile')))
  uploadImgNoUser(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('product');
    console.log('files', files);
    return this.userService.uploadImgNoUser(files);
  }
}
