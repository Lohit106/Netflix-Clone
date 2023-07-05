import React, { useState, useEffect } from 'react'
import "./MyList.scss"
import Home from './Home';

const imgURL = "https://image.tmdb.org/t/p/w500";

const Card = ({img})=>(
    <img className='card' src={img} alt="cover" />
)
// console.log("1");


const MyList = ({arr=[]}) => {
    const startarr = localStorage.getItem("mylist")? JSON.parse(localStorage.getItem("mylist")):[];
    const [mylist,setMylist] = useState(arr)
    useEffect(()=>{
        localStorage.setItem("mylist",JSON.stringify(mylist));
      },[mylist])

      const deleteTask = (index) =>{
        const filtarr = mylist.filter((val,i) => {
            return i !== index;
        });
        setMylist(filtarr);
    };
  return (
    <div>
        <div className='row'>
            <h2>My List</h2>
            <div>(Add to get here)</div>
            <div>
                {
                    arr.map((item,index)=>(
                      <div>
                          <Card key={index} img={`${imgURL}${item.poster_path}`} />
                          <button onClick={()=>deleteTask(index)}>-</button>
                      </div>

                    ))
                }
            </div>
            <div className='backbg'></div>
        </div>
    </div>
  )
}

export default MyList