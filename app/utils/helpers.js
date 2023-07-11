import moment from "moment/moment";
import { Linking, Alert, Platform } from "react-native";

export const zip = (ar1, ar2) => {
  if (
    !(ar2 instanceof Array && ar1 instanceof Array && ar1.length === ar2.length)
  )
    throw Error("Invalid argument");
  const zipped = [];
  for (let index = 0; index < ar1.length; index++) {
    zipped.push([ar1[index], ar2[index]]);
  }
  return zipped;
};
export const dict = (arr) => {
  dictionary = {};
  arr.forEach((element) => {
    dictionary[element[0]] = element[1];
  });
  return dict;
};

export const getFormFileFromMediaFile = (mediaFile) => {
  const filename = mediaFile.uri.split("/").pop();
  let fileExt = filename.split(".").pop();
  const mimeType = mediaFile.type + "/" + fileExt;
  return {
    uri: mediaFile.uri,
    name: filename,
    type: mimeType,
  };
};

export const getFormFileFromUri = (uri) => {
  const filename = uri.split("/").pop();
  let fileExt = filename.split(".").pop();
  const mimeType = `image/${fileExt}`;
  // const mimeType = Platform.OS === "ios" ? `image/jpg` : "image/jpeg";
  return {
    uri: uri,
    name: filename,
    type: mimeType,
  };
};

const mean = (list = []) => {
  if (list.length === 0) {
    return 0;
  }
  const sum = list.reduce((accumulated, current) => accumulated + current, 0);
  return sum / list.length;
};

export const getTriadsMonthlyMeans = (triads) => {
  const data = getMonthlyTriads(triads);
  const monthlyHeights = [];
  const monthlyWeights = [];
  const monthlypressure = [];
  const monthlyTemperature = [];
  const monthlyHeartRate = [];
  const months = moment.monthsShort();
  const currentMonth = moment().month();
  for (const month in data) {
    monthlyHeights.push(mean(data[month].height));
    monthlyWeights.push(mean(data[month].weight));
    monthlypressure.push(mean(data[month].blood_pressure));
    monthlyTemperature.push(mean(data[month].temperature));
    monthlyHeartRate.push(mean(data[month].heart_rate));
  }
  return {
    monthlyHeights: monthlyHeights.slice(0, currentMonth + 1),
    monthlyWeights: monthlyWeights.slice(0, currentMonth + 1),
    monthlypressure: monthlypressure.slice(0, currentMonth + 1),
    monthlyTemperature: monthlyTemperature.slice(0, currentMonth + 1),
    monthlyHeartRate: monthlyHeartRate.slice(0, currentMonth + 1),
    months: months.slice(0, currentMonth + 1),
  };
};

export const getTestResultsMonthlyMeans = (tests) => {
  const data = getMonthlyTestResults(tests);
  const monthlyCD4Count = [];
  const monthlyViralLoads = [];
  const months = moment.monthsShort();
  const currentMonth = moment().month();
  for (const month in data) {
    monthlyCD4Count.push(mean(data[month].cd4_count));
    monthlyViralLoads.push(mean(data[month].viral_load));
  }
  return {
    monthlyCD4Count: monthlyCD4Count.slice(0, currentMonth + 1),
    monthlyViralLoads: monthlyViralLoads.slice(0, currentMonth + 1),
    months: months.slice(0, currentMonth + 1),
  };
};

export const getPastYearsFromNow = (n) => {
  const currentYear = new Date(Date.now()).getFullYear();
  const years = [currentYear];
  let counter = 1;
  while (counter <= n + 1) {
    years.push(currentYear - counter);
    counter++;
  }
  return years;
};

export const toPercentage = (list) => {};

export const calculateBMI = (weight, height) => {
  // Convert height to meters
  height = height / 100;

  // Calculate BMI
  const bmi = weight / (height * height);
  return bmi;
};

export function getRandomColor() {
  // Generate random RGB values between 0 and 255
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Create the CSS color string in RGB format
  var color = "rgb(" + r + ", " + g + ", " + b + ")";

  return color;
}
