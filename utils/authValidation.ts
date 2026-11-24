import { RegisterData, RegisterErrors } from '../types/auth';

interface ValidationResult {
  errors: RegisterErrors;
  isValid: boolean;
}

export function validateRegister(
  data: RegisterData,
  confirmPassword: string
): ValidationResult {

  const errors: RegisterErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Veuillez saisir votre nom complet.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email.trim()) {
    errors.email = 'Veuillez saisir votre adresse e-mail.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Adresse e-mail invalide.';
  }

  if (!data.password) {
    errors.password = 'Veuillez saisir un mot de passe.';
  } else if (data.password.length < 8) {
    errors.password = 'Minimum 8 caractères.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Veuillez confirmer votre mot de passe.';
  } else if (data.password !== confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}