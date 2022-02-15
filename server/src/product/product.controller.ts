import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';
import { ProductService } from './product.service';
import { User } from '../user/model/user.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('image', 12, multerOptions('product_image')),
  )
  async uploadProduct(
    @CurrentUser() currentUser: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productInfo,
  ) {
    return await this.productService.uploadProduct(
      currentUser,
      files,
      JSON.parse(productInfo.data),
    );
  }
}
