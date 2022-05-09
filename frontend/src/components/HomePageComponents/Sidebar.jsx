import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  Info,
  Favorite,
  NoteAlt,
  ListAlt,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import Add from "./Add.tsx"

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box bgcolor="white" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home sx={{ color: "#FF203A" }} />
              </ListItemIcon>
              <ListItemText primary="All Recipes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Favorite sx={{ color: "#FF203A" }} />
              </ListItemIcon>
              <ListItemText primary="My Favorites" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <NoteAlt sx={{ color: "#FF203A" }} />
              </ListItemIcon>
              <ListItemText primary="My Recipes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Info sx={{ color: "#FF203A" }} />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/reset-password">
              <ListItemIcon>
                <Settings sx={{ color: "#FF203A" }} />
              </ListItemIcon>
              <ListItemText primary="Reset Password" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight sx={{ color: "#FF203A" }} />
              </ListItemIcon>
              <Switch onChange={(e) => setMode(mode === "light" ? "dark" : "light")} />
            </ListItemButton>
          </ListItem>
        </List>
        <Add />
      </Box>
    </Box>
  );
};

export default Sidebar;

