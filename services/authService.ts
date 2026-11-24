import { RegisterData } from '../types/auth';

export async function registerUser(data: RegisterData) {

  const endpoint = process.env.EXPO_PUBLIC_REGISTER_URL;

  if (!endpoint) {
    throw new Error(
      "L'URL de l'API d'inscription n'est pas configurée."
    );
  }

  const response = await fetch(endpoint, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Une erreur est survenue lors de l'inscription."
    );
  }

  return result;
}