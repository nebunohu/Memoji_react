const outputTimeString = (counter) => {
  let  minutes,
    seconds,
    minutesStr,
    secondsStr;     // Значения минут и секунд записанные строкой 

  minutes = Math.floor(counter / 60);
  minutesStr = minutes.toString();
  if (minutes < 10) minutesStr = '0' + minutesStr;
  seconds = counter % 60;
  secondsStr =seconds.toString();
  if (seconds < 10) secondsStr = '0' + secondsStr;

  return minutesStr + ':' + secondsStr;
};

export default outputTimeString;