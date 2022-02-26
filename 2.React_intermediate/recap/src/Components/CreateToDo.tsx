import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {categoryState, toDoState} from "../atoms";

interface IForm{
    toDo:string;
}

function CreateToDo(){
    const setToDos=useSetRecoilState(toDoState);
    const category=useRecoilValue(categoryState);
    const {register, handleSubmit, setValue}=useForm<IForm>();
    const onValid=({toDo}:IForm)=>{
        setToDos((oldToDos)=>[
            {text:toDo, id:Date.now(), category:category},
            ...oldToDos,
        ]);
        setValue("toDo","");
    };
    
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input 
             {...register("toDo",{
             required:"Please write",
            })}
            placeholder="write a todo"
            />

            <button>Add</button>
        </form>
    );
}

export default CreateToDo;