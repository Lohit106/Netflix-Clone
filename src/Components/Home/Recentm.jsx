import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiKey = "8399fc2e2e79305785bbd403d7eb6974";
const url = "https://api.themoviedb.org/3/";
const imgURL = "https://image.tmdb.org/t/p/w500";
const up = "upcoming";
const tprate = "top_rated";
const pop = "popular";

let i = Math.floor(Math.random()*10);
if(i===0)
  i=1;
  
const Card = ({img})=>{
  return(
      <img className='card' src={img} alt="cover" />
      //  <button>Add to List</button>
  )
}

const Row = ({title,arr=[] })=>{
    return(
    <div className='row'>
        <h2>{title}</h2>
        <div>
            {
                arr.map((item,index)=>(
                    <Card key={index} img={`${imgURL}${item.poster_path}`} />
                ))
            }
        </div>
    </div>
    )
}

const Recentm = () => {
    const [upm, setUpm] = useState([]);
    const [popm, setPopm] = useState([]);
    const [tpm, setTpm] = useState([]);
    const [raddm, setRaddm] = useState([]);

    useEffect(() => {
        const fetchUpc  = async()=>{
          const {data : {results}} = await axios.get(`${url}movie/${up}?api_key=${apiKey}&page=${i}`);
          setUpm(results);
        };
  
        const fetchPop  = async()=>{
          const {data : {results}} = await axios.get(`${url}movie/${pop}?api_key=${apiKey}&page=${i}`);
          setPopm(results);
        };
  
        const fetchTop  = async()=>{
          const {data : {results}} = await axios.get(`${url}movie/${tprate}?api_key=${apiKey}&page=${i}`);
          setTpm(results);
        };

        const fetchRaddm  = async()=>{
            const {data : {results}} = await axios.get(`${url}movie/now_playing?api_key=${apiKey}`);
            setRaddm(results);
          };
      
        fetchPop();
        fetchUpc();
        fetchTop();
        fetchRaddm();
      }, [])

  return (
    <div>
        <Row title={"Recently Added"} arr={raddm}/>
        <Row title={"Popular on Netflix"} arr={popm}/>
        <Row title={"Upcoming"} arr={upm}/>
        <Row title={"Top Rated"} arr={tpm}/>
    </div>
  )
}

export default Recentm