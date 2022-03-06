import {useRouter} from "react/router";

export default function Detail(){
    const router=useRouter();
    console.log(router);
    return "detail";
}