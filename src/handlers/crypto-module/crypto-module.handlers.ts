import { cipherTextService } from "./crypto-module.services";

export const handlerCipher = async (
) => {
  // console.log("reqSHE: ", req);
  // console.log("resSHE: ", res);
  try {
    const result = await cipherTextService();
    return result;
  } catch (error) {
    return;
  }
};
