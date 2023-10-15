function createEmployeeRecord(firstName, familyName, title, payPerHour) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(data) {
  return data.map((employeeData) => createEmployeeRecord(...employeeData));
}

function createTimeInEvent(dateTime) {
  const [date, hour] = dateTime.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  });
  return this;
}

function createTimeOutEvent(dateTime) {
  const [date, hour] = dateTime.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date);
  const timeOut = this.timeOutEvents.find((event) => event.date === date);
  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100;
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function allWagesFor() {
  const eligibleDates = this.timeInEvents.map((event) => event.date);
  const totalWages = eligibleDates.reduce(
    (total, date) => total + wagesEarnedOnDate.call(this, date),
    0
  );
  return totalWages;
}

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
};
it("populates a firstName field from the 0th element", function () {
  let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
  expect(testEmployee.firstName).to.equal("Gray"); // Use 'equal' to compare the values
});