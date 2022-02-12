import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";


const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDragabbleCardProps{
    toDo:string;
    index:number
}

function DragabbleCard({toDo, index}:IDragabbleCardProps){
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}> 
        {/* key와 draggableId는 같아야한다 (beautiful dnd규칙) */}
          {(magic) => (
            <Card
              ref={magic.innerRef}
              {...magic.dragHandleProps}
              {...magic.draggableProps}
            >
              {toDo}
            </Card>
          )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard); //prop이 같다면 리렌더링되는 것을 방지한다.