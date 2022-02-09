import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}> 
  {/* 유저가 드래그를 끝냈을 때 실행되는 필수 함수 onDragEnd */}
      <div>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index={0}>
                {() => <li>One</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {() => <li>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App; 