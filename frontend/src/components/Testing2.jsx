import { React, useState } from 'react'

function Testing2(props) {

    var Search;
    let bp = require("./Path.js");

    const doSearch = async () => {
        
        var obj = { search: Search.value};

        var js = JSON.stringify(obj);
        try{
        const response = await fetch(bp.buildPath('api/search/'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    };

    const data =[
        {
            "id": 1,
            "text": "Devpulse"
        }, {
            "id": 2,
            "text": "Linklinks"
        }, {
            "id": 3,
            "text": "Centizu"
        }, {
            "id": 4,
            "text": "Dynabox"
        }, {
            "id": 5,
            "text": "Avaveo"
        }, {
            "id": 6,
            "text": "Demivee"
        }, {
            "id": 7,
            "text": "Jayo"
        }, {
            "id": 8,
            "text": "Blognation"
        }, {
            "id": 9,
            "text": "Podcat"
        }, {
            "id": 10,
            "text": "Layo"
        }]

    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>** {item.text}</li>
            ))}
        </ul>
    )
}

export default Testing2;