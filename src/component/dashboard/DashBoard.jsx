import axios from "axios"; // for connection with backend in secure way
import React, { useState, useEffect } from "react";
import './DashBoard.css';
import Navbar from "../Navbar";
const DashBoard = () => {
  //suggestedRepositories is for left panel of dashboard. so that user explore suggested repos
  const [repositories, setRepositories] = useState([]); //cur Logedin user repos
  const [suggestedRepositories, setSuggestedRepositories] = useState([]); //fetching all public repos for suggestion

  const [searchQuery, setSearchQuery] = useState(""); //user can search thier repos based on some filer
  const [searchResult, setSearchResult] = useState([]); //filtering all repos of user based on filter in result bar

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    const fetchRepos = async () => {
      try {
        const res = await fetch(`http://localhost:3002/repo/user/${userID}`);
        const data = await res.json();
        // console.log(data.repos);
        setRepositories(data.repos);
      } catch (err) {
        console.error("Error while fetching repository : ", err);
      }
    };

    const fetchSuggestedRepos = async () => {
      try {
        const res = await fetch(`http://localhost:3002/repo/allRepo`);
        const data = await res.json();
        setSuggestedRepositories(data);
        // console.log(data);
      } catch (err) {
        console.error("Error while fetching repository : ", err);
      }
    };
    fetchRepos();
    fetchSuggestedRepos();
  }, []);

  //search logic = its depend of search queries . here implement srch like user can search only thier own repos
  useEffect(() => {
    if (searchQuery == "") {
      //if we enter repo name as we see below in search bar then repo is visible else repo not visible 
      setSearchResult(repositories); //if user dose not enter any query then we show all repos

    } else { //user enter a valid query
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),// if serachQuery enter by user is a part of repoName 
      ); 
      // console.log(filteredRepo);
      setSearchResult(filteredRepo);//then we show filteredRepo
    }
  }, [searchQuery, repositories]);
   
  return <>
    <Navbar/>
    <section id="Dashboard">
      <aside>
        <h3>Suggested Repositories </h3>
        {suggestedRepositories.map((repo) => {
          return  <div key={repo._id}>
            <h4>{repo.name}</h4> 
            <h4>{repo.description}</h4>
          </div>
        
        })}
      </aside>
      <main>
        <h3>Your Repositories</h3>
        <div id="search">
          <input type="text" placeholder="Search...." value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>

        {searchResult.map((repo) => {
          return  <div key={repo._id}>
                    <h4>{repo.name}</h4> 
                    <h4>{repo.description}</h4> 
          </div>
        })}
      </main>
      <aside>
        <h3>Upcoming Event</h3>
        <ul>
          <li><p>Tech Confrence - Dec 15</p></li>
          <li><p>Developer Markup - Dec 30</p></li>
          <li><p>React Submit - jan 15</p></li>
        </ul>
      </aside>
    </section>
  </>
};
export default DashBoard;
