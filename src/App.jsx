import React from 'react';
import {Layout, Flex} from 'antd';
import {AppHeader} from "./components/layouts/AppHeader";
import {AppSider} from "./components/layouts/AppSider";
import {AppContent} from "./components/layouts/AppContent";
import {CryptoContextProvider} from "./context/crypto-context.jsx";
import {AppLayout} from "./components/layouts/AppLayout.jsx";


const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};

export default function App() {
    // return <h1>React Crypto App</h1>
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}
