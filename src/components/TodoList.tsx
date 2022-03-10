import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import "../styles.css";
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completed: Todo[];
    setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ 
  todos, 
  setTodos, 
  completed, 
  setCompleted
 }: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="todosList">
        {
          (provided, snapshot) => (
            <div 
              className={`todos ${snapshot.isDraggingOver?"dragactive":""}`} 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Todos</span>
              {todos.map((todo, index) => {
                return (
                  <SingleTodo 
                    index={index}
                    todo={todo} 
                    todos={todos} 
                    setTodos={setTodos} 
                    key={todo.id} 
                    completed={completed}
                    setCompleted={setCompleted}
                    isCompleted={false}
                  />
                )})
              }
              {provided.placeholder}
            </div>
          )
        }

      </Droppable>
      <Droppable droppableId="completedTodosList">
        {
          (provided,snapshot) => (
            <div 
            className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`} 
            ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Todos</span>
              {completed.map((todo, index) => {
                return (
                  <SingleTodo 
                    index={index}
                    todo={todo} 
                    todos={todos} 
                    setTodos={setTodos} 
                    key={todo.id} 
                    completed={completed}
                    setCompleted={setCompleted}
                    isCompleted
                  />
                  );
              })
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>

    </div>
  )
}

export default TodoList
