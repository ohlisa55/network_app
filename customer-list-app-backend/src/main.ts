// Vue.jsで構築されるクライアント側からのリクエストを許可するには、CORS（クロスオリジンリソース共有）を有効にする必要があります。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // add this line
  await app.listen(3000);
}
bootstrap();
