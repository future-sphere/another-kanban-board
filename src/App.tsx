import React from 'react';
import logo from './logo.svg';
import './App.css';
import Column from './components/Column';
import { IColumn } from './interfaces';

const initialState = [
  {
    title: 'Todo',
    backgroundColor: 'red',
    todos: [
      { text: 'Learn React', editable: false },
      { text: 'Learn TypeScript', editable: false },
      { text: 'Learn Redux', editable: false },
    ],
  },
  {
    title: 'In Progress',
    backgroundColor: 'green',
    todos: [
      { text: 'Learn React', editable: false },
      { text: 'Learn TypeScript', editable: false },
      { text: 'Learn Redux', editable: false },
    ],
  },
  {
    title: 'Done',
    backgroundColor: 'blue',
    todos: [
      { text: 'Learn React', editable: false },
      { text: 'Learn TypeScript', editable: false },
      { text: 'Learn Redux', editable: false },
    ],
  },
  {
    title: 'Review',
    backgroundColor: 'orange',
    todos: [
      { text: 'Learn React', editable: false },
      { text: 'Learn TypeScript', editable: false },
      { text: 'Learn Redux', editable: false },
    ],
  },
];

function App() {
  const [data, setData] = React.useState<IColumn[]>(initialState);

  const handleAddTodo = (input: string, index: number) => {
    const nextData = [...data];
    nextData[index].todos.push({ text: input, editable: false });
    setData(nextData);
  };

  const handlePrev = (colIndex: number, todoIndex: number) => {
    const nextData = [...data];
    if (colIndex > 0) {
      nextData[colIndex - 1].todos.push(
        nextData[colIndex].todos.splice(todoIndex, 1)[0],
      );
    }
    setData(nextData);
  };

  const handleNext = (colIndex: number, todoIndex: number) => {
    const nextData = [...data];
    if (colIndex < data.length - 1) {
      nextData[colIndex + 1].todos.push(
        nextData[colIndex].todos.splice(todoIndex, 1)[0],
      );
    }
    setData(nextData);
  };

  const handleDelete = (colIndex: number, todoIndex: number) => {
    const nextData = [...data];
    nextData[colIndex].todos.splice(todoIndex, 1);
    setData(nextData);
  };

  const handleEditToggle = (colIndex: number, todoIndex: number) => {
    const nextData = [...data];
    const currentTodo = nextData[colIndex].todos[todoIndex];

    currentTodo.editable = !currentTodo.editable;
    if (currentTodo.editable) {
      currentTodo.editInput = currentTodo.text;
    }
    setData(nextData);
  };

  const handleEditInputChange = (
    columnIndex: number,
    todoIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextData = [...data];
    nextData[columnIndex].todos[todoIndex].editInput = event.target.value;
    setData(nextData);
  };

  const handleEditSave = (columnIndex: number, todoIndex: number) => {
    const nextData = [...data];
    const currentTodo = nextData[columnIndex].todos[todoIndex];
    currentTodo.text = currentTodo.editInput as string;
    currentTodo.editInput = '';
    currentTodo.editable = false;
    setData(nextData);
  };

  return (
    <div>
      {data.map((column, index) => (
        <Column
          key={index}
          {...column}
          columnIndex={index}
          handleAddTodo={handleAddTodo}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleDelete={handleDelete}
          handleEditToggle={handleEditToggle}
          handleEditInputChange={handleEditInputChange}
          handleEditSave={handleEditSave}
        />
      ))}
    </div>
  );
}

export default App;
