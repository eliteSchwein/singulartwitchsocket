import {mergeDeep} from "../helper/DataHelper";
import {get} from 'lodash'
import * as util from "util";
import * as fs from "fs";
import * as path from "path";
import {logSuccess} from "../helper/LoggerHelper";

const cacheData:any = {
    'sessions': {},
    'websockets': {}
}

const writeFile = util.promisify(fs.writeFile)

export function setData(key:string, value:any) {
    cacheData[key] = value
}

export function updateData(key:string, value:any) {
    cacheData[key] = mergeDeep(cacheData[key], value);
}

export function getEntry(key:string) {
    return cacheData[key]
}

export function findValue(key:string) {
    return get(cacheData, key)
}


export async function dumpCache() {
    void await writeDump()
    return cacheData
}

async function writeDump() {
    await writeFile(path.resolve(__dirname, '../../cache_dump.json'), JSON.stringify(cacheData, null, 4), { encoding: 'utf8', flag: 'w+' })
    logSuccess('Dumped Cache!')
}
