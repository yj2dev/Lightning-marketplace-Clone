import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { ProductService } from '../service/product.service';
import { User } from '../../user/model/user.model';
import { Product } from '../model/product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:productId/favorite')
  @UseGuards(JwtAuthGuard)
  addFavoriteProduct(
    @CurrentUser() currentUser: User,
    @Param('productId') productId: string,
  ) {
    console.log('productId >> ', productId);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Query('productId') productId: string,
    @Query('state') state: string,
  ): Promise<boolean> {
    return await this.productService.deleteHardProduct(productId);
  }

  @Patch('state')
  @UseGuards(JwtAuthGuard)
  async updateProductState(
    @Body('productId') productId: string,
    @Body('state') state: string,
  ): Promise<Product> {
    console.log(productId, state);
    return await this.productService.updateProductState(productId, state);
  }

  @Get('all')
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('detail/:productId')
  async getOneProduct(@Param('productId') productId: string): Promise<Product> {
    console.log('productId >> ', productId);
    return await this.productService.getOneProduct(productId);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('image', 12, multerOptions('product_image')),
  )
  async uploadProduct(
    @CurrentUser() currentUser: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productInfo,
  ): Promise<boolean> {
    return await this.productService.uploadProduct(
      currentUser,
      files,
      JSON.parse(productInfo.data),
    );
  }
}
