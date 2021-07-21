const getAvg = (grades) => {
  const num =
    grades.reduce((init, current) => Number(init) + Number(current), 0) /
    grades.length;
  return Math.round(num * 1000) / 1000;
};
const addTag = (tag, student) => {
  const arr = student.tags ? [...student.tags] : [];
  arr.push(tag);
  return arr;
};
const searchBy = (init, name, tag) => {
  return init.filter((student) => {
    let studentName = `${student.firstName} ${student.lastName}`;
    let regName = new RegExp(name, "i");
    let tags = student.tags || [];
    let regTag = new RegExp(tag, "i");
    let tagResult = tag === "" ? true : tags.some((tag) => regTag.test(tag));
    return regName.test(studentName) && tagResult;
  });
};
export { getAvg, addTag, searchBy };
