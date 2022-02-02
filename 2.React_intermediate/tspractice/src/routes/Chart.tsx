import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

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
    const isDark= useRecoilValue(isDarkAtom);
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
            mode: isDark ? "dark" : "light",
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
        xaxis:{labels:{show:false},
        type:"datetime",
                categories:data?.map((price)=>price.time_close)
          },
          fill:{type:"gradient", gradient:{gradientToColors:["blue"]},},
          colors:["red"],
          tooltip:{
              y:{
                  formatter:(value)=>`$ ${value.toFixed(2)}`,
              }
          }
    }}/>}</div>
}

export default Chart;
