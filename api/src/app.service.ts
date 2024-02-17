import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root() {
    return 'Hydrogen API'
  }
  health(): string {
    return 'OK'
  }
}
