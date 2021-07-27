import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tagsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  tagsContent: {
    width: "80%",
  },
  tags: {
    paddingBottom: 10,
    paddingLeft: 25,
    fontSize: (window) => 0.017 * window.height,
    color: "rgba(151,151,151, 1)",
  },
  tagsInput: {
    width: "22%",
    height: "75%",
    marginTop: 20,
    paddingBottom: 10,
    border: "none",
    borderBottom: "3px solid rgb(241,241,241)",
    outline: "none",
    fontSize: (window) => 0.017 * window.height,
    "&:focus": {
      borderBottom: "3px solid rgba(0,0,0, .6)",
    },
  },
  tagsList: {
    display: "flex",
    flexDirection: "row",
    listStyle: "none",
    padding: 0,
  },
  tagsItem: {
    backgroundColor: "rgb(228 228 228)",
    margin: "0 2px",
    padding: 10,
    borderRadius: 5,
  },
});

export default function Tags(props) {
  const { handleKeyPress, newTag, setNewTag, tags, windowSize } = props;
  const classes = useStyles(windowSize);
  return (
    <div className={classes.tagsContainer}>
      <div className={classes.tagsContent}>
        <div className={classes.tags}>
          <ul className={classes.tagsList}>
            {tags &&
              tags.map((tag, index) => (
                <li className={classes.tagsItem} key={index}>
                  <p>{tag}</p>
                </li>
              ))}
          </ul>
          <input
            type="text"
            className={`${classes.tagsInput} tags`}
            placeholder="Add a tag"
            onKeyPress={handleKeyPress}
            onChange={(e) => {
              setNewTag(e.target.value);
            }}
            value={newTag}
          />
        </div>
      </div>
    </div>
  );
}
