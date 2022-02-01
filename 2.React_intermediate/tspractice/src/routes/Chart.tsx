import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
  }

interface ChartProps{
    coinId:string; 
}

function Chart({coinId}:ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId], ()=> fetchCoinHistory(coinId));
    return <div>{isLoading?"loading chart..":
    <ApexChart 
    type="line" 
    series={[
        {
            name:"price",
            data:data?.map(price=>price.close) 
        },
    ]} //보낼 data
    options={{
        theme:{
            mode:"dark",
        },
        chart:{
            height:300,
            width:500,
            toolbar:{
                show:false,
            },
            background:"transparent",
        },
        grid:{show:false},
        stroke:{
            curve:"smooth",
            width:3,
        },
        yaxis:{show:false,},
        xaxis:{labels:{show:false},},
    }}/>}</div>
}

export default Chart;
