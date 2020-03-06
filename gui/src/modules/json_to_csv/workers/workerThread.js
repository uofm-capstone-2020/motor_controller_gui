import Worker from 'worker-loader!./worker.js';
export default async function runWorker({json, outFile}) {
  return new Promise((resolve, reject) => {
    const worker = new Worker();
    worker.onmessage = ({data}) => {
      resolve(data)
      worker.terminate()
    }
    worker.onerror = (err) => reject(err)
    worker.postMessage({json, outFile})
  })
}