import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import Moviesf from "./Moviesf"
import TVShows from './TVShows';
import MyList from './MyList';

let i = Math.floor(Math.random()*10);
if(i===0)
  i=1;

const apiKey = "8399fc2e2e79305785bbd403d7eb6974";
const url = "https://api.themoviedb.org/3/";
const imgURL = "https://image.tmdb.org/t/p/w500";
const up = "upcoming";
const tprate = "top_rated";
const pop = "popular";

const Card = ({img})=>(
      <img className='card' src={img} alt="cover" />
)

const Row = ({title,Extra,arr=[] })=>{
    return(
    <div className='row'>
        <h2>{title}</h2>
        <div>{Extra}</div>
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



const Home = () => {

  const startarr = localStorage.getItem("mylist")? JSON.parse(localStorage.getItem("mylist")):[];

    const [upm, setUpm] = useState([]);
    const [popm, setPopm] = useState([]);
    const [tpm, setTpm] = useState([]);
    const [gnre, setGnre] = useState([]);
    const [raddm, setRaddm] = useState([]);
    const [mylist,setMylist] = useState(startarr);
    const [loading,setLoading] = useState(true);

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

      const genreslt  = async()=>{
        const {data : {genres}} = await axios.get(`${url}genre/movie/list?api_key=${apiKey}`);
        setGnre(genres);
        // console.log(genres);
      };

      const fetchRaddm  = async()=>{
        const {data : {results}} = await axios.get(`${url}movie/now_playing?api_key=${apiKey}`);
        setRaddm(results);
      };
    
      fetchPop();
      fetchUpc();
      fetchTop();
      genreslt();
      fetchRaddm();
    }, [])

    useEffect(()=>{
      localStorage.setItem("mylist",JSON.stringify(mylist));
  },[mylist])

  const [buttonText, setButtonText] = useState(['Add to List']); 

  return (

    <div className='home'>
        <div className="banner" style={{
            backgroundImage : popm[i] ?`url(${`${imgURL}${popm[i].poster_path}`})`:"rgb(16,16,16)"
        }}>
            {popm[i] && <h1>{popm[i].original_title}</h1>}
            {popm[i] && <p>{popm[i].overview}</p>}
            <button><BiPlay/>Play </button>
            <button className='addlist' onClick={()=>(
              setMylist([...mylist,popm[i]]),  
              setButtonText('Added')     
            )}>{buttonText} </button>

        </div>  
        <Row title={"Popular on Netflix"} arr={popm}/>
        <Row title={"Upcoming"} arr={upm}/>
        <Row title={"Top Rated"} arr={tpm}/>
        <Moviesf/>
        <TVShows/>
        <Row title={"Recently Added"} arr={raddm} />
        <MyList arr={mylist}/> 
        <div className="genre">
            {gnre.map((item)=>(
                <Link key={item.id} to={`/genre/${item.name}`}>{item.name}</Link>
            ))}
        </div>

    </div>
  )
}

export default Home