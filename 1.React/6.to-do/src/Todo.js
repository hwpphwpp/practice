import {useState} from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) =>setToDo(event.target.value);
  const onSubmit=(event)=>{
    event.preventDefault();
    if(toDo===""){ //toDo가 비어있다면 함수를 작동하지 않도록
      return;
    }
    setToDos(currentArray=>[toDo, ...currentArray]);
    setToDo(""); //blank input 
  };
  console.log(toDos);
  return (
   <div>
     <h1>My TO DO ({toDos.length})</h1>
   <form onSubmit={onSubmit}>
        <input
        onChange={onChange}
        value={toDo}
        type="text"
        placeholder="write your do to.."
        ></input>
        <button>Add to do</button> 
   </form>
   <hr/>
   <ul>
     {toDos.map((item,index)=>
     <li key={index}>{item}</li>
     )}
   </ul>
   </div>
     
  );
}

export default App;
