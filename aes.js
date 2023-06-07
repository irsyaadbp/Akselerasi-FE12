import crypto from "crypto";
const ENC_KEY = crypto.randomBytes(32); // set random encryption key
const IV = crypto.randomBytes(16); // set random initialisation vector

const encrypt = (val) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decrypt = (encrypted) => {
  let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

// const encryptedMessage = encrypt("MESSAGE");
// const decryptedMessage = decrypt(encryptedMessage);
// console.log(encryptedMessage, decryptedMessage);

/**
 * @deprecated
 */

// const encrypt = (message) => {
//   const mykey = crypto.createCipher("aes-128-cbc", "mypassword");
//   let mystr = mykey.update(message, "utf8", "hex");
//   mystr += mykey.final("hex");

//   return mystr;
// };
// const decrypt = (encrypted) => {
//   const mykey = crypto.createDecipher("aes-128-cbc", "mypassword");
//   let mystr = mykey.update(encrypted, "hex", "utf8");
//   mystr += mykey.final("utf8");

//   return mystr;
// };
