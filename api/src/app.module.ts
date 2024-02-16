import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [WalletModule],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
