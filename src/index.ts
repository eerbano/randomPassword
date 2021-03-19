import { Configuration } from './configuration';
import randomPassword from './randomPassword'

const config: Configuration = {
    passwords: 5,
    length: 15,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: false,
}

const randInstance = new randomPassword(config)

console.log(randInstance.complexRandomString())
console.log(randInstance.simpleRandomString())

