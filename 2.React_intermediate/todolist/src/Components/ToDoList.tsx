import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface ITodo{
  text:string;
  id:number;
  category:"TO_DO"|"DOING"|"DONE";
}

const toDoState=atom<ITodo[]>({
  key:"toDo",
  default:[],
})

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => {
    setToDos(oldToDos=>[{text:toDo, id:Date.now(), category:"TO_DO"},...oldToDos]);   
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>ToDos</h1> <hr/>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo=> <li key={toDo.id}>{toDo.text}</li>)} 
        {/* 각각의 toDo에 대해 li를 반환하고 key는 toDo.id를 사용  */}
      </ul>
    </div>
  );
}

export default ToDoList;