import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart.js';
import Modal from '../Modal.js';
import { useCart } from './ContextReducer.js';
export default function Navbar() {
  const [cartView,setCartView] = useState(false);

  const authtoken = localStorage.getItem("authtoken");
  
  const navigate = useNavigate();

  const handleClick =()=>{
   localStorage.removeItem("authtoken");
   navigate("/login")
  }

  let data = useCart();

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
   <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Hungrezy</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    
      <ul className="navbar-nav me-auto mb-2">
        <li className='nav-item'>
        <Link className="nav-link fs-5" aria-current="page" to="/">Home</Link>
        </li>
        
        {(authtoken)?
        
        <li className='nav-item'>
        <Link className="nav-link active fs-5" aria-current="page" to="/myOrderData" style={{color:"white"}}>My Orders</Link>
        </li>
        :""}
      </ul>

      {(!authtoken)?
       <div className='d-flex'>
        <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
      
       
        <Link className="btn bg-white text-success mx-1 " to="/createUser">SignUp</Link>
       </div>
     :<div>
     <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
      My Cart {" "}
      {data.length ===0 ?" ":<Badge pill bg="danger">{data.length}</Badge>}
      </div>
      {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
     <div className='btn bg-white text-danger mx-2' onClick= {handleClick}>
      Logout
      </div>
      </div>
     }
    </div>
  </div> 
</nav>
    </div>
  )
}
