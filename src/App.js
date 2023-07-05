import "./App.scss";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./Components/Home/Home"
import Header from "./Components/Header/Header";
import Moviesf from "./Components/Home/Moviesf";
import TVShows from "./Components/Home/TVShows";
import Recentm from "./Components/Home/Recentm";
import MyList2 from "./Components/Home/MyList2";

function App() {
  return <Router>

  <Header />

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/movies" element={<Moviesf/>}/>  
      <Route path="/tvshows" element={<TVShows/>}/>  
      <Route path="/recent" element={<Recentm/>}/>  
      <Route path="/mylist" element={<MyList2 />}/>
    </Routes>
  </Router>
}

export default App;
