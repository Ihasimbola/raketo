type SpentTimesType = {
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function calculateTotalSpentTime(spentTimes: Array<SpentTimesType>) {
  const result: SpentTimesType = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };

  spentTimes.forEach((time) => {
    result.second += time.second;
    if (result.second > 59) {
      result.second = result.second - 59;
      ++result.minute;
    }

    result.minute += time.minute;
    if (result.minute > 59) {
      result.minute = result.minute - 59;
      ++result.hour;
    }

    result.hour += time.hour;
    if (result.hour > 24) {
      result.hour = result.hour - 24;
      ++result.day;
    }
  });

  return result;
}

export default calculateTotalSpentTime;
