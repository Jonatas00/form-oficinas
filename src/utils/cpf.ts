export const formatCPF = (input: string): string => {
  let cpf = input.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (cpf.length > 11) {
    cpf = cpf.slice(0, 11); // Limita a 11 dígitos
  }
  if (cpf.length > 9) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cpf.length > 6) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if (cpf.length > 3) {
    cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }
  return cpf;
};

export const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove non-numeric characters

  // CPF cannot be empty and must have exactly 11 digits
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validate first digit
  let sum = 0;
  let weight = 10;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * weight--;
  }
  let firstCheckDigit = (sum * 10) % 11;
  if (firstCheckDigit === 10 || firstCheckDigit === 11) firstCheckDigit = 0;
  if (firstCheckDigit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validate second digit
  sum = 0;
  weight = 11;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * weight--;
  }
  let secondCheckDigit = (sum * 10) % 11;
  if (secondCheckDigit === 10 || secondCheckDigit === 11) secondCheckDigit = 0;
  if (secondCheckDigit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}