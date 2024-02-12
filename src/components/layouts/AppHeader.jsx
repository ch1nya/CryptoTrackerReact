import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CoinInfoModel from "../CoinInfoModel";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'white'
};



export function AppHeader() {
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer, setDrawer] = useState(true);

    const {crypto} = useCrypto()
    const handleSelect = (value) => {
        setCoin(crypto.find((c)=>c.id===value))
        setModal(true)
    }

    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => {
            document.removeEventListener('keypress', keypress)
        }
    }, []);


    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250',
                }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
                optionLabelProp="label"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>{' '}
                        {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={()=>{setDrawer(true)}}>Add asset</Button>
            <Modal
                   open={modal}
                   onOk={()=>{setModal(false)}}
                   onCancel={()=>{setModal(false)}}
                   footer = {null}>
                <CoinInfoModel
                coin={coin}/>
            </Modal>
        <Drawer
                width={700}
                title="Add Assets"
                onClose={()=>setDrawer(false)}
                open={drawer}
                destroyOnClose={true}

        >
            <AddAssetForm onClose={()=>setDrawer(false)}/>
        </Drawer>
        </Layout.Header>
    )
}