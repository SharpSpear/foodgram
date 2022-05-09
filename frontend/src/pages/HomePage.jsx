import React, { useState, useEffect } from "react";
import Sidebar from "../components/HomePageComponents/Sidebar";
import Feed from "../components/HomePageComponents/Feed";
import RightBar from "../components/HomePageComponents/Rightbar";
import Navbar from "../components/HomePageComponents/Navbar";
import Footer from "../components/HomePageComponents/Footer";
// import Add from "../components/HomePageComponents/Add";
import { Box, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const font = "'Prompt', sans-serif";

// const darkTheme = createTheme({
//   typography: {
//     allVariants: {
//       fontFamily: font,
//       color: "#3F3D56",
//     },
//   },
//   palette: {
//     primary: {
//       main: "#FF203A",
//       light: "#ff6465",
//       dark: "#c30013",
//     },
//     secondary: {
//       main: "#575a89",
//       light: "#8587b9",
//       dark: "#2b315c",
//     },
//     mode: { mode },
//   },
// });

const HomePage = () => {
  let bp = require("../components/Path.js");
  const [feed, setFeed] = useState([]);
  let temp = 0;

  // function that will run when page is loaded
  useEffect(() => {
    loadFeed("");
  }, []);

  const loadFeed = async (query) => {
    var obj = { search: query };
    var js = JSON.stringify(obj);
    // var js = {"search":query};
    try {
      const response = await fetch(bp.buildPath("api/search/"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      // temp=res[0]._id
      // console.log(res)
      // setFeed(res);
      localStorage.setItem("feed", JSON.stringify(res));
    } catch (e) {
      console.log(e.toString());
    }

    // setFeed(query)
  };

  // For Dark/Light Theme
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    typography: {
      allVariants: {
        fontFamily: font,
        // color: "#3F3D56",
      },
    },
    palette: {
      primary: {
        main: "#FF203A",
        light: "#ff6465",
        dark: "#c30013",
      },
      secondary: {
        main: "#575a89",
        light: "#8587b9",
        dark: "#2b315c",
      },
      mode: mode ,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Box bgcolor={"background.default"} color={"text.primary"} >
          <Navbar search={loadFeed} />
          <Stack direction="row" spacing={0} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Feed feed={feed} />
            <RightBar />
          </Stack>
          <Footer />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};
export default HomePage;
