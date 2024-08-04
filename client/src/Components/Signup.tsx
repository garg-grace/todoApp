import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';

import axios from "axios";

interface signupState{
    username: string;
    password:string;
}

export const Signup:React.FC = () => {
    const [username,setUsername] = useState<signupState['username']>('');
    const [password,setPassword] = useState<signupState['password']>('');
    const navigate = useNavigate();

    const handleSignup =async () =>{
        axios
        .post('http://localhost:3000/auth/signup',{username,password})
        .then((response)=>{
            if(response.data.token){
                localStorage.setItem("token",response.data.token)
                navigate('/todos');
            }
        })
        .catch((error)=> console.log(error));
    };

    return (
        <div style={{justifyContent:"center",display:"flex",width:"100%" }}>
            <h2>Signup</h2>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Usename" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            Already signedUp? <Link to="/login">Login</Link>
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};