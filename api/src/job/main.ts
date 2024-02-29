import { calculatePoint } from './process'
import { schedule } from 'node-cron'
async function main() {
  await calculatePoint()
}

schedule('*/5 * * * *', () => {
  console.log('fetch data')
  main().catch((err) => {
    console.log('exit with error', err)
    //process.exit(1)
  })
})
