import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { searchBy } from "../helpers/Helpers";

const useStyles = makeStyles({
  inputContainer: {
    width: "100%",
    height: "16%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  input: {
    width: "95%",
    height: "75%",
    margin: "0 auto",
    paddingTop: (window) => 0.02 * window.height,
    border: "none",
    borderBottom: "3px solid rgb(241,241,241)",
    outline: "none",
    fontSize: (window) => 0.022 * window.height,
    "&:focus": {
      borderBottom: "3px solid rgba(0,0,0, .6)",
    },
  },
});

export default function Search(props) {
  const { init, setData, windowSize } = props;
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const classes = useStyles(windowSize);

  useEffect(() => {
    const filtered = searchBy(init, name, tag);
    setData(filtered);
  }, [name, tag, init, setData]);

  return (
    <div className={classes.inputContainer}>
      <input
        type="text"
        className={`${classes.input} search`}
        placeholder="Search by name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <input
        type="text"
        className={`${classes.input} search`}
        placeholder="Search by tag"
        onChange={(e) => {
          setTag(e.target.value);
        }}
        value={tag}
      />
    </div>
  );
}
