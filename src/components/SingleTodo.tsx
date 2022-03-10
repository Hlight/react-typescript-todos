import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../styles.css";
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
    completed: Todo[];
    setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
    isCompleted: boolean;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index, completed, setCompleted, isCompleted }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        if (isCompleted) {
            setCompleted(completed.filter((todo) => todo.id !== id));
            setTodos([...todos, {...todo, isDone: false }])
        } else {
            setTodos(todos.filter((todo) => todo.id !== id));
            setCompleted([...completed, {...todo, isDone: true }]);
        }
    };
    const handleDelete = (id: number) => {
        if (isCompleted) {
            setCompleted(completed.filter((todo) => todo.id !== id));
        } else {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    };
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => 
            todo.id===id ? {...todo,todo:editTodo} : todo
        ));
        setEdit(false);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided,snapshot) => (
            <form 
                className={`todos__single${snapshot.isDragging?" drag":""}${todo.isDone?" done":""}`} 
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEdit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                { edit ? (
                    <input value={editTodo} onChange={(
                        e: React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target.value)} ref={inputRef} />
                ) : 
                todo.isDone ? (
                    <span className="todos__single--text done">{todo.todo}</span>
                ) : (
                    <span className="todos__single--text">{todo.todo}</span>
                )}
                <div>
                <span className="icon edit" onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit)
                    }
                }
                }><AiFillEdit /></span> 
                <span className="icon delete" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span> 
                <span className="icon done" onClick={() => handleDone(todo.id)}><MdDone /></span> 

                </div>
            
            </form>
        )}
    </Draggable>
  )
}

export default SingleTodo
