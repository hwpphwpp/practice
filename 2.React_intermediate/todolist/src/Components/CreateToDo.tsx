import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState); 
  const category=useRecoilValue(categoryState); //현재 카테고리 상태 가져오기 
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [ //함수를 set할 때는 함수의 리턴값이 새로운 state가 된다. 이전의배열(oldToDos) 을 받아서 
      { text: toDo, id: Date.now(), category: category },//새로운todo 배열을 oldToDos에 추가해서 '새로운 배열'을 만듬
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { //register함수는 form에 있는 모든 input에서 호출 
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;