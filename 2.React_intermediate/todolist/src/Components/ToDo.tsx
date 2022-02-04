import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos=>{
        const targetIndex=oldToDos.findIndex(toDo=>toDo.id===id) //조건을 만족하는 index를 찾아옴. toDo의 id와 props에서 오는 id가 같은지 비교
        const oldToDo=oldToDos[targetIndex];
        const newToDo={text, id, category:name}; //caterogy는 props에서 온 것을 그대로 쓸 수 없고 클릭된 button의 카테고리를 가져옴
        console.log(
            "replace the to do in the index",
            targetIndex,
            "with",
            newToDo);
        return oldToDos;
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


