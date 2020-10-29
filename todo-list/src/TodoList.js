import React from 'react'

export default function TodoList({todoList, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todoList.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todoList.completed} onChange={handleTodoClick}/>
                {todoList.name}
            </label>
        </div>
    )
}
