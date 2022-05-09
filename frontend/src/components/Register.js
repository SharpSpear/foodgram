import React, { useState } from "react";
import RegisterImage from "../assets/img/chef2_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ProjectBox from "./Elements/ProjectBox";

function Register() {

  var registerfName;
  var registerlName;
  var registerLogin;
  var registerPassword;
  var registerConfirmPassword;
  var registerEmail;

  const [message, setMessage] = useState("");

  let bp = require("./Path.js");

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

  let element = (
    <a className="changingTextColor" href="/login">Log In!</a>
  );

  const doRegister = async (event) => {
    event.preventDefault();

    var obj = {
      FirstName: registerfName.value,
      LastName: registerlName.value,
      Login: registerLogin.value,
      Password: registerPassword.value,
      Email: registerEmail.value,
    };

    //Check if inputs are valid
    if (obj.FirstName == "" || obj.LastName == "") {
      setMessage("First Name and Last Name cannot be empty.");
      return;
    }
    //Check if passwords match
    if (registerPassword.value != registerConfirmPassword.value) {
      setMessage("Passwords do not match.");
      return;
    }

    //Thanks to stackoverflow for the following regexs
    //Check for valid password. 
    var pwdRegex = /^\w{8,}$/; //A string of 8 or more alphanumeric characters
    if(!pwdRegex.test(obj.Password))
    {
        setMessage("Password must be 8 or more alphanumeric characters");
        return;
    }

    //Check if the username is 5 or more char long
    var loginRegex = /^\w{5,}$/;
    if(!loginRegex.test(obj.Login))
    {
        setMessage("Username must be 5 or more alphanumeric characters");
        return;
    }

    //Chekc for valid email
    var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(obj.Email)) {
        setMessage("Please enter a valid email");
        return;
    }

    //If we get here, everything is valid. Continue the registration process

    var js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());
      if (res.id <= 0) {
        setMessage(res.error);
      } else {
        var user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
        localStorage.setItem("user_data", JSON.stringify(user));
        setMessage("Successfully register!");
        window.location.href = "/login";
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };;

  return (
    <div id="registerDiv">
      <div className="leftPanel">
        <img className="radius8" class="pictureSizeLogin" src={RegisterImage} alt="chef2" />
      </div>
      <div className="RegisterText">
        <form onSubmit={doRegister}>
          <h1 id="title" style={{marginLeft:"-60px"}}>FoodGram</h1>
          <br />
          <h2 id="text" style={{marginLeft:"-60px"}}>Sign up to discover meal ideas, save your favorite recipes, and more!</h2>
          <br />
          <div className="form-group">
            <input
              type="text"
              id="registerfName"
              className="form-control col-md-10"
              placeholder="First Name"
              ref={(c) => (registerfName = c)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="registerlName"
              className="form-control col-md-10"
              placeholder="Last Name"
              ref={(c) => (registerlName = c)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="registerEmail"
              className="form-control col-md-10"
              placeholder="Email"
              ref={(c) => (registerEmail = c)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="registerLogin"
              class="form-control col-md-10"
              placeholder="Username"
              ref={(c) => (registerLogin = c)}
            />
          </div>
          <div className="form-group">
            <input
              type={passwordShown ? "text" : "password"}
              id="registerPassword"
              className="form-control col-md-10"
              placeholder="Password"
              ref={(c) => (registerPassword = c)}
            />
            <span onClick={togglePassword} class="field-icon-not-centered-register-page">
                <FontAwesomeIcon icon={faEye} size="lg" />
            </span>
          </div>
          <div className="form-group">
            <input
              type={confirmPasswordShown ? "text" : "password"}
              id="registerPassword"
              className="form-control col-md-10"
              placeholder="Confirm Password"
              ref={(c) => (registerConfirmPassword = c)}
            />
            <span onClick={toggleConfirmPassword} class="field-icon-not-centered-register-page">
                <FontAwesomeIcon icon={faEye} size="lg" />
            </span>
          </div>
          <input
            type="submit"
            id="registerButton"
            className="form-controlL btn-danger submit col-md-10"
            value="Register"
            onClick={() => {
                doRegister();
            }}
          />
          <div className="form group">
            {" "}
            <br/>
            <p className="w-100 text-center" style={{marginLeft:"-60px"}}>Already have an account? {element} </p>
          </div>
        </form>
        <span id="registerResult" class=" w-100 text-center" style={{marginLeft:"-60px", color:"#ff203a"}}>
          {message}
        </span>
      </div>
    </div>
  );
}
export default Register;
