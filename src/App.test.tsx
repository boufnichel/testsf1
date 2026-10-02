import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

function addViaButton(text: string) {
  fireEvent.change(screen.getByLabelText('New todo'), {
    target: { value: text },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Add' }))
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the Todos heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Todos' }),
    ).toBeInTheDocument()
  })

  it('shows "Nothing to do" when the list is empty', () => {
    render(<App />)

    expect(screen.getByText('Nothing to do')).toBeInTheDocument()
  })

  it('adds a todo with the Add button and clears the input', () => {
    render(<App />)

    addViaButton('Buy milk')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByLabelText('New todo')).toHaveValue('')
    expect(screen.queryByText('Nothing to do')).not.toBeInTheDocument()
  })

  it('adds a todo when pressing Enter (form submit)', () => {
    render(<App />)
    const input = screen.getByLabelText('New todo')

    fireEvent.change(input, { target: { value: 'Walk dog' } })
    fireEvent.submit(input)

    expect(screen.getByText('Walk dog')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('ignores empty and whitespace-only input', () => {
    render(<App />)

    addViaButton('')
    addViaButton('   ')

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText('Nothing to do')).toBeInTheDocument()
  })

  it('toggles a todo done and not done', () => {
    render(<App />)
    addViaButton('Buy milk')

    const checkbox = screen.getByRole('checkbox', { name: /Buy milk/ })
    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(screen.getByRole('listitem')).toHaveClass('done')

    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(screen.getByRole('listitem')).not.toHaveClass('done')
  })

  it('deletes a todo', () => {
    render(<App />)
    addViaButton('Buy milk')
    addViaButton('Walk dog')

    fireEvent.click(screen.getByRole('button', { name: /Delete.*Buy milk/ }))

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
    expect(screen.getByText('Walk dog')).toBeInTheDocument()
  })

  it('keeps todos after a re-mount', () => {
    const { unmount } = render(<App />)
    addViaButton('Buy milk')
    addViaButton('Walk dog')
    fireEvent.click(screen.getByRole('checkbox', { name: /Walk dog/ }))
    unmount()

    render(<App />)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Buy milk/ })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: /Walk dog/ })).toBeChecked()
  })

  it('does not crash when stored data is corrupt', () => {
    localStorage.setItem('todos.v1', '{not valid json')

    render(<App />)

    expect(screen.getByText('Nothing to do')).toBeInTheDocument()
  })
})
