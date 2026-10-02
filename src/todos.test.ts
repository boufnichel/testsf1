import { describe, expect, it } from 'vitest'
import { addTodo, removeTodo, toggleTodo, type Todo } from './todos'

const sample: Todo[] = [
  { id: 'a', text: 'Buy milk', done: false, createdAt: 1 },
  { id: 'b', text: 'Walk dog', done: true, createdAt: 2 },
]

describe('addTodo', () => {
  it('appends a new, not-done todo with trimmed text', () => {
    const result = addTodo(sample, '  Write tests  ')

    expect(result).toHaveLength(3)
    expect(result.slice(0, 2)).toEqual(sample)
    const added = result[2]
    expect(added.text).toBe('Write tests')
    expect(added.done).toBe(false)
    expect(typeof added.id).toBe('string')
    expect(added.id).not.toBe('')
    expect(typeof added.createdAt).toBe('number')
  })

  it('gives each todo a unique id', () => {
    const result = addTodo(addTodo([], 'one'), 'two')

    expect(result[0].id).not.toBe(result[1].id)
  })

  it('does not mutate the input list', () => {
    const list = [...sample]
    addTodo(list, 'New')

    expect(list).toEqual(sample)
  })

  it.each(['', '   ', '\t\n'])(
    'returns the list unchanged for empty text %j',
    (text) => {
      expect(addTodo(sample, text)).toBe(sample)
    },
  )
})

describe('toggleTodo', () => {
  it('flips done for the matching todo only', () => {
    const result = toggleTodo(sample, 'a')

    expect(result[0].done).toBe(true)
    expect(result[1]).toBe(sample[1])
    expect(sample[0].done).toBe(false)
  })

  it('toggles back to not done', () => {
    expect(toggleTodo(sample, 'b')[1].done).toBe(false)
  })

  it('leaves the list unchanged for an unknown id', () => {
    expect(toggleTodo(sample, 'missing')).toEqual(sample)
  })
})

describe('removeTodo', () => {
  it('removes the matching todo', () => {
    expect(removeTodo(sample, 'a')).toEqual([sample[1]])
    expect(sample).toHaveLength(2)
  })

  it('leaves the list unchanged for an unknown id', () => {
    expect(removeTodo(sample, 'missing')).toEqual(sample)
  })
})
