import crypto, {
  generateKeyPairSync,
  publicEncrypt,
  privateEncrypt,
  publicDecrypt,
  privateDecrypt,
} from "node:crypto";
import fs from "fs";
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  // modulusLength: 2048,
  // publicKeyEncoding: {
  //   type: "pkcs1",
  //   format: "",
  // },
  // privateKeyEncoding: {
  //   type: "pkcs1",
  //   format: "pem",
  // },
});

const publicKeyString = publicKey.export({
  type: "pkcs1",
  format: "pem",
});
const privateKeyString = privateKey.export({
  type: "pkcs1",
  format: "pem",
});

const message = "PRIVY2023";

fs.writeFileSync("public.pem", publicKeyString, { encoding: "utf-8" });

// const publicKeyFile = fs.readFileSync("public.pem", { encoding: "utf-8" })
// console.log(publicKeyFile);

const ENV_KEY = `-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAk/cyhrgVeFyNbAkjsAjfQV2CpiYATFpwDdyKR3eXsuxjSnSeVdlFpuu9gx6pVF3wMvZyZ+xLhxHMAdl7wflaYRi/M9Z+d+4IFFEhGOByYdpom27AhEwNMQzhMU2YG7mP9HhaFUL3LGXSciwC2KmORdoR2fta0TNRC+x9Jm3TDxX9CvrjwvbqN5NZDfGEXBPd4Yz4ApoMGClNTeW8GtbslFcKV2c0kz1jMA9AGfMhD74v4X4PT/ovN4C7tMXFBI5oKPApC9TwApqofnBdBa83aMSt8alAnKLLcscT/2vPAHFWHNg0CMlBfBZFEJVbgSsQaFQxX2Ofk6v8N++dah1cxwIDAQAB\n-----END RSA PUBLIC KEY-----`
const encryptMessage = publicEncrypt(
  {
    key: publicKeyString,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(message)
);

const decryptMessage = privateDecrypt(
  {
    key: privateKeyString,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(encryptMessage)
);

const encryptMessagePrivate = privateEncrypt(
  privateKeyString,
  Buffer.from(message)
);
const decryptMessagePublic = publicDecrypt(
  publicKeyString,
  Buffer.from(encryptMessagePrivate, "base64")
);

console.log(
  encryptMessagePrivate.toString("base64"),
  //   decryptMessage.toString()
  decryptMessagePublic.toString()
);
