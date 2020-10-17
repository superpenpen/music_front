import Cookies from 'js-cookie'

export const TokenKey = 'token'

export function getToken(): any {
  return Cookies.get(TokenKey)
}

export function setToken(token: any): void {
  Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  Cookies.remove(TokenKey)
}
