import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";

interface signupState{
    username: string;
    password:string;
}

export const Login:React.FC = () => {
    const [username,setUsername] = useState<signupState['username']>('');
    const [password,setPassword] = useState<signupState['password']>('');
    const navigate = useNavigate();
    

    const handleLogin =async () =>{
        axios
        .post('http://localhost:3000/auth/login',{username,password})
        .then((response)=>{
            console.log(response);
            if(response.data.token){
                
                localStorage.setItem("token",response.data.token)
                navigate('/todos');
            }else{
                alert("invalid credentials");
            }
        })
        .catch((error)=> console.log(error));
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Usename" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            New Here? <Link to="/signup">Signup</Link>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};