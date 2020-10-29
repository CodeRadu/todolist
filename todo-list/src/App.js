import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import {v4} from 'uuid'

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos, setTodos]=useState([])
  const todoNameRef=useRef()

  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos)setTodos(storedTodos)
  }, [])

  function toggleTodo(id){
    const newTodos=[...todos]
    const todo=newTodos.find(todo=>todo.id===id)
    todo.completed=!todo.completed
    setTodos(newTodos)
  }

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
    const name=todoNameRef.current.value
    if(name==='')return
    setTodos(prevTodos=>{
      return [...prevTodos, {id: v4(), name: name, completed: false}]
    })
    todoNameRef.current.value=null
  }

  function handleClearTodos(){
    const newTodos=todos.filter(todo=>!todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      {todos.map(todo=>{
        return <TodoList key={todo.id} todoList={todo} toggleTodo={toggleTodo}/>
      })}
      <input type="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>Add to do</button>
      <button onClick={handleClearTodos}>Clear completed</button>
      <div>{todos.filter(todo=>!todo.completed).length} left to do</div>
    </>
  )
}

export default App;
