export const handleIsAnswer = (value) => {
  let answer = null;
  if (value) {
    answer = typeof value === "string" ? value.toLowerCase() === "true" : value;
  }

  return answer;
};
