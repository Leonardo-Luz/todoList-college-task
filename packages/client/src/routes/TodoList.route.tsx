import React, { useEffect, useState } from "react"
import "../styles/todoList.style.css"
import { apiUrl } from "../utils/apiUrl"

type todoElementProps = {
    todo: todo,
    checkHandler: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

type todoButtonProps = {
    createTodoHandler: (e: string) => void
}

type todo = {
    id: string,
    name: string,
    checked: boolean
}


const CreateTodoButton = ( { createTodoHandler }: todoButtonProps ) => {
    return (
        <label className="createTodo">
            <input type="text" id="name"/>
            <button
                type="button"
                onClick={() => {
                    const input = document.getElementById('name') as HTMLInputElement
                    createTodoHandler(input.value);
                    input.value = "";
                }}
            >
                Cadastrar
            </button>
        </label>
    )
}

const TodoElement = ( { checkHandler, todo }: todoElementProps) => {
    return(
        <label 
            key={todo.id}  
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                maxWidth: '1200px',
                justifyContent: 'space-between',
                overflowX: 'hidden'
            }}
        >
            {todo.name} 
            <input
                value={todo.id}
                key={todo.id}
                type="checkbox" 
                defaultChecked={todo.checked}
                onChange={(e) => checkHandler(e)}
            />
        </label>
    )
}

export const TodoList = () => {

    const [ listProgress, setListProgress ] = useState<todo[]>([]);
    const [ listComplete, setListComplete ] = useState<todo[]>([]);

    const createTodoHandler = (e: string) => {
        fetch(`${apiUrl}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e,
                checked: false
            })
        })
        .then( res => res.json()
        .then( (json) => {
            const newList = [
                ...listProgress, 
                json.body
            ] as todo[];
    
            setListProgress(newList);
        }))

    }

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.checked)
        {
            const completed = listProgress.find( todo => todo.id == e.currentTarget.value)

            fetch(`${apiUrl}/todo/check/${completed?.id}`, {
                method: 'PUT',
            });

            completed!.checked = !completed!.checked;

            const newList = [
                ...listComplete, 
                completed
            ] as todo[];

            setListComplete(newList);

            const filteredList = listProgress.filter( todo => todo != completed);

            setListProgress(filteredList);
        }
        else
        {
            const progress = listComplete.find( todo => todo.id == e.currentTarget.value)

            fetch(`${apiUrl}/todo/check/${progress?.id}`, {
                method: 'PUT',
            })

            progress!.checked = !progress!.checked;

            const newList = [
                ...listProgress, 
                progress
            ] as todo[];

            setListProgress(newList);

            const filteredList = listComplete.filter( todo => todo.checked == !e.currentTarget.checked);

            setListComplete(filteredList);
        }
    }

    const getTodos = () => {
        fetch(`${apiUrl}/todo/`, {
            method: 'GET'
        })
        .then( res => res.json()
        .then( (json: todo[]) => {
            const progress = json.filter( todo => !todo.checked);
            setListProgress(progress);

            const completed = json.filter( todo => todo.checked);
            setListComplete(completed);
        }))
    }

    useEffect(() => {
        getTodos();
    }, []);

    return(
        <div className="todoContainer">
            <p>Criar tarefa:</p>
            <CreateTodoButton createTodoHandler={createTodoHandler} />
            <hr/>
            <h2>Todo List:</h2>
            <hr/>
            <p>Em progresso:</p>            
            {
                listProgress.length > 0 && 
                <div className="list">
                {
                    (
                        listProgress.map( todo => {
                            return <TodoElement key={todo.id} todo={todo} checkHandler={checkHandler}/>
                        })
                    )
                }
                </div>
                ||
                <p>Não há tarefas em progresso!</p>
            }
            <hr/>
            <p>Completo:</p>
            {
                listComplete.length > 0 && 
                <div className="list">
                {
                    (
                        listComplete.map( todo => {
                            return <TodoElement key={todo.id} todo={todo} checkHandler={checkHandler}/>
                        })
                    )
                }
                </div>
                ||
                <p>Não há tarefas completas</p>
            }
        </div>
    )
}

