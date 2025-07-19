import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import TodoContext from './TodoContext';

export function TodoProvider({ children }) {
  const { user, isLoggedIn } = useAuth();
  const [todos, setTodos] = useState([]);

  const loadTodosForUser = useCallback((userId) => {
    const storedData = localStorage.getItem('todoData');
    if (!storedData) return [];
    try {
      const parsed = JSON.parse(storedData);
      return parsed[userId] || [];
    } catch (error) {
      console.error('Failed to parse todoData:', error);
      return [];
    }
  }, []);

  const saveTodosForUser = useCallback((userId, updatedTodos) => {
    const storedData = localStorage.getItem('todoData');
    let parsed = {};
    if (storedData) {
      try {
        parsed = JSON.parse(storedData);
      } catch (error) {
        console.error('Failed to parse todoData:', error);
      }
    }
    parsed[userId] = updatedTodos;
    localStorage.setItem('todoData', JSON.stringify(parsed));
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      setTodos(loadTodosForUser(user.id));
    } else {
      setTodos([]);
    }
  }, [isLoggedIn, user?.id, loadTodosForUser]);

  const addTodo = (text) => {
    if (!isLoggedIn) return;
    const newTodo = { id: Date.now(), text, done: false };
    const updated = [...todos, newTodo];
    setTodos(updated);
    saveTodosForUser(user.id, updated);
  };

  const toggleTodo = (id) => {
    if (!isLoggedIn) return;
    const updated = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(updated);
    saveTodosForUser(user.id, updated);
  };

  const removeTodo = (id) => {
    if (!isLoggedIn) return;
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    saveTodosForUser(user.id, updated);
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
