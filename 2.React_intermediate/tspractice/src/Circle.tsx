import styled from "styled-components";

interface ContainerPops{
    bgColor:string;
}

const Container=styled.div<ContainerPops>`
    width:200px;
    height:200px;
    background-color:${(props)=>props.bgColor};
    border-radius:100px;
`;

interface CircleProps{
    bgColor:string;
}
function Circle({bgColor}:CircleProps){
    return <Container bgColor={bgColor}/>;
}

export default Circle;