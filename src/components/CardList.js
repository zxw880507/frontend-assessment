import axios from "axios";
import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Search from "./Search";

const useStyles = makeStyles({
  container: {
    width: (window) => (window.width * 7) / 12,
    height: (window) => (window.height * 5) / 6,
    overflow: "scroll",
    borderRadius: 10,
  },
  input: {
    display: "block",
    width: "90%",
    height: "8%",
    margin: "0 auto",
  },
});

export default function CardList(props) {
  const [init, setInit] = useState([]);
  const [data, setData] = useState([]);
  const { windowSize } = props;
  const classes = useStyles(windowSize);

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((res) => {
        setInit(res.data.students);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Paper className={classes.container} elevation={5}>
      <Search init={init} setData={setData} windowSize={windowSize} />
      {data.map((student) => (
        <CardItem
          student={student}
          key={student.id}
          setInit={setInit}
          windowSize={windowSize}
        />
      ))}
    </Paper>
  );
}
