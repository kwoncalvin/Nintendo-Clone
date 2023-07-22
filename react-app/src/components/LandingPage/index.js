import React from "react";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";


const LandingPage = () => {
    const history = useHistory();

    return (
        <div id='landing-page-wrapper'>
            <div id='landing-title'>
                <h1 id='shop-twintendo'>Shop Twintendo Now</h1>
                <button id='landing-button'>Let's-a-go!<img src='/favicon.ico'/></button>
            </div>
        </div>
    )
}

export default LandingPage
