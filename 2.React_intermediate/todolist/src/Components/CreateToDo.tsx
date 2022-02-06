import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm { //ts에게 form의 모양 전달
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState); //여기서는 get할 필요가없고 set만하므로 useSetRecoilState
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },//새로운todo 배열에 추가
      ...oldToDos,
    ]);
    setValue("toDo", ""); //submit 후 input창 비움
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;