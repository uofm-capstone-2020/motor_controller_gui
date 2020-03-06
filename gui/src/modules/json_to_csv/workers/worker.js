import { homedir } from "os";
import { mkdir, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path"

onmessage = function(message) {
    const {data} = message
    const {json, outFile} = data
    const logDir = join(homedir(), 'Motor_Controller_Logs')
    !existsSync(logDir) && mkdirSync(logDir)
    const oPath = join(logDir, outFile)
    const keys = Object.keys(json)
    const nKeys = keys.length
    const max = Math.max(...Object.values(json).map(v => v.length))
    const outArr = new Array(max + 1).fill("0").map(() => new Array(nKeys).fill("0"));
    outArr[0] = keys
    Object.values(json).forEach((val, idx) => {
        val.forEach((v, i) => {
            outArr[i+1][idx] = v
        })
    })
    outArr.slice(1).forEach(row => row[0] = '\n' + row[0])
    writeFileSync(oPath, outArr)
    postMessage(oPath);
}