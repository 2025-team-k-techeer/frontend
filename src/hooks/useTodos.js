// src/hooks/useTodos.js
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export function useTodos() {
  return useContext(TodoContext);
}
