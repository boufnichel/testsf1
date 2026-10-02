export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export function addTodo(list: Todo[], text: string): Todo[] {
  const trimmed = text.trim()
  if (trimmed === '') return list

  return [
    ...list,
    {
      id: crypto.randomUUID(),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    },
  ]
}

export function toggleTodo(list: Todo[], id: string): Todo[] {
  return list.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  )
}

export function removeTodo(list: Todo[], id: string): Todo[] {
  return list.filter((todo) => todo.id !== id)
}
