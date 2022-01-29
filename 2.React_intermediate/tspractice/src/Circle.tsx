import styled from "styled-components";
import {useState} from "react";

interface ContainerProps{ //objet를 설명하고, 보호한다
    bgColor:string;
    borderColor:string; //required
}

const Container = styled.div<ContainerProps>`
    width:200px;
    height:200px;
    background-color: ${(props)=>props.bgColor};
    border-radius:100px;
    border:1px solid ${(props)=>props.borderColor}
`;

interface CircleProps {
    bgColor:string;
    borderColor?:string; //optional
    text?:string;
}

function Circle({bgColor, borderColor,text="default text"} :CircleProps){//borderColor가 undefined일 때 byColor와 같은값을 가진다
    const [value,setValue]=useState(0);
    return<Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
    </Container>;
}

export default Circle;