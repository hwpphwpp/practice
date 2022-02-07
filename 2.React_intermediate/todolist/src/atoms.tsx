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
  
export const categoryState=atom({ //사용자가 현재 선택한 카테고리 
  key:"category",
  default:"TO_DO",
});


export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});