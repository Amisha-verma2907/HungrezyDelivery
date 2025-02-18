import {React,useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';

function Login() {
  const [credentials,setCredentials] = useState({email:"",password:""});
  let navigate = useNavigate();
  const handleSubmit= async (e)=>{
     e.preventDefault();
     const response = await fetch("http://localhost:5000/api/loginUser",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
     });
     const json = await response.json();
     console.log(json);
     
     if(!json.success){
       alert('Enter valid Credentials');
     }

     if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      console.log(credentials.email);
      console.log("credentials2",localStorage.getItem("userEmail"));
      localStorage.setItem("authtoken",json.authToken) //this authToken taken from /loginUser inside createUser.js
      console.log(localStorage.getItem("authtoken"))
      navigate("/")
    }
  }

  const onChange = (event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  return (
    <>
      <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name='email' value = {credentials.email} onChange={onChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
                    <input type="password" className="form-control" placeholder="Password" name='password' value = {credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className=" m-3 btn btn-primary">Submit</button>
                <Link to = "/createUser" className="m-3 btn btn-danger">I'm a new user</Link>
            </form>
            </div>
    </>
  )
}

export default Login;