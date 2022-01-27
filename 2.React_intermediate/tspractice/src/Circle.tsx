import styled from "styled-components";

interface ContainerPops{
    bgColor:string;
    borderColor:string;
}

const Container=styled.div<ContainerPops>`
    width:200px;
    height:200px;
    background-color:${(props)=>props.bgColor};
    border-radius:100px;
    border:2px solid ${props=>props.borderColor};
`;

interface CircleProps{
    bgColor:string;
    borderColor?: string;
    text?:string;
}

function Circle({bgColor, borderColor, text="default text"}:CircleProps){
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
        </Container>;
}

export default Circle;