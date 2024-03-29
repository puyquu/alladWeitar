import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React, {useEffect, useState} from "react";
import Searchbar from "./Searchbar";
import Cookies from "js-cookie";
import {refreshIdToken} from "../../checkTokenExpirationAndRefresh"
import {auth} from "../../firebaseConfig";


const Navbar = ({setResults, user}) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const rememberedUser = Cookies.get('rememberedUser');
    const sessionUser = sessionStorage.getItem('rememberedUser')
    const [isLoading, setIsLoading] = useState(!user); // Set loading state initially if user is not available

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                // User is now logged out from Firebase
                console.log('User is logged out');
                // Additionally, you can remove local storage or cookies here
                Cookies.remove('rememberedUser');
                sessionStorage.removeItem('rememberedUser');
            })
            .catch(error => {
                console.error('Error while logging out:', error);
            });
    };

    useEffect(() => {
        console.log(rememberedUser)
    }, []);

    if (rememberedUser!=null || sessionUser!=null) {
        return <nav className="navbar">
            <Link to="/" id="logo" onClick={() => this.forceUpdate}>
                <div className="app-name">AlladWeitar</div>
            </Link>
            <div id={"searchbar"}><Searchbar setResults={setResults}/></div>
            <ul id="list">
                <li><a href={"/create"}>Create</a></li>
                <li><a href={"/my-parties"}>{"MyParties"}</a></li>
                <li><a href={"/"}>Cards</a></li>
                <li><a href={"/"} onClick={handleLogout}>Logout</a></li>
            </ul>
        </nav>
    }else{
        return  <nav className="navbar">
            <Link to="/" id="logo">
                <div className="app-name">AlladWeitar</div>
            </Link>
            <div id={"searchbar"}><Searchbar setResults={setResults}/></div>

            <ul id="list">
                <li><a href={"/"}>Filter</a></li>
                <li><a href={"/login"}>Login</a></li>
                <li><a href={"/"}>purchase cart</a></li>
                <li><a href={"/"}>Cards</a></li>
            </ul>
        </nav>
    }


};

export default Navbar;
