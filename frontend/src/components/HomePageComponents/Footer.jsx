import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import LogoIcon from "../../assets/img/logo_chef_hat_transparent.png";

function Copyright() {
  return (
    <Typography variant="body2" color="#fff" align="center">
      {"Copyright © "}
      <span className="redColor font13">Group 22 Large Project Spring {new Date().getFullYear()}</span> 
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0b093b"}} component="footer">
      <Typography variant="h6" align="center" style={{font:"15", color: "#fff"}}>
        FoodGram
      </Typography>
      <Typography variant="subtitle1" align="center" color="#fff" component="p">
        Let's grab a coffee. Vivan las Arepas!
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
