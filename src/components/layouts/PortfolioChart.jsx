import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {useCrypto} from "../../context/crypto-context.jsx";
import {Capitalize} from "../../utils.js";

ChartJS.register(ArcElement, Tooltip, Legend);




export default function PortfolioChart() {
    const {assets} =useCrypto()
    const data = {
        labels: assets.map(asset=>Capitalize(asset.id)),
        datasets: [
            {
                label: 'Amount in $',
                data: assets.map((a)=>+(a.totalAmount)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],


                // borderColor: [
                //     'rgba(255, 99, 132, 0.8)',
                //     'rgba(54, 162, 235, 0.8)',
                //     'rgba(255, 206, 86, 0.8)',
                //     'rgba(75, 192, 192, 0.8)',
                //     'rgba(153, 102, 255, 0.8)',
                //     'rgba(255, 159, 64, 0.8)',
                // ],
                borderWidth: 2,
            },
        ],
    }
    return (
        <div style={{display:'flex',marginBottom:'1rem',justifyContent:'center',height:500}}>
            <Pie data={data}/>
        </div>
    )
}