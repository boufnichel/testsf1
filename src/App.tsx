import { useEffect, useState, type FormEvent } from 'react'
import './App.css'
import { loadTodos, saveTodos } from './storage'
import { addTodo, removeTodo, toggleTodo, type Todo } from './todos'

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [text, setText] = useState('')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTodos((list) => addTodo(list, text))
    setText('')
  }

  return (
    <main className="app">
      <h1>Todos</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="new-todo">New todo</label>
        <div className="todo-form-row">
          <input
            id="new-todo"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            autoComplete="off"
          />
          <button type="submit">Add</button>
        </div>
      </form>

      {todos.length === 0 ? (
        <p className="empty">Nothing to do</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? 'todo done' : 'todo'}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => setTodos((list) => toggleTodo(list, todo.id))}
                  aria-label={`Mark "${todo.text}" as done`}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                type="button"
                className="delete"
                onClick={() => setTodos((list) => removeTodo(list, todo.id))}
                aria-label={`Delete "${todo.text}"`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
