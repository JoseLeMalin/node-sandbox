import {
  createHash,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  generateKeyPairSync,
  // generateKeyPairSync,
} from "crypto";
import {
  algorithm,
  generateSecretKey,
  generateIv,
} from "../../utils/crypto-module/hooks";
import { ApiError, messageCode } from "../../utils/express/errors";

export const hashTextService = async (inputText: string) => {
  const hash = randomBytes(16);
  const resultHash = await hashText(inputText, hash);
  console.log("resultHash: ", resultHash);
  // const resultVerify = await verifyPassword(inputText, resultHash);
  // console.log("resultVerify : ", resultVerify);

  return resultHash;
};

// Function to hash a password
const hashText = async (password: string, salt: Buffer): Promise<string> => {
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
export const verifyPassword = (password: string, storedHash: string) => {
  return new Promise<boolean>((resolve, reject) => {
    console.log("hash", storedHash);
    const hash = createHash("sha256");
    console.log("hash", hash);

    // Generate the hash of the provided password
    hash.update(password);
    console.log("hash update", hash);
    const hashedPassword = hash.digest("hex");
    console.log("hashedPassword", hashedPassword);
    console.log("hashedPassword === storedHash", hashedPassword === storedHash);

    // Compare the generated hash with the stored hash
    if (hashedPassword === storedHash) return resolve(true); // Passwords match

    return reject(false); // Passwords do not match
  });
};

export const cipherTextService = async () => {
  const resultEncrypt = await encrypt("test a encrypt");
  console.log("ResultEncrypt: ", resultEncrypt);

  return resultEncrypt;
};

export const decipherTextService = async (encryptedText: string) => {
  const resultDecrypt = await decrypt(encryptedText);
  console.log("ResultDecrypt: ", resultDecrypt);
  return resultDecrypt;
};

// Function to encrypt a string
export const encrypt = async (text: string) => {
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
export const decrypt = async (encryptedText: string) => {
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

export const generatePemService = async () => {
  if (!process.env.JWT_PASSPHRASE)
    throw new ApiError(
      404,
      messageCode.MISSING_ENV_VARIABLE,
      "Env variable passphrase not found",
    );

  // const privateKeyFirst = createPrivateKey({
  //   key: file,
  //   passphrase: "Passw0rd1", // passphraase has to be the real one
  // });
  // console.log("privateKeyFirst: ", privateKeyFirst);

  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki", // It is recommended to encode public keys as 'spki'
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // private keys as 'pkcs8' with encryption for long-term storage
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: process.env.JWT_PASSPHRASE,
    },
  });
  console.log("publicKey: ", publicKey);
  console.log("privateKey: ", privateKey);
};
