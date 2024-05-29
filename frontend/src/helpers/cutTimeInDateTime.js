export default function cutTimeInDateTime(date) {
  const dateArr = date.split("T");

  return dateArr[0];
}
