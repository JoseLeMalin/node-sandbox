import jwt, { SignOptions } from "jsonwebtoken";
import { readFile } from "fs/promises";
import { ApiError, messageCode } from "../express/errors";

// https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk
export const generateAccessToken = async (userId: string) => {
  if (!process.env.JWT_PRIV_KEY_PATH || !process.env.JWT_PASSPHRASE)
    throw new ApiError(
      404,
      messageCode.MISSING_ENV_VARIABLE,
      "JWT_PRIV_KEY_PATH or JWT_PASSPHRASE not found",
    );

  const privateKey = await readFile(process.env.JWT_PRIV_KEY_PATH, {
    encoding: "utf8",
  });
  if (!privateKey)
    throw new ApiError(
      404,
      messageCode.FILEREAD_FAILED,
      "PrivateKey Readfile failed",
    );

  const privateSecret = {
    key: Buffer.from(privateKey),
    passphrase: process.env.JWT_PASSPHRASE,
  };
  const signOptions: SignOptions = {
    algorithm: "RS256",
    expiresIn: "5m",
  };
  console.log("privateSecret SHE: ", privateSecret);
  const signedJwt = jwt.sign({ userId: userId }, privateKey, signOptions);
  console.log("signedJwt SHE: ", signedJwt);


  return signedJwt;
};

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
export const generateRefreshToken = async (userId: string, jti: string) => {
  if (!process.env.JWT_PRIV_KEY_PATH || !process.env.JWT_PASSPHRASE)
    throw new ApiError(
      404,
      messageCode.MISSING_ENV_VARIABLE,
      "JWT_REFRESH_SECRET not found",
    );
  const privateKey = await readFile(process.env.JWT_PRIV_KEY_PATH, {
    encoding: "utf8",
  });
  if (!privateKey)
    throw new ApiError(
      404,
      messageCode.FILEREAD_FAILED,
      "PrivateKey Readfile failed",
    );
  const privateSecret = {
    key: privateKey,
    passphrase: process.env.JWT_PASSPHRASE,
  };
  const signOptions: SignOptions = {
    algorithm: "RS256",
    expiresIn: "7d",
  };
  return jwt.sign(
    {
      id: jti,
      userId: userId,
    },
    privateSecret,
    signOptions,
  );
};

// export const generateTokens = async (user: User, jti: string) => {
export const generateTokens = async (userId: string, jti: string) => {
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId, jti);

  return {
    accessToken,
    refreshToken,
  };
};

// export const authorizerService = async (
//
//     event: APIGatewayRequestAuthorizerEvent
//
// ): Promise<APIGatewayAuthorizerResult> => {
//
//     const tokenValue = Buffer.from(event.headers.Authorization.split(" ")[1]).toString();
//
//     const decodedToken = decode(tokenValue, { json: true, complete: true });
//
//
//
//     const jwtHeader = decodedToken.header;
//
//     const jwtPayload = decodedToken.payload;
//
//
//
//     let parsedToken: JwtPayload = null;
//
//     if (typeof jwtPayload === "string") {
//
//         parsedToken = JSON.parse(jwtPayload) as JwtPayload;
//
//     } else {
//
//         parsedToken = jwtPayload;
//
//     }
//
//     parsedToken.exp *= 1000; // The value has to be transformed from seconds to milliseconds
//
//
//
//     if (dayjs(parsedToken.exp).isBefore(dayjs())) {
//
//         return generatePolicy(parsedToken["type"], AuthorizationAction.deny, event.methodArn);
//
//     }
//
//     const client = jwksClient({
//
//         jwksUri: process.env.JWKS_URL,
//
//         timeout: 10000,
//
//     });
//
//
//
//     const publicSigninKey = await client.getSigningKey(jwtHeader.kid);
//
//
//
//     // Verify if the token provided is compliant
//
//     verify(tokenValue, publicSigninKey.getPublicKey(), { complete: true }, err => {
//
//         if (err) {
//
//             logger.info(`Token verification failed - Error: ${err}`);
//
//             return generatePolicy(parsedToken["type"], AuthorizationAction.deny, event.methodArn);
//
//         }
//
//     });
//
//
//
//     // const contextValues: { [key: string]: string } = {};
//
//     return generatePolicy(parsedToken["type"], AuthorizationAction.allow, event.methodArn);
//
// };
//
//
//
// export const generatePolicy = (
//
//     principalId: EntityType,
//
//     effect: AuthorizationAction,
//
//     resource: string,
//
//     context?: { [key: string]: string }
//
// ): APIGatewayAuthorizerResult => {
//
//     const statement: Statement = {
//
//         Action: "execute-api:Invoke",
//
//         Effect: effect,
//
//         Resource: resource,
//
//     };
//
//     const policyDocument: PolicyDocument = {
//
//         Version: "2012-10-17",
//
//         Statement: [],
//
//     };
//
//
//
//     policyDocument.Statement.push(statement);
//
//
//
//     const authResponse: APIGatewayAuthorizerResult = {
//
//         principalId: principalId,
//
//         policyDocument: policyDocument,
//
//         context, // Optional output
//
//     };
//
//     return authResponse;
//
// }
