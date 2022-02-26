import { atom, selector } from "recoil";

// type categories="TO_DO"|"DOING"|"DONE"

export enum Categories{
  "TO_DO"="TO_DO", //0
  "DOING"="DOING", //1
  "DONE"="DONE",  //2
}

export const toDoState=atom<IToDo[]>({
    key:"toDo",
    default:[],
  })


export interface IToDo{
    text:string;
    id:number;
    category:Categories;
  }
  
export const categoryState=atom<Categories>({ //사용자가 현재 선택한 카테고리 
  key:"category",
  default:Categories.TO_DO,
});


export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {//get function으로 atom을 받는다
    const toDos = get(toDoState);//모든toDo받기 
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});