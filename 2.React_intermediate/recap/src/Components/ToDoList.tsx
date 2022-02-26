import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getEnabledCategories } from "trace_events";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList(){
const toDos=useRecoilValue(toDoSelector); 
//select 카테고리에 해당하는 toDo만 보여줌. 이건 recoil의 selector(atom.tsx)가 이미 걸러놓은 배열들 
const [category, setCategory]=useRecoilState(categoryState);//select 카테고리에 맞춰 새로운toDO를 생성하므로?
const onInput=(event:React.FormEvent<HTMLSelectElement>)=>{
    setCategory(event.currentTarget.value as any);
};


return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      
      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      
    </div>
  );
}

export default ToDoList;