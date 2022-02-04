import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />//toDos배열의 toDo원소 하나하나가 ToDo 컴포넌트에 필요한 props와 같은 모양이기 때문
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;