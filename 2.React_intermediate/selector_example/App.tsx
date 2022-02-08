import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours,setHours] = useRecoilState(hourSelector); // 인자는 selector를 [get,set]
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);//+은 string을 number로 변환 
  };
  const onHoursChange= (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input 
        value={hours} 
        onChange={onHoursChange}
        type="number" 
        placeholder="Hours" />
    </div>
  );
}

export default App;