import crypto from "crypto-random-string"
import { Configuration } from './configuration';

export default class RandomPassword
{
    config: Configuration;

    constructor(config: Configuration)    
    {
        this.config = config
    }

    private randomIntRange(Max: number = 100, Min: number = 0)
    {
        const entryMax = Max
        const entryMin = Min
        const entryRange = entryMax - entryMin

        const randMin = 0
        const randMax = 999999999999999
        const randRange = randMax - randMin

        const randValue: number = parseInt(crypto({ length: String(randMax).length, type: 'numeric' }));

        const entryValue: number = (((randValue - randMin) * entryRange) / randRange) + entryMin;

        return entryValue;
    }

    public simpleRandomString()
    {
        let type: string = ""

        let bitmap: number = 0;

        bitmap = this.config.numbers ? this.setBit(bitmap, 1) : bitmap;
        bitmap = this.config.uppercase ? this.setBit(bitmap, 2) : bitmap;
        bitmap = this.config.lowercase ? this.setBit(bitmap, 3) : bitmap;
        bitmap = this.config.symbols ? this.setBit(bitmap, 4) : bitmap;

        let passtype: any = "";

        switch (bitmap)
        {
            case 2:
                passtype = "numeric";
                break;
            case 14:
                passtype = "alphanumeric";
                break;
            case 30:
                passtype = "ascii-printable";
                break;
            default:
                passtype = "distinguishable";
                break;
        }

        let passwords: string[] = []

        for (let index = 0; index < this.config.passwords; index++)
        {
            let password = crypto({ length: this.config.length, type: passtype });
            passwords.push(password);
        }

        return passwords;
    }

    private setBit(num: number, bit: number)
    {
        return num | 1 << bit;
    }

    public complexRandomString()
    {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
        let selectedChar = "";

        for (const [key, value] of Object.entries(this.config))
        {
            switch (key)
            {
                case "uppercase":
                    if (value === true)
                    {
                        selectedChar = selectedChar + uppercase
                    }
                    break;
                case "lowercase":
                    if (value === true)
                    {
                        selectedChar = selectedChar + lowercase
                    }
                    break;
                case "numbers":
                    if (value === true)
                    {
                        selectedChar = selectedChar + numbers
                    }
                    break;
                case "symbols":
                    if (value === true)
                    {
                        selectedChar = selectedChar + symbols
                    }
                    break;
                default:
                    break;
            }
        }

        let passwords: string[] = []

        for (let index = 0; index < this.config.passwords; index++)
        {
            let password = this.passMaker(selectedChar);
            passwords.push(password);
        }

        return passwords;
    }


    private passMaker(selectedChar: string)
    {
        let password = "";
        for (let index = 0; index < this.config.length; index++)
        {
            let charSetValue: number = this.randomIntRange(selectedChar.length, 0);

            charSetValue = Math.round(charSetValue);

            password += selectedChar.charAt(charSetValue);
        }
        return password;
    }
}


