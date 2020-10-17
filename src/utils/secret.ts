import CryptoJS from 'crypto-js'

const SECRET_KEY_CODE = 'cstorcstorcreate'

const SECRET_KEY = CryptoJS.enc.Utf8.parse(SECRET_KEY_CODE); //十六位十六进制数作为密钥

//解密方法
export function Decrypt(word: string): string {
  var decrypted = CryptoJS.AES.decrypt(word, SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8)
}

//加密方法
export function Encrypt(word: string): string {
  var encryptedData = CryptoJS.AES.encrypt(word, SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString()
}
