import { atom, selector } from "recoil";

interface IToDoState {
    [key: string]:string[];
}

export const toDoState = atom<IToDoState>({
    key:"toDo",
    default: { //object는 각각의 보드가 가질 id를 포함
        to_do:["a", "b", "c", "d", "e", "f"],
        doing: [],
        done:[], 

    },
})