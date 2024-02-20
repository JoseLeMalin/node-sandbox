import {
  scrypt, // Recommended by Nodejs as it is async
  randomFill, // Recommended by Nodejs as it is async
} from "crypto";

export const algorithm = "aes-192-cbc";
// export const algorithm256 = "aes-256-cbc";
export const keyLength = 24; // Has to be 24 to match the aes-192-cbc algorithm
export const password = "Password used to generate key";

export const generateSecretKey = () => {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(password, "salt", keyLength, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey);
    }),
  );
};
export const generateIv = () => {
  return new Promise<Uint8Array>((resolve, reject) =>
    randomFill(new Uint8Array(16), (err, iv) => {
      if (err) reject(err);
      resolve(iv);
    }),
  );
};
