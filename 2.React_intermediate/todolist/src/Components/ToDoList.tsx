import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);  //set하지않고 get만 하므로 useRecoilValue

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo /> 
      {/* recoil, atom의 사용으로 어떤 prop도 전달할 필요가없다. */}
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
          //toDos배열의 toDo원소 하나하나가 ToDo 컴포넌트에 필요한 props와 같은 모양이기 때문
          //map함수 내에서 item을 render할 때 key가 필요 
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;