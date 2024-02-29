import { INestApplication, RequestMethod, VersioningType } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
export const RPC_URL = process.env.RPC_URL || ''
export const VAULT_ADDRESS = process.env.VAULT_ADDRESS || ''
export const STAKING_ADDRESS = process.env.STAKING_ADDRESS || ''
export const DATA_FEED = process.env.DATA_FEED || ''

export function setAppSetting(app: INestApplication) {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }]
  })
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://localhost:3006',
      'http://localhost:3007',
      'https://1hydrogen.io',

      /\.1hydrogen.io$/
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
}
