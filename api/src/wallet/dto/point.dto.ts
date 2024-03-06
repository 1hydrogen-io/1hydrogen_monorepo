import { ApiProperty } from '@nestjs/swagger'

export class PointDto {
  @ApiProperty()
  txHash: string

  @ApiProperty({ required: false })
  refCode: string
}
