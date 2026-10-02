import { beforeEach, describe, expect, it } from 'vitest'
import { loadTodos, saveTodos } from './storage'
import type { Todo } from './todos'

const sample: Todo[] = [
  { id: 'a', text: 'Buy milk', done: false, createdAt: 1 },
  { id: 'b', text: 'Walk dog', done: true, createdAt: 2 },
]

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty list when nothing is stored', () => {
    expect(loadTodos()).toEqual([])
  })

  it('loads the same list that was saved', () => {
    saveTodos(sample)

    expect(localStorage.getItem('todos.v1')).not.toBeNull()
    expect(loadTodos()).toEqual(sample)
  })

  it('returns an empty list for corrupt JSON', () => {
    localStorage.setItem('todos.v1', '{not valid json')

    expect(loadTodos()).toEqual([])
  })

  it('returns an empty list when the stored value is not an array', () => {
    localStorage.setItem('todos.v1', '{"id":"a"}')

    expect(loadTodos()).toEqual([])
  })

  it('drops stored entries that are not valid todos', () => {
    localStorage.setItem(
      'todos.v1',
      JSON.stringify([sample[0], null, { id: 'x' }, 'text']),
    )

    expect(loadTodos()).toEqual([sample[0]])
  })
})
