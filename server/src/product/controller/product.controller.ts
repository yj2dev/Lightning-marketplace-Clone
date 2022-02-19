import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { ProductService } from '../service/product.service';
import { User } from '../../store/model/user.model';
import { Product } from '../model/product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/all')
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('/detail/:productId')
  async getOneProduct(@Param('productId') productId: string): Promise<Product> {
    console.log('productId >> ', productId);
    return await this.productService.getOneProduct(productId);
  }

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
