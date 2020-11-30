import React from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Main from "./containers/Main/Main";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    // backgroundColor: "#fffde7",
  }
}));
function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.root}>
        <BrowserRouter basename="/">
          <Main />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
