import React, { useState } from 'react';
import ResetPasswordImage from "../assets/img/chef_resetpassword.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ResetPassword(){

    var newPassword;
    var confirmPassword;
    const [message,setMessage] = useState('');
    let bp = require('./Path.js');

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    const doResetPassword = async event => {
        event.preventDefault();
        var obj = { new_password: newPassword.value, confirm_password: confirmPassword.value };
        var js = JSON.stringify(obj);
        try
        {
          var url = window.location;
          var access_token = new URLSearchParams(url.search).get('token');

          const response = await fetch(bp.buildPath('api/reset-password?token=' + access_token),
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
            <img className="radius8" class="pictureSizeForgotPassword" src={ResetPasswordImage} alt="forgot-password"/>
        </div>
        <div class="LoginText">
            <form onSubmit={doResetPassword}>
                <div class="form-group">
                  <h2 id="text" style={{textAlign: "center"}}>Please input a new password for your account.</h2><br/>
                  <div class="form-group">
                    <input id="newPassword" type={passwordShown ? "text" : "password"} class="form-control col-md-10" placeholder="New Password" ref={(c) => newPassword = c}/>
                    <span onClick={togglePassword} class="field-icon-not-centered">
                        <FontAwesomeIcon icon={faEye} size="lg" />
                    </span>
                  </div>
                  <div class="form-group">
                    <input id="confirmPassword" type={confirmPasswordShown ? "text" : "password"} class="form-control col-md-10" placeholder="Confirm Password" ref={(c) => confirmPassword = c}/>
                    <span onClick={toggleConfirmPassword} class="field-icon-not-centered">
                        <FontAwesomeIcon icon={faEye} size="lg" />
                    </span>
                  </div>     
                </div>
                <input type="submit" class="form-controlL btn-danger submit col-md-10" value = "Submit" onClick={doResetPassword}/>
            </form>
            <span id="resetPasswordResult" class="w-100 text-center" style={{marginLeft:"-60px"}}>{message}</span>
        </div>
     </div>
      );
};
export default ResetPassword;