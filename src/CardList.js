import axios from "axios";
import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Search from "./Search";

const useStyles = makeStyles({
  container: {
    width: (window.innerWidth * 7) / 12,
    height: (window.innerHeight * 5) / 6,
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

export default function CardList() {
  const [init, setInit] = useState([]);
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((res) => {
        setInit(res.data.students);
        setData(res.data.students);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setData(init);
  }, [init]);

  return (
    <Paper className={classes.container} elevation={5}>
      <Search init={init} setData={setData} />
      {data.map((student, index) => (
        <CardItem
          student={student}
          key={student.id}
          index={index}
          setInit={setInit}
        />
      ))}
    </Paper>
  );
}
