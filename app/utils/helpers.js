import { Linking } from "react-native";
import { BASE_URL } from "./contants";

const _ = require("lodash");
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

export const pickX = (obj, paths) =>
  _.transform(
    paths,
    (result, path) => {
      const value = _.get(obj, path);
      _.set(result, path, value !== undefined ? value : null);
    },
    {}
  );

export const getImageUrl = (path, defaultValue = null) =>
  path ? `${BASE_URL}${path}` : defaultValue;

export const getRandomElementFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const callNumber = (phone) => {
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
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
