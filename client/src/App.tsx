import {useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { TodoList } from './Components/TodoList';
import { authState} from './store/authState';
import axios from 'axios';


export default function App(){
  return (
    <RecoilRoot>
      <Router>
        <InitState />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/todos' element={<TodoList />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init =async ()=>{
    const token = localStorage.getItem("token");
    try{
      axios.get('http://localhost:3000/auth/me',{
        headers:{Authorization: `Bearer ${token}`}
      })
      .then((response)=>{
        console.log(response);
        if(response.data){
          setAuth({token : token, username : response.data.username});
          navigate('/todos');
        }else{
          navigate('/login');
        }
      })
    }catch (e){
      console.log(e);
      navigate('/login');
    }
  }

  useEffect(()=>{
    init();
  },[])
  return <></>
}