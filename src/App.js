import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo) return;

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });

      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !completed,
      });

      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      );

      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      const filteredTodos = todos.filter(todo => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, todo.completed)}
            />
            <span className="todo-text">{todo.title}</span>
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
