import {cryptoData, cryptoAssets} from "./data.js";

export function fakeFetchCryptoData(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cryptoData)
        },10)
    })
}export function fetchCryptoAssets(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cryptoAssets)
        },10)
    })
}