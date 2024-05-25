import React, { useEffect, useState ,useRef} from "react";
import { useDispatchCart,useCart } from "./ContextReducer";

function Card(props) {
  let options =props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size,setSize] =  useState("");
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  const handleAddToCart=async ()=>{
  

    let food = []
    for (const item of data){
      if(item.id === props.foodItem._id){ //data has given is exist or not
        food = item;
        break;
      }
    }
    
    if(food.length !== 0){
      if(food.size === size){
        await dispatch({type:"UPDATE", id:props.foodItem._id, price:finalPrice, qty:qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img})
        return
        }
        return
    }
   
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img})
   // await console.log(data);
  }

  let finalPrice = qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"145px", objectFit:"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setSize(e.target.value)} ref = {priceRef}>
              {priceOptions.map((data)=>{
                return <option key = {data} value = {data}>{data}</option>
              })}
            </select>

            <div className="d-inline h-100 fs-5">{finalPrice}/-</div>

          </div>
          <hr></hr>
          <button className="btn btn-success justify-content ms-2" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
