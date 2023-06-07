import { createHmac } from "node:crypto";

function hashingHmac(message) {
  const SECRET = "PRIVY2023";
  const hmac = createHmac("sha256", SECRET);
  hmac.update(message);

  const hashedMessage = hmac.digest("base64");

  return hashedMessage;
}

console.log(hashingHmac("TESTING"));
// result = dKeBpwYuKsF8g4jXLXCZ9+DtUDm636COZXHTjsK1AoI=
