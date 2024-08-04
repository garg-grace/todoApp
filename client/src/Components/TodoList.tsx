import React ,{useState,useEffect} from "react";
import { authState } from "../store/authState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Todo {
    _id: string;
    title: string;
    description: string;
    done: boolean;
}

export const TodoList:React.FC = ()=>{
    const [todos,setTodos] = useState<Todo[]>([]);
    const [title,setTitle] = useState<string>('');
    const [description,setDescription]=useState<string>('');
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(()=>{
        const getTodos = async ()=>{
            axios
            .get('http://localhost:3000/todo/todos',{
                headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
             })
            .then((response)=>{
                console.log(response);
                if(response.data){
                    setTodos(response.data);
                }
            })
            .catch((error)=> console.log(error));
        };

        getTodos();
    },[authStateValue.token]);

    const addTodo = async ()=>{
        axios.post('http://localhost:3000/todo/todos',
            {title,description},{
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response)=>{
            if(response.data){
                setTodos([...todos,response.data]);
            }            
        })
        .catch((error)=> console.log(error));        
    };

    const markDone = async(_id: string) =>{
        axios.patch(`http://localhost:3000/todo/todos/${_id}/done`,{},{
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })
        .then((response)=>{
            console.log(response.data);
            if(response.data){
                const updatedTodo = response.data;
                setTodos(todos.map((todo) => (todo._id=== updatedTodo._id ? updatedTodo : todo)));
            }
        })
        .catch((error)=> console.log(error)); 
    };

    return(
        <div>
            <div style={{display:"flex"}}>
            <h2>Welcome {authStateValue.username}</h2>
            <div style={{marginTop:25,marginLeft:20}}>
                <button onClick={()=>{
                    localStorage.removeItem("token");
                    navigate('/login');
                }}>Logout</button>
            </div>
        </div>
        <h2>Todo List</h2>
        <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title" />
        <input type='text' value={description} onChange={(e)=> {setDescription(e.target.value)}} placeholder="Description" />
        <button onClick={addTodo}>Add Todo</button>
        {todos.map((todo)=>(
            <div key={todo._id}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <button onClick={()=>markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
            </div>
        ))}
        </div>
    );
};