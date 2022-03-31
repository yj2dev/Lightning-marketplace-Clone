import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class AppModule implements NestModule {
    private readonly MODE;
    configure(consumer: MiddlewareConsumer): void;
}
