import { callAuthAPI } from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
// const ROOT_LARAVEL = process.env.NEXT_LARAVEL_API;
const API_VERSION = `api/v1`;

export async function setSignUp(data) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

  return callAuthAPI({ url, method: 'POST', data });
}

export async function setSignIn(data) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signin`;

  return callAuthAPI({ url, method: 'POST', data });
}
