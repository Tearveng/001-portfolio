export const DateTimeFormat = (dateTime: Date) => {
  var date = dateTime.toString();
  var convert = date.split(" ");
  var result = convert[1] + " " + convert[2] + ", " + convert[3];

  // console.log(result);

  return result;
};
