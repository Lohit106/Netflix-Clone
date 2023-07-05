import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./tvshows.scss"


let i = Math.floor(Math.random()*10);
if(i===0)
  i=1;

const apiKey = "8399fc2e2e79305785bbd403d7eb6974";
const url = "https://api.themoviedb.org/3/";
const imgURL = "https://image.tmdb.org/t/p/w500";

const Card = ({img})=>(
  <img className='card' src={img} alt="cover" />
)

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


const TVShows = () => {
    const [tvshow, setTVshow] = useState([]); 
    const [trendtv, setTrendTV] = useState([]); 

    useEffect(() => {

        const fetchTVshows  = async()=>{
            
          const {data : {results}} = await axios.get(`${url}discover/tv?include_adult=false&include_null_first_air_dates=false&api_key=${apiKey}&page=${i}`);
          setTVshow(results);
        };

        const fetchTrendTV  = async()=>{
            const {data : {results}} = await axios.get(`${url}trending/tv/day?api_key=${apiKey}&page=${i}`);
            setTrendTV(results);
          };
    
        fetchTVshows();
        fetchTrendTV();
      }, [])

  return (
    <div>
        <Row title={"Trending TV Shows"}arr={trendtv}/>
        <Row title={"TV Shows"}arr={tvshow}/>
    </div>
  )
}

export default TVShows