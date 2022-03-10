import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
          return;
    }
    let add,
      activeTodos = [...todos],
      completeTodos = [...completed];
  
    if (source.droppableId==="todosList") {
      add=activeTodos[source.index];
      add.isDone = true;
      activeTodos.splice(source.index, 1);
    } else {
      add = completeTodos[source.index];
      add.isDone = false;
      completeTodos.splice(source.index, 1);
    }
    if (destination.droppableId==="todosList") {
      activeTodos.splice(destination.index, 0, add);
    } else {
      completeTodos.splice(destination.index, 0, add);
    }
    setCompleted(completeTodos);
    setTodos(activeTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} >
    <div className="app">
      <span className="heading">Taski</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList 
        todos={todos} 
        setTodos={setTodos} 
        completed={completed}
        setCompleted={setCompleted} 
      />
    </div>
    </DragDropContext>
  );
}

export default App;
