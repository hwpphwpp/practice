import React from "react";
import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDo, doing, done]=useRecoilValue(toDoSelector);
  const onInput=(event:React.FormEvent<HTMLSelectElement>)=>{
    console.log(event.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput}>
        <option value="TO_DO">To DO</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo /> 

    </div>
  );
}

export default ToDoList;