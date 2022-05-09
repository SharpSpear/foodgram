import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import LoginImage from "../assets/img/chef_image.png";
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Box } from '@mui/system';
import List from "./Testing2";


function Testing()
{
    let url="https://foodgram-demo.herokuapp.com/register";
    let element=<a style={{color:'#ff203a'}} href={url}>Sign up!</a>;
    var search = "";
    var data = "";
    let bp = require("./Path.js");

    const [searchResults,setResults] = useState('');
    const [recipeList,setRecipeList] = useState('');
    
    // let bp = require("./Path.js");
    // const [message, setMessage] = useState("");
    // const doSearch = async (event) => {

    //     event.preventDefault();
    //     // var obj = { login: loginName.value, password: loginPassword.value };

    // };

    const searchRecipe = async event => 
    {
        event.preventDefault();
               
        var obj = {search:search.value};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(bp.buildPath('api/search/'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            
            setResults('Card(s) have been retrieved');
            console.log(res);
            for(var i = 0; i < res.length; i++){
                console.log(res[i].ingredients);
                data += res[i].ingredients;
                data += ", ";
            }
            setRecipeList(data);

        }
        catch(e)
        {
            console.log(e.toString());
            setResults(e.toString());
        }
    };

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
    //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

   return(
    <div class="containerL">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeLogin" src={LoginImage} alt="chef" />
        </div>
        <div class="rightPanel">
        <div className="main">
        <h1>React Search</h1>
        <div className="search">
        {/* <TextField
            className="inputRounded"
            label="Search"
            textAlign="centered"
            id="outlined-size-small"
            size="small"
            // margin="dense"
            style={{ width: "100%", borderWidth: 2, borderRadius: 20,  marginBottom: 12, borderRadius: 40}}
            InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faSearch} /></InputAdornment>,
            }}
        /> */}

    <input type="text" id="searchText" placeholder="Card To Search For" 
        ref={(c) => search = c} />
    <button type="button" id="searchCardButton" class="buttons" 
        onClick={searchRecipe}> Search Recipe</button><br />
    {/* <span id="cardSearchResult">{searchResults}</span> */}
    <p id="cardList">{recipeList}</p><br /><br />


    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextField
            className="inputRounded"
            label="Find a recipe..."
            textAlign="centered"
            id="outlined-size-small"
            size="small"
            onChange={inputHandler}
            // margin="dense"
            style={{ width: "100%", borderWidth: 2, borderRadius: 20,  marginBottom: 12, borderRadius: 40}}
            InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faSearch} /></InputAdornment>,
            }}
        />
      </div>
      <List input={inputText} />
    </div>


        </div>
        </div>
        </div>
    </div>
   );
};

export default Testing;