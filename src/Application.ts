import * as packageConfig from '../package.json'
import {enableLogger, logSuccess} from "./helper/LoggerHelper";

Object.assign(global, { WebSocket: require('ws') })

enableLogger()

logSuccess(`Starting ${packageConfig.name} ${packageConfig.version}...`)