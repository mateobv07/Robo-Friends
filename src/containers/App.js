import React, { useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll"
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css"

function App() {
    
    const [searchfield, setSearch] = useState('');
    const [robots, setRobots] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response=>{
                return response.json();
            })
            .then(users => setRobots(users));
    },[])    


    const onSearchChange = (event) => {
        setSearch(event.target.value);
    }
    
    const filteredRobots = robots.filter(robots => {
        return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    return robots === 0 ? 
    <h1 className="tc">Loading...</h1> :
    (
        <div className="tc">
                <h1 className="tc f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
    )
}

export default App