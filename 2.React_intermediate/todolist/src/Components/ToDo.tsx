import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) { //todo의 타입은 이미 만들었으므로 ITodo를 import함. 필요한propt(text..)도 받아줌 
  const setToDos = useSetRecoilState(toDoState); //카테고리를 변경(set)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => { //버튼에서 발생한 event를 get
    const {
      currentTarget: { name },//currentTarget을 grab해서 event를 발생시킨 버튼의 name을 가져오기 
    } = event;
    setToDos((oldToDos)=>{
        const targetIndex=oldToDos.findIndex(toDo=>toDo.id===id) 
        //조건을 만족하는 index를 찾아옴. toDo의 id와 props에서 오는 id가 같은지 비교
        //const oldToDo=oldToDos[targetIndex];
        const newToDo={text, id, category:name as any}; //caterogy는 props에서 온 것을 그대로 쓸 수 없고 클릭된 button의 카테고리를 가져옴
        //as any는 ts에게 타입을 체크하지 않도록 한다
        return [//바뀐 카테고리값으로 배열을 replace하기
          ...oldToDos.slice(0,targetIndex), //back
          newToDo,
          ...oldToDos.slice(targetIndex+1),]; //front
    })

};
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && ( //카테고리가 DOING이 아닐 때만 DOING 버튼을 보여준다.
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;


