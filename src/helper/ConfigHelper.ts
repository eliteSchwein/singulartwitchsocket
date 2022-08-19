import * as fs from 'fs'
import * as path from 'path'

export default class ConfigHelper {
    protected configPath = path.resolve(__dirname, '../../config.json')
    protected configContent: any

    public constructor() {
        const configRawContent = fs.readFileSync(this.configPath, {encoding: 'utf8'})

        this.configContent = JSON.parse(configRawContent)
    }
}