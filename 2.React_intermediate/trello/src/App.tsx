import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
 
function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}> 
  {/* 유저가 드래그를 끝냈을 때 실행되는 필수 함수 onDragEnd */}
      <div>
        <Droppable droppableId="one">
          {(magic) => ( //droppable에서 주는 첫번째 argument-> provided
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => 
                <li ref={magic.innerRef} {...magic.draggableProps}>
                <span {...magic.dragHandleProps}>🔥</span>
                One</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(magic) => <li ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App; 