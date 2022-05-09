import * as React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import { Expand } from "@mui/icons-material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import ButtonDelete from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { FavoriteBorder as Unfavorited, Favorite as Favorited } from "@mui/icons-material";
import EditRecipe from "../HomePageComponents/EditRecipe.tsx";

// interface Props {
//   image: string;
//   title: string;
//   category: string;
//   description: string;
//   ingredients: string;
//   instructions: string;
// }

// Expand more actions
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// End of expand more actions

export default function RecipeCard(props) {
  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  let bp = require("../Path.js");
  const [message, setMessage] = React.useState("");

  const doDelete = async (event) => {
    event.preventDefault();

    var obj = { postID: props._id, userID: ud.id };

    var js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/deleteInstructions/"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      setMessage(res.error);

      if (res.id >= 0) handleClose();
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isFavorited, setFavorite] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //For togglet Fav
  const toggleFav = (e: any) => {
    e.stopPropagation();
    setFavorite(!isFavorited);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        borderColor: "seondary.main",
        // backgroundColor: "primary.light",
        maxWidth: "100%",
        transition: "all 0.3s ease", //speed of transition 0.3s acelleration/decelation
        ":hover": { background: "#FFE4E1" },
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={props.imagePath} />
        <CardContent>
          <Typography gutterBottom variant="h6" fontWeight="600" component="p" align="center">
            {props.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" fontWeight="600" component="p" align="center">
            Category: {props.category}
          </Typography>
          <Typography gutterBottom variant="body2" fontWeight="500" component="p" align="center">
            By: {props.firstName} {props.lastName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="favorite" onClick={toggleFav}>
          {isFavorited ? <Favorited sx={{ color: "primary.main" }} /> : <Unfavorited />}
        </IconButton>
        {/* <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "primary" }} />} /> */}
        <IconButton>
          {/* <ModeEditOutlinedIcon onClick={() => console.log('edit', props.name)}/> */}
          <ModeEditOutlinedIcon onClick={() => setShowEdit(true)} />
          <EditRecipe show={showEdit} {...props} close={() => setShowEdit(false)} />
        </IconButton>
        <IconButton>
          <DeleteOutline onClick={handleClickOpen} />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Recipe"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this recipe?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonDelete onClick={handleClose}>Disagree</ButtonDelete>
            <ButtonDelete onClick={doDelete} autoFocus>
              Agree
            </ButtonDelete>
          </DialogActions>
          <DialogContentText
            className="textCenter"
            style={{ marginBottom: "20px" }}
            id="alert-dialog-description"
          >
            {message}
          </DialogContentText>
        </Dialog>
        {/* <IconButton>
          <DeleteOutline />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* <IconButton onClick={() => console.log('delete', title)}>
          <DeleteOutline />
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>{props.ingredients}</Typography>
          <Typography paragraph>Instructions:</Typography>
          <Typography paragraph>{props.instructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
