import {Table} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {Capitalize} from "../../utils.js";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
];

export function AssetsTable() {
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const {assets} = useCrypto()
    const data = assets.map(asset=>({
        key: asset.id,
        name: Capitalize(asset.id),
        price: asset.price,
        amount: asset.amount
    }))

    return (
        <Table pagination={false} columns={columns} dataSource={data} />
    )
}