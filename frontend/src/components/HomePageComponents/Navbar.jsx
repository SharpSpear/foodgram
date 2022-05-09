import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import LogoIcon from "../../assets/img/logo_chef_hat_transparent.png";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//From @gianfrancosg code
var _ud = localStorage.getItem("user_data");
var ud = JSON.parse(_ud);

// var myUsrArray;

if (ud !== null) {
  var userId = ud.id;
  var firstName = ud.firstName;
  var lastName = ud.lastName;

  // const myUsrArray = firstName.split("");

  // if(myUsrArray !== undefined){
  //   myUsrArray = firstName.split("");
  // }
  // console.log(myUsrArray[0]);
}

const doLogout = (event) => {
  event.preventDefault();
  localStorage.clear();
  // localStorage.removeItem("user_data");
  window.location.href = "/";
};
// End

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    borderColor: alpha(theme.palette.common.black, 0.7),
  },
  padding: "0 20px",
  border: 1,
  borderRadius: 35,
  width: "20%",
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  // [theme.breakpoints.up("sm")]: {
  //   display: "none",
  // },
}));

const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" style={{ background: "white" }}>
      <StyledToolbar>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Box component="img" sx={{ width: 50, height: 40 }} alt="logo" src={LogoIcon} />
          <Typography variant="h6" sx={{ fontWeight: "900", display: { xs: "none", sm: "block" } }}>
            FoodGram
          </Typography>
        </Stack>

        <span>
          <TextField
              className="inputRounded"
              label="Find a recipe..."
              // textAlign="centered"
              id="outlined-size-small"
              size="small"
              onChange={e => props.search(e.target.value)}
              // margin="dense"
              style={{ width: "100%", borderWidth: 2, borderRadius: 20,  marginBottom: 1, borderRadius: 40}}
              InputProps={{
                  startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faSearch} /></InputAdornment>,
              }}
          />
        </span>


        {/* <Search sx={{ border: 1, borderColor: "grey.500" }}>
          <InputBase 
            placeholder="Find a Recipe..." 
            onChange={e => props.search(e.target.value)}
            />
        </Search> */}
        <UserBox onClick={(e) => setOpen(true)}>
          {/* <Avatar sx={{ width: 40, height: 40, bgcolor: "#3F3D56" }}>{myUsrArray[0]}</Avatar> */}
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#3F3D56" }}></Avatar>
          <Typography color="secondary.dark" variant="subtitle1">{firstName}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={doLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
