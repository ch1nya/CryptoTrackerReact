import {createContext, useContext, useEffect, useState} from "react";
import {fakeFetchCryptoData, fetchCryptoAssets} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets:[],
    crypto:[],
    loading: false
})



export function CryptoContextProvider({children}){
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets,result){
        return assets.map(asset=>{
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                ...asset,
            }
        })

    }

    function addAsset(newAsset){
        setAssets((prev)=>mapAssets([...prev,newAsset],crypto))
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCryptoData()
            const assets = await fetchCryptoAssets()
            setAssets(mapAssets(assets,result))
            setCrypto(result)
            setLoading(false)
        }

        preload()
    }, [])
    return <CryptoContext.Provider value={{loading,crypto, assets,addAsset }}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto(){
    return useContext(CryptoContext)
}