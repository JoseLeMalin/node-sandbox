import {
  createHash,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  // createPrivateKey,
  // generateKeyPairSync,
} from "crypto";
// import fs from "fs";
// import path from "path";
import {
  algorithm,
  generateSecretKey,
  generateIv,
} from "../../utils/crypto-module/hooks";

export const hashTextService = async () => {
  const hash = randomBytes(16);
  const resultHash = await hashPassword("passwordtestShe", hash);
  console.log("resultHash: ", resultHash);
  const resultVerify = await verifyPassword("passwordtestShe", resultHash);
  console.log("resultVerify : ", resultVerify);

  return resultHash;
};
export const cipherTextService = async () => {
  const resultEncrypt = await encrypt("test a encrypt")
  console.log("ResultEncrypt: ", resultEncrypt);
  
  const resultDecrypt = await decrypt(resultEncrypt)
  console.log("ResultDecrypt: ", resultDecrypt);
  return {resultEncrypt, resultDecrypt}
};

// Function to hash a password
const hashPassword = async (
  password: string,
  salt: Buffer,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const hash = createHash("sha256");

      // Add salt to the password before hashing
      const saltedPassword = password + salt;

      // Update the hash object with the salted password
      hash.update(saltedPassword);

      // Generate the hashed password
      const hashedPassword = hash.digest("hex");

      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to verify a password
function verifyPassword(password: string, storedHash: string) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");

    // Generate the hash of the provided password
    hash.update(password);
    const hashedPassword = hash.digest("hex");

    // Compare the generated hash with the stored hash
    if (hashedPassword === storedHash) {
      resolve(true); // Passwords match
    } else {
      resolve(false); // Passwords do not match
    }
  });
}

// Function to encrypt a string
const encrypt = async (text: string) => {
  const [secretKey, iv] = await Promise.all([
    generateSecretKey(),
    generateIv(),
  ]);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const ivToHex = Buffer.from(iv).toString("hex");
  return `${ivToHex}:${encrypted}`;
};

// Function to decrypt an encrypted string
const decrypt = async (encryptedText: string) => {
  const [ivpassword, passworduser] = encryptedText.split(":");
  const secretKey = await generateSecretKey();
  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivpassword, "hex"),
  );
  let decrypted = decipher.update(passworduser, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// server.get('<route>', async (req, res, next) => {
// try {
// const filepath = path.dirname('/v3/cache/');
// console.log('filepath: ', filepath);
// console.log('filepat2: ', `${filepath}/cache/key-filename.pem`);
// const file = fs.readFileSync(`${filepath}/cache/key-filename.pem`,
// { encoding: 'utf8' });
//
// const privateKeyFirst = createPrivateKey({
// key: file,
// passphrase: 'Passw0rd1', // passphraase has to be the real one
// });
// console.log('privateKeyFirst: ', privateKeyFirst);
//
// const { publicKey, privateKey } = generateKeyPairSync('rsa', {
// modulusLength: 4096,
// publicKeyEncoding: {
// type: 'spki',
// format: 'pem',
// },
// privateKeyEncoding: {
// type: 'pkcs8',
// format: 'pem',
// cipher: 'aes-256-cbc',
// passphrase: 'top secret',
// },
// });
// console.log('publicKey: ', publicKey);
// console.log('privateKey: ', privateKey);
// res.status(200);
// res.send();
// } catch (error) {
// console.error('Error: ', error);
// next(error);
// }