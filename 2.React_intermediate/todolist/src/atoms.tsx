import { atom, selector } from "recoil";

export const toDoState=atom<IToDo[]>({
    key:"toDo",
    default:[],
  })


export interface IToDo{
    text:string;
    id:number;
    category:"TO_DO"|"DOING"|"DONE";
  }
  
export const categoryState=atom({
  key:"category",
  default:"TO_DO",
});

export const toDoSelector = selector({
  key:"toDoSelector",
  get:({get})=>{//get function으로 atom을 받는다
    const toDos=get(toDoState);
    return [
      toDos.filter((toDo)=>toDo.category==="TO_DO"),//카테고리TO_DO만 필터링하여 배열에 담기
      toDos.filter((toDo)=>toDo.category==="DOING"),
      toDos.filter((toDo)=>toDo.category==="DONE"),
  ]  
  }
})
