import {Layout} from "antd";
import React from "react";
import Typography from "antd/es/typography/Typography.js";
import {useCrypto} from "../../context/crypto-context.jsx";
import PortfolioChart from "./PortfolioChart";
import {AssetsTable} from "./AssetsTable";
const contentStyle = {
    textAlign: 'center',
    minHeight: "calc(100vh - 60px)",
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};
export function AppContent() {
    const {crypto,assets} = useCrypto()

    const CryptoPriceMap = crypto.reduce((acc,c)=>{
        acc[c.id]=c.price
        return acc
    },{})
    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title
                level={3}
                style={{textAlign: 'left',color:"#fff"}}>
                Portfolio: {assets
                    .map((asset)=>asset.amount*CryptoPriceMap[asset.id])
                    .reduce((acc,v)=>(acc+=v),0)
                    .toFixed(2)}$
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
        </Layout.Content>
    )
}