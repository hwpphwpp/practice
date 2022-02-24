import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps{
    coinId:string;
}

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

function Chart({coinId}:ChartProps) {
    const {isLoading,data}=useQuery<IHistorical[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId));
    return (
        <div>
          {isLoading ? (
            "Loading chart..."
          ) : (
            <ApexChart
              type="line"
              series={[ //보내고싶은data
                {
                  name: "Price",
                  data: data?.map((price) => price.close),//close(종가)값으로만 구성된 array로 map하기
                },
              ]}
              options={{
                theme: {
                  mode: "dark",
                },
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: {
                    show: false,
                  },
                  background: "transparent",
                },
                grid: { show: false },
                stroke: {
                  curve: "smooth",
                  width: 4,
                },
                yaxis: {
                  show: false,
                },
                xaxis: {
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                },
              }}
            />
          )}
        </div>
      );
    }
    
    export default Chart;