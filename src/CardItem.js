import { Card, Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import Grades from "./Grades";
import Tags from "./Tags";
import { getAvg, addTag } from "./Helpers";
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
    height: 0.23 * window.innerHeight,
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
    fontSize: 0.044 * window.innerHeight,
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
    fontSize: 0.06 * window.innerHeight,
  },
  infoContainer: {
    flex: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    fontSize: 0.017 * window.innerHeight,
    color: "rgba(151,151,151, 1)",
    fontWeight: "normal",
  },
});

export default function CardItem(props) {
  const { firstName, lastName, email, company, skill, pic, grades, tags } =
    props.student;
  const { index, setInit } = props;

  const [show, setShow] = useState(false);
  const [newTag, setNewTag] = useState("");
  const classes = useStyles();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const tags = addTag(e.target.value, props.student);
      const student = { ...props.student, tags };
      setNewTag("");
      setInit((prev) => {
        const students = [...prev];
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
            <p>Average: {getAvg(grades)}%</p>
          </div>
        </div>
      </div>
      {show && <Grades grades={grades} />}
      <Tags
        handleKeyPress={handleKeyPress}
        newTag={newTag}
        setNewTag={setNewTag}
        tags={tags}
      />
    </Card>
  );
}
