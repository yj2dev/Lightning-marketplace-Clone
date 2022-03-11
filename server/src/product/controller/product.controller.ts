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
import { ProductFavorite } from '../../product-favorite/model/product-favorite.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/favorite')
  @UseGuards(JwtAuthGuard)
  async getProductFavorite(
    @CurrentUser() currentUser: User,
  ): Promise<ProductFavorite[]> {
    return await this.productService.getProductFavorite(currentUser._id);
  }

  @Get('/:productId/contact')
  async getProductContact(@Param('productId') productId: string): Promise<any> {
    return await this.productService.getProductContact(productId);
  }

  @Post('/:productId/contact')
  @UseGuards(JwtAuthGuard)
  async createProductContact(
    @Param('productId') productId: string,
    @Body('content') content: string,
    @CurrentUser() currentUser: User,
  ): Promise<any> {
    return await this.productService.createProductContact(
      currentUser._id,
      productId,
      content,
    );
  }

  @Delete('/:productId/contact')
  @UseGuards(JwtAuthGuard)
  async deleteProductContact(
    @Param('productId') productId: string,
    @CurrentUser() currentUser: User,
  ): Promise<any> {
    return await this.productService.deleteProductContact(
      currentUser._id,
      productId,
    );
  }

  @Patch('/:productId/contact')
  @UseGuards(JwtAuthGuard)
  async updateProductContact(
    @Param('productId') productId: string,
    @Body('content') content: string,
    @CurrentUser() currentUser: User,
  ): Promise<any> {
    return await this.productService.updateProductContact(
      currentUser._id,
      productId,
      content,
    );
  }

  @Get('/:productId/favorite')
  @UseGuards(JwtAuthGuard)
  async addFavoriteProduct(
    @CurrentUser() currentUser: User,
    @Param('productId') productId: string,
  ): Promise<boolean> {
    console.log('currentUser >> ', currentUser);
    console.log('productId >> ', productId);
    return this.productService.addProductFavorite(currentUser._id, productId);
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
