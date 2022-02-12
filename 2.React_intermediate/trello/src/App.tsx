import { DragDropContext, Droppable, Draggable,DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const [toDos, setToDos]=useRecoilState(toDoState); 
  const onDragEnd = ({ draggableId, destination, source}:DropResult) => {
    //source: array에서 움직이고 싶은 item의 index, droppableId 제공
    //새롭게 수정된 배열 return해줌
    if(!destination) return; //이동하지 않고 제자리에 둘 경우 그대로 리턴 
    setToDos(oldToDos=>{
      const copyToDos = [...oldToDos]; //이전의 배열 copy (복사본 만들기)
      //step1. source.index에서 아이템 삭제하기 
      copyToDos.splice(source.index, 1)
      //step2. destination.index로 item 돌려두기
      copyToDos.splice(destination?.index, 0, draggableId) //draggableId=abcd..
      return copyToDos;
    })

  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
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
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;