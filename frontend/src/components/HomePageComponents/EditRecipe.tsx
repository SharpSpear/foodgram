import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Stack,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import axios from "axios";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  // gap: "10px",
  // marginBottom: "20px",
});

const categories = [
  {
    value: "Breakfast",
    label: "Breakfast",
  },
  {
    value: "Lunch",
    label: "Lunch",
  },
  {
    value: "Dinner",
    label: "Dinner",
  },
];

var myBoolean = false;

const EditRecipe = (props, props1) => {

  const [state, setState] = useState(false)  


  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userID = ud.id;
  var postID = props._id;
  var Category;

  //For file upload
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [instructions, setInstructions] = useState();
  const [ingredients, setIngredients] = useState();
  //For dropdown category
  const [category, setCategory] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  //For errors
  const [errorValidation, setErrorValidation] = useState("");
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);

  function handleChangeImage(event) {
    setFile(event.target.files[0]);
  }
  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeInstructions(event) {
    setInstructions(event.target.value);
  }
  function handleChangeIngredients(event) {
    setIngredients(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  };

  let bp = require("../Path.js");

  const loadRecipe = async (event) => {
    event.preventDefault();

    setName(props.name);
    setInstructions(props.instructions);
    setIngredients(props.ingredients);
    setCategory(props.category);
  }

  const editRecipe = async (event) => {
    event.preventDefault();

    // console.log(userID);
    // console.log("name->", name);
    // console.log("file->", file);
    // console.log("instructions->", instructions);
    // console.log("instructions->", ingredients);
    // console.log("category->", category);

    if (name === "" || instructions === "" || ingredients === "") {
      setErrorValidation("Please fill all entries to edit the recipe");
      return;
    }

    console.log(postID)

    var obj = { id: postID, name: name, ingredients: ingredients, instructions: instructions, category: Category.value };

    var js = JSON.stringify(obj);

    console.log(obj)

    try {
      const response = await fetch(bp.buildPath("api/edit-instructions"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());
      setMessage(res.error);
      console.log(res.error);

    } catch (e) {
      console.log("error->", e.toString());
      return;
    }
  };

  // console.log("PROPS in MODAL", props);

  return (
    <>
    <StyledModal
      open={props.show}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="div" sx={{ backgroundColor: "secondary.light", borderRadius: "20px" }}>
      <Container
            id="BACKGROUND"
            maxWidth="md"
            sx={{
              p: "40px",
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              width: "auto",
            }}
          >
            <Typography variant="h4" color="secondary.dark" textAlign="center">
              Edit your Recipe
            </Typography>

            {/* RECIPE NAME BOX */}
            <Box
              component="div"
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
              >
                Recipe Name:
              </Typography>
              <TextField
                id="recipeName"
                multiline
                rows={1}
                className="recipeInput"
                sx={{ flex: 3 }}
                value={name}
                // ref={(c) => (Name = c)}
                onChange={handleChangeName}
              ></TextField>
            </Box>
            {/* END OF RECIPE NAME BOX */}

            {/* CATEGORIES BOX */}
            <Box
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Container
                disableGutters
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={500}
                  sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
                >
                  Category:
                </Typography>

                <TextField
                  id="categoryDropdown"
                  select
                  value={category}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value} ref={(c) => (Category = c)}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Container>
              <Container disableGutters sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" component="h6" fontWeight={500} sx={{ mr: "5px" }}>
                  Image:
                </Typography>
                <div>
                  <input type="file" />
                </div>
              </Container>
            </Box>
            {/* END OF CATEGORIES BOX */}

            {/* INGREDIENTS BOX */}
            <Box
              component="div"
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
              >
                Ingredients:
              </Typography>
              <TextField
                id="recipeIngredients"
                multiline
                rows={1}
                className="recipeInput"
                sx={{ flex: 3 }}
                value={ingredients}
                onChange={handleChangeIngredients}
              ></TextField>
            </Box>
            {/* END INGREDIENTS BOX */}

            {/* INSTRUCTIONS BOX */}
            <Box
              component="div"
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "top",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
              >
                Instructions:
              </Typography>
              <TextField
                id="recipeInstructions"
                multiline
                rows={4}
                className="recipeInput"
                sx={{ flex: 3 }}
                //  ref={(c) => (Instructions = c)}
                value={instructions}
                onChange={handleChangeInstructions}
              ></TextField>
            </Box>
            {/* END INSTRUCTIONS BOX */}
            {/* <button onClick={saveRecipe}>Submit</button> */}
            <Box
              component="div"
              sx={{
                gap: "20px",
                m: "10px",
                display: "flex",
                width: "100%",
                justifyContent: "right",
              }}
            >
              {/* <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}> */}
                <Typography color="error">{errorValidation}</Typography>
              {/* </Box> */}
              <Button
                variant="contained"
                size="large"
                id="createSubmit"
                onClick={loadRecipe}
                sx={{ backgroundColor: "secondary.dark", borderRadius: "20px", fontSize: "18px" }}
              >
                Load Data
              </Button>
              <Button
                variant="contained"
                size="large"
                id="createSubmit"
                onClick={editRecipe}
                sx={{ borderRadius: "20px", fontSize: "18px" }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                size="large"
                id="cancel"
                onClick={props.close}
                sx={{ backgroundColor: "secondary.dark", borderRadius: "20px", fontSize: "18px" }}
              >
                Cancel
              </Button>
            </Box>
            <span>{message}</span>
          </Container>
      </Box>
    </StyledModal>
    </>
  );
};

export default EditRecipe;
