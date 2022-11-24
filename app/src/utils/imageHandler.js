const base64 = require("base-64");

const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64.encode(binary);
};
const readImageData = (imageData) => {
  return imageData.length == 0
    ? null
    : "data:image/jpeg;base64," + arrayBufferToBase64(imageData);
};

export default readImageData;
