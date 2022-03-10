import React, { useRef } from "react";
import "../styles.css";

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
    // ref: React.RefObject<HTMLInputElement>;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleMouseOut = () => {
        inputRef.current?.blur();
    };
    return (
        <form className="input" onSubmit={(e: React.FormEvent) => handleAdd(e)}>
            <input type="input" 
                ref={inputRef}
                value={todo} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
                placeholder="Enter a task" 
                className="input__box" 
                onMouseOut={handleMouseOut}
            />
            <button className="input_submit" type="submit">Go</button>
        </form>
    )
};

export default InputField;
