import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import LogoIcon from "../../assets/img/logo_chef_hat.png";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from '@mui/material/InputAdornment';


export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    const doLogout = event => {
      event.preventDefault();
      localStorage.removeItem("user_data")
      window.location.href = '/';
    };

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="flexNullCenter" to="home" smooth={true}>
            <img className="radius8" class="logoSize" src={LogoIcon} />
            <h1 style={{ marginLeft: "5px" }} className="font20 extraBold">
              Foodgram
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font16">
              <span id="userName">Logged In As {firstName} {lastName}</span> <br/> 
              <TextField
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
              />
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer flexCenter">
              <a onClick={doLogout} Log Out className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                <FontAwesomeIcon icon={faSignOut} className="fa-fw" />
                Log Out
              </a>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


