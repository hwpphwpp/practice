import React, { useState } from "react";
import Circle from "./Circle";
    

function App(){
  const [value,setValue]=useState("");
  const onChange=(event: React.FormEvent<HTMLInputElement>)=>{
    const{
      currentTarget: {value},
    }=event;
    setValue(value);
  };
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  return( 
    <div>
      <form onSubmit={onSubmit}>
      <input value={value} onChange={onChange} type="text" placeholder="username">
      </input>
      <button>Login</button>

      </form>
    </div>  
  );
}
export default App;