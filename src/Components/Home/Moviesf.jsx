import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Moviesf.scss"

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

const Moviesf = () => {
  const [movies, setMovies] = useState([]);
  const [trenmov, setTrendmov] = useState([]);

  useEffect(() => {

    const fetchMovies  = async()=>{
      const {data : {results}} = await axios.get(`${url}discover/movie?include_adult=false&include_video=false&api_key=${apiKey}&page=${i}`);
      setMovies (results);
    };

    const fetchTrendm  = async()=>{
      const {data : {results}} = await axios.get(`${url}trending/movie/day?api_key=${apiKey}&page=${i}`);
      setTrendmov (results);
    };

    fetchMovies();
    fetchTrendm();
  }, [])
  return (
    <div>
      <Row title={"Trending Movies"} arr={trenmov}/>
      <Row title={"Movies"} arr={movies}/>
    </div>
  )
}

export default Moviesf