import { ApiProperty } from '@nestjs/swagger'

export class ReferralJoinDto {
  @ApiProperty()
  wallet: string

  @ApiProperty()
  joinCode: string

  @ApiProperty()
  signature: string
}
