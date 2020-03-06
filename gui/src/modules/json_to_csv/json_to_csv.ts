import runWorker from "./workers/workerThread";

export default async function json_to_csv(json: {[key: string]: string[]}, outFile: string){
    const hrstart = process.hrtime()
    const result = await runWorker({json, outFile})
    const hrend = process.hrtime(hrstart)
    process.env.NODE_ENV === 'development' && console.log(`Wrote ${result}.\nExecution time: ${hrend[0]}s, ${hrend[1] / 1000000}ms`)
}