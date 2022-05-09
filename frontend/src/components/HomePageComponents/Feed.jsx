import React, { useState, useEffect } from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";
import { Grid, Box, Container, Typography, Stack, Button } from "@mui/material";

const Feed = (props) => {
  const [recipeCards, setRecipeCards] = useState([]);

  // function that will run when page is loaded
  useEffect(() => {
    console.log(recipeCards);
    const updateFeed = setInterval(() => {
      // console.log(localStorage.getItem("feed"));
      setRecipeCards(JSON.parse(localStorage.getItem("feed")));
    }, 100);
  }, []);

  return (
    <Box className="lineInputted" sx={{ bgcolor: "white" }} flex={6} p={{ xs: 0, md: 2 }}>
      {/* Hero Unit */}
      <Container maxWidth="sm">
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Explore All Recipes
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container sx={{ py: 8, minHeight: "calc(100vh - 230px)" }} maxWidth="md">
        <Grid container spacing={4}>
          {recipeCards.map((recipeCard, i) => {
            return (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <RecipeCard {...recipeCard} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {/* Footer */}
      {/* <Box variant="outlined" sx={{ bgcolor: "secondary.light" }} component="footer">
        <Typography variant="h6" align="center">
          FoodGram
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Let's grab a coffee. Viva las Arepas!
        </Typography>
        <Copyright />
      </Box> */}
      {/* End footer */}
    </Box>
  );
};

export default Feed;
