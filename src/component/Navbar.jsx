import React from "react"
import { Link } from "react-router-dom"//for link tow components(link profile with allRepos)
import "./navbar.css";

export default function Navbar(){
    return  <nav>
        <Link to="/">
            <div>
                <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="GitVistaLogo" />
                <h3>GitVista</h3>
            </div>
        </Link>
        <div>
            <Link to="/create"><p>Create Repository</p></Link>
            <Link to="/profile"><p>Profile</p></Link>
        </div>
       
    </nav>
}//let import it in dashboard.jsx