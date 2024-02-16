import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WalletService } from './wallet.service'

@Controller({ path: 'wallet', version: '1' })
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('point/:wallet')
  async point(@Param('wallet') address: string) {
    return await this.walletService.point(address)
  }

  @Get('leaderBoard/:take')
  async leaderBoard(@Param('take') take: string) {
    return await this.walletService.leaderBoard(Number(take))
  }

  @Post('point/:txHash')
  async updatePoint(@Param('txHash') txHash: string) {
    return await this.walletService.createOrUpdate(txHash)
  }
}
