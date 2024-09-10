import List from '@mui/material/List';
import Todo from './TodoItem';
import TodoForm from './TodoForm';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from "react";

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (!data) return [];
    return data;
};

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);

    // 부수적인 효과 실행 - 로컬스토리지에 todos를 문자열로 저장 
    // 새로고침했을 때, 로컬스토리지 내용을 불러와 데이터를 보존 가능   
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const removeTodo = ((id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((t) => t.id !== id);
        })
    })

    const toggleTodo = ((id) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else {
                    return todo;
                }
            })
        })
    })

    const addTodo = (text) => {
        setTodos(prevTodos => {
            return [...prevTodos, { text: text, id: crypto.randomUUID(), completed: false }]
        })
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column", 
                alignItems: 'center',
                m: 3,
            }}
        >
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map((todo) => {
                    return (
                        <Todo key={todo.id} todo={todo} removeTodo={() => removeTodo(todo.id)} toggleTodo={() => toggleTodo(todo.id)} />
                    )
                })}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    )
}

