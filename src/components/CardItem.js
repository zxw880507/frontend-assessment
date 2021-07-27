import { Card, Avatar, IconButton } from "@material-ui/core";
import React, { useState, useMemo } from "react";
import Grades from "./Grades";
import Tags from "./Tags";
import { getAvg, addTag } from "../helpers/Helpers";
import { makeStyles } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    borderBottom: "2px solid rgb(241,241,241)",
    paddingBottom: 10,
    paddingTop: 10,
    boxShadow: "none",
  },
  card: {
    height: (window) => 0.23 * window.height,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "visible",
    boxShadow: "none",
  },
  left: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "70%",
    height: "70%",
    border: "1px solid rgba(189, 189, 189, 1)",
  },
  right: {
    flex: 8,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  nameContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 25,
  },
  name: {
    fontSize: (window) => 0.04 * window.height,
    textTransform: "uppercase",
  },
  button: {
    color: "rgba(151,151,151, 1)",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#000000",
    },
  },
  toggleIcon: {
    fontSize: (window) => 0.06 * window.height,
  },
  infoContainer: {
    flex: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    fontSize: (window) => 0.017 * window.height,
    color: "rgba(151,151,151, 1)",
    fontWeight: "normal",
  },
});

export default function CardItem(props) {
  const { firstName, lastName, email, company, skill, pic, grades, tags, id } =
    props.student;
  const { setInit, windowSize } = props;

  const [show, setShow] = useState(false);
  const [newTag, setNewTag] = useState("");
  const memoizedAverage = useMemo(() => getAvg(grades), [grades]);
  const classes = useStyles(windowSize);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const tags = addTag(e.target.value, props.student);
      const student = { ...props.student, tags };
      setNewTag("");
      setInit((prev) => {
        const students = [...prev];
        const index = students.findIndex((student) => student.id === id);
        students[index] = student;
        return students;
      });
    }
  };
  return (
    <Card className={classes.container}>
      <div className={classes.card}>
        <div className={classes.left}>
          <Avatar variant="circular" src={pic} className={classes.avatar} />
        </div>
        <div className={classes.right}>
          <div className={classes.nameContainer}>
            <h1 className={classes.name}>
              {firstName} {lastName}
            </h1>
            <IconButton
              className={classes.button}
              onClick={() => setShow((prev) => !prev)}
              disableRipple
            >
              {show ? (
                <RemoveRoundedIcon className={classes.toggleIcon} />
              ) : (
                <AddRoundedIcon className={classes.toggleIcon} />
              )}
            </IconButton>
          </div>
          <div className={classes.infoContainer}>
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skill: {skill}</p>
            <p>Average: {memoizedAverage}%</p>
          </div>
        </div>
      </div>
      {show && <Grades grades={grades} windowSize={windowSize} />}
      <Tags
        handleKeyPress={handleKeyPress}
        newTag={newTag}
        setNewTag={setNewTag}
        tags={tags}
        windowSize={windowSize}
      />
    </Card>
  );
}
