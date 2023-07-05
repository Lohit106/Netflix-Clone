import React from 'react'
import logo from "../../Netflix_2015_logo.svg.png";
import { Link } from 'react-router-dom';
import {FiSearch} from "react-icons/fi"



const Header = () => {
  return (
    <nav className='header'>
        {/* <Link to="/Home"></Link> */}
        <img src={logo} alt="NETFLIX" />
        <div>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/recent">Recently added</Link>
            <Link to="/mylist">My List</Link>
        </div>
        <button><FiSearch/></button>
    </nav>
  )
}

export default Header