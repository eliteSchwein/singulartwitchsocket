import 'colorts/lib/string';
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'
import {stripAnsi} from "./DataHelper";
const logPath = path.resolve(__dirname, '../logs/singulartwitchsocket.log')
let log_file: fs.WriteStream
const log_stdout = process.stdout

export function enableLogger() {
    if(fs.existsSync(logPath)) {
        fs.unlinkSync(logPath)
    }

    fs.closeSync(fs.openSync(logPath, 'w'))

    log_file = fs.createWriteStream(logPath, {flags : 'w'})

    console.log = (d) => {
        const consoleOutput = `${util.format(d)}\n`
        const consoleLogOutput = stripAnsi(consoleOutput)

        log_stdout.write(consoleOutput)
        log_file.write(consoleLogOutput)
    }

    console.error = console.log
}

export function logError (message) {
    console.log(`${getLevel('error')} ${getTimeStamp()} ${util.format(message)}`.red)
}

export function logSuccess(message) {
    console.log(`${getLevel('info')} ${getTimeStamp()} ${util.format(message)}`.green)
}

export function logRegular(message) {
    console.log(`${getLevel('info')} ${getTimeStamp()} ${util.format(message)}`.white)
}

export function logNotice(message) {
    console.log(`${getLevel('info')} ${getTimeStamp()} ${util.format(message)}`.magenta)
}

export function logWarn(message) {
    console.log(`${getLevel('warn')} ${getTimeStamp()} ${util.format(message)}`.yellow)
}

export function logEmpty() { console.log('') }

function getLevel(level: string) {
    return `[${level}]`.grey
}

function getTimeStamp() {
    const date = new Date()
    return `[${date.toISOString()}]`.grey
}