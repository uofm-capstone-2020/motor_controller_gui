import Serialport, { parsers } from 'serialport'

const serialport: typeof Serialport = (window as any).require('serialport')
const Delimiter: typeof parsers.Delimiter = (window as any).require('@serialport/parser-delimiter')

type CreateProps = {
    path: string;
    baud: number;
    onOpen: () => void;
    onClose: () => void;
    onData: (data: string | Buffer) => void
}

export default class Serial {
    sp: Serialport
    onClose: () => void;
    parser: parsers.Delimiter;

    constructor({path, onOpen, onClose, onData, baud}: CreateProps) {
        try{
        const port = new serialport(path, {baudRate: baud, autoOpen: false})
        port.on('open', onOpen)
        port.on('close', onClose)
        this.parser = port.pipe(new Delimiter({ delimiter: '!!!!' }))
        this.parser.on('data', onData)
        this.sp = port;
        this.onClose = onClose;
        }
        catch{
            onClose()
        }
    }

    isOpen(){
        return this.sp.isOpen
    }

    open(){
        this.sp.open((err) => err && setTimeout(this.onClose, 1000))
    }

    close(){
        this.sp.close()
    }

    write(data: number[]) {
        this.sp.drain()
        for(let i = 0; i < data.length; i += 4){
            this.sp.write(data.slice(i, i+4))
        }
    }

    attachListener(dataHandler: (data: string | Buffer) => void){
        this.parser.on('data', dataHandler)
        console.log("Attaching...")
        console.log(this.parser.listeners('data'))
    }

    detachListener(dataHandler: (data: string | Buffer) => void){
        this.parser.removeListener('data', dataHandler)
        console.log("Detaching...")
        console.log(this.parser.listeners('data'))
    }

    _emit(msg: string | Buffer){
        this.sp.emit('data', msg)
    }
}

export async function list() {
    return await serialport.list()
}

export function IntTo16Bit(i: number) {
    var buf = new ArrayBuffer(2);
    new DataView(buf).setInt16(0, i)
    return Array.from(new Uint8Array(buf))
}

export function IntTo32Bit(i: number) {
    var buf = new ArrayBuffer(4);
    new DataView(buf).setInt32(0, i)
    return Array.from(new Uint8Array(buf))
}

export function FloatTo32Bit(f: number) {
    var buf = new ArrayBuffer(4)
    new DataView(buf).setFloat32(0, f)
    return Array.from(new Uint8Array(buf))
}

export function _32BitToFloat(data: Buffer) {
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    for(var i = 0; i < data.length; i++){
        const b = data[3 - i];
        view.setUint8(i, b);
    }
    return view.getFloat32(0);
}

export function _32BitToInt(data: Buffer) {
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    for(var i = 0; i < data.length; i++){
        const b = data[3-i];
        view.setUint8(i, b);
    }
    return view.getInt32(0);
}