import { _32BitToFloat, _32BitToInt } from "./serial";
import json_to_csv from "./json_to_csv/json_to_csv";
import { parseFaults } from "./faults";

const log: {[key: string]: string[]} = {}

export function parse_log_message(data: string | Buffer, callback?: () => void){
    let idx = 0;
    if(data[0] === 0x11){
        for(let i = 1; i < data.length; i = i + 4){
            try{
                const param = id_to_param[idx++]
                if (param === 'faults'){
                    const value = _32BitToInt(data.slice(i, i+4) as Buffer)
                    parseFaults(value)
                }
                else {
                    const value = _32BitToFloat(data.slice(i,i+4) as Buffer)
                    if(Object.keys(log).includes(param)){
                        log[param].push(value.toString())
                    }
                    else{
                        log[param] = [value.toString()]
                    }  
                }
            }
            catch(error){
                console.log(error)
            }
        }
    }
    callback && callback()
}

export function get_fields(){
    return Object.keys(log);
}

export function get_log(field: string | null){
    return field && field !== 'faults' ? 
        log[field].slice(Math.max(0, log[field].length - 6000), log[field].length) : 
        [];
}

export function clear_log(){
    for (const prop of Object.getOwnPropertyNames(log)) {
        delete log[prop];
    }
}

export async function save_log(){
    Object.keys(log).length > 0 && await json_to_csv(log, getTimestamp() + '.csv')
}

function getTimestamp(){
    let currentdate = new Date();
    let month = (currentdate.getMonth() + 1).toString()
        month = month.length < 2 ? "0" + month : month
    let day = currentdate.getDate().toString()
        day = day.length < 2 ? "0" + day : day
    let minutes = currentdate.getMinutes().toString()
        minutes = minutes.length < 2 ? "0" + minutes : minutes
    let  seconds = currentdate.getSeconds().toString()
        seconds = seconds.length < 2 ? "0" + seconds : minutes
    const datetime = currentdate.getFullYear() + "_"
        + month  + "_" 
        + day + "-"  
        + currentdate.getHours() + "_" 
        + minutes + "_" 
        + seconds;
    return datetime
}

const id_to_param = [
    "id_ref",
    "iq_ref",
    "id",
    "iq",
    "Vdc",
    "vd_ref",
    "vq_ref",
    "TqRef",
    "TqLim",
    "TqRequest",
    "rpm",
    "motorTemp",
    "igbtTemp",
    "power",
    "faults",
    "ia",
    "ib",
    "ic",
    "theta",
]