import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) { //todo의 타입은 이미 만들었으므로 ITodo를 import함. 필요한propt(text..)도 받아줌 
  const setToDos = useSetRecoilState(toDoState); //카테고리를 변경(set)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => { //버튼에서 발생한 event를 get
    const {
      currentTarget: { name },//currentTarget을 grab해서 event를 발생시킨 버튼의 name을 가져오기 
    } = event;
    setToDos((oldToDos)=>{
        const targetIndex=oldToDos.findIndex(toDo=>toDo.id===id) 
        //조건을 만족하는 index를 찾아옴. toDo의 id와 props에서 오는 id가 같은지 비교
        const oldToDo=oldToDos[targetIndex];
        const newToDo={text, id, category:name as any}; //caterogy는 props에서 온 것을 그대로 쓸 수 없고 클릭된 button의 카테고리를 가져옴
        return [...oldToDos.slice(0,targetIndex),newToDo,...oldToDos.slice(targetIndex+1),]; //바뀐 카테고리값으로 배열을 replace하기
    })

};
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;


