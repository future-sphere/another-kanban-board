import React from 'react';
import { Todos } from '../interfaces';

type Props = {
  title: string;
  backgroundColor: string;
  todos: Todos;
  columnIndex: number;
  handleAddTodo: (input: string, index: number) => void;
  handlePrev: (colIndex: number, todoIndex: number) => void;
  handleNext: (colIndex: number, todoIndex: number) => void;
  handleDelete: (colIndex: number, todoIndex: number) => void;
  handleEditToggle: (colIndex: number, todoIndex: number) => void;
  handleEditInputChange: (
    colIndex: number,
    todoIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleEditSave: (colIndex: number, todoIndex: number) => void;
};

const Column = ({
  title,
  backgroundColor,
  todos,
  handleAddTodo,
  columnIndex,
  handlePrev,
  handleNext,
  handleDelete,
  handleEditToggle,
  handleEditInputChange,
  handleEditSave,
}: Props) => {
  const [input, setInput] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <div style={{ backgroundColor }}>
        <h1>{title}</h1>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <>
                <button onClick={() => handlePrev(columnIndex, index)}>
                  prev
                </button>
                {todo.editable ? (
                  <input
                    onChange={(e) =>
                      handleEditInputChange(columnIndex, index, e)
                    }
                    value={todo.editInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditSave(columnIndex, index);
                      }
                    }}
                  />
                ) : (
                  todo.text
                )}
                <button onClick={() => handleNext(columnIndex, index)}>
                  next
                </button>
                <button onClick={() => handleEditToggle(columnIndex, index)}>
                  edit
                </button>
                <button onClick={() => handleDelete(columnIndex, index)}>
                  delete
                </button>
              </>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input type='text' value={input} onChange={handleChange} />
        <button
          onClick={() => {
            handleAddTodo(input, columnIndex);
            setInput('');
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Column;
