import React, { useState } from "react";

function App() {
  const [value,setValue]=useState("")  
  const onChange=(event:React.FormEvent<HTMLInputElement>)=>{
    const{
      currentTarget:{value}, //currentTarget의 value얻어옴 
    }=event;
    setValue(value); //얻어온 value로 set
  }; 
  //타입스크립트는 이 onChange 함수가 InputElement에 의해서 실행될 것을 안다. 

  const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log("hello,"+value);
  };
  return (
  <div> 
    <form onSubmit={onSubmit}>
    <input value={value} 
    onChange={onChange}
    type="text"placeholder="username" />
    <button>Log in</button> 
    </form>

  </div>);
}

export default App;