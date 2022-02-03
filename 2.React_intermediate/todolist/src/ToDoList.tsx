
import {useForm} from "react-hook-form";

function ToDoList(){
  const { register ,handleSubmit,formState } = useForm(); //handle~은 validation+precendDefault
  const onValid = (data:any) =>{//데이터가 유효하지 않다면 useForm이 에러를 보여줌, 이 함수는 모든 유효성검사를 마쳤을 때만 호출된다
    console.log(data);
  }; 
  console.log(formState.errors);
  return  (
        <div>
        <form 
            style={{display:"flex", flexDirection: "column"}} 
            onSubmit={handleSubmit(onValid)}>  {/* handle~이 받는 두 개의 인자-1.데이터가 유효할 때 호출되는 함수(필수) 2.~않을때~(필수X) */}
          <input {...register("email", { required: true })} placeholder="Email" />
          <input {...register("firstName", { required: true })} placeholder="First Name"/>
          <input {...register("lastName", { required: true })}placeholder="Last Name"/>
          <input {...register("username", { required: true, minLength: 10 })}placeholder="Username"/>
          <input {...register("password", { required: true, minLength: 5 })} placeholder="Password"/>
          <input {...register("password1", {required: "Password is required",minLength:{value: 5,
                message: "Your password is too short.",},})}placeholder="Password1"/>
        
         <button>Add</button>
        </form>
        </div>
      );
}

export default ToDoList;
