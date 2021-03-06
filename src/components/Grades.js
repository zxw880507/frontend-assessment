import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gradesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  gradesContent: {
    width: "80%",
  },
  gradesInfo: {
    paddingBottom: 10,
    paddingLeft: 25,
    fontSize: (window) => 0.02 * window.height,
    color: "rgba(151,151,151, 1)",
    listStyle: "none",
  },
  gradesList: {
    display: "flex",
    flexDirection: "row",
  },
  gradesIndex: {
    marginRight: 30,
  },
});

export default function Grades(props) {
  const { grades, windowSize } = props;
  const classes = useStyles(windowSize);
  return (
    <div className={classes.gradesContainer}>
      <div className={classes.gradesContent}>
        <ul className={classes.gradesInfo}>
          {grades.map((grade, index) => (
            <li className={classes.gradesList} key={index}>
              <p className={classes.gradesIndex}>Test {index + 1}:</p>
              <p>{grade}%</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
