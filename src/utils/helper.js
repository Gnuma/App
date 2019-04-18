const dayInMilliseconds = 1000 * 60 * 60 * 24;

export const dateDisplay = date => {
  if (Math.abs(new Date() - date) < dayInMilliseconds)
    return (
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
    );
  else if (Math.abs(new Date() - date) < dayInMilliseconds * 2) return "Ieri";
  else
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
};

export default {
  dateDisplay: dateDisplay
};
