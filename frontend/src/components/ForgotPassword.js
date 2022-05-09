import React, { useState } from 'react';
import ForgotPasswordImage from "../assets/img/chef_forgotpassword.png";

function ForgotPassword(){

  var forgotPasswordEmail;
  const [message,setMessage] = useState('');
  let bp = require('./Path.js');
  let element = <a class="changingTextColor" href="/">Main Page!</a>;

  const doForgotPassword = async event => {
    event.preventDefault();
    var obj = {Email:forgotPasswordEmail.value};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch(bp.buildPath('api/forgotpassword'),
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        setMessage(res.error);
    }
    catch(e)
    {
        console.log(e.toString());
        return;
    }    
  };
  

      return(
      <div id="forgotPasswordDiv">
        <div class="leftPanel">
            <img className="radius8" class="pictureSizeForgotPassword" src={ForgotPasswordImage} alt="forgot-password"/>
        </div>
        <div class="ForgotPasswordText">
            <form onSubmit={doForgotPassword}>
                <div class="form-group">
                  <h2 id="text" style={{textAlign: "center", marginLeft:"-60px"}}>Please input the email address associated with your account.</h2><br/>
                  <input id="forgotPasswordEmail" type="text" class="form-control col-md-10" placeholder="Email" ref={(c) => forgotPasswordEmail = c}/>
                </div>
                <input type="submit" class="form-controlL btn-danger submit col-md-10" value = "Submit" onClick={doForgotPassword}/>
            </form>
            <br/>
            <span id="forgotPasswordResult" class="w-100 text-center" style={{marginLeft:"-60px"}}>{message}</span>
            <span class="w-100 text-center" style={{marginLeft:"-60px"}}>Return to {element}</span>
        </div>
        
     </div>
      );
};
export default ForgotPassword;