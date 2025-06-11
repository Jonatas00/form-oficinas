export function formatWhatsApp(input: string): string {
  // Remove non-numeric characters
  const numbersOnly = input.replace(/\D/g, "");

  // Limit to 11 digits (DDD + phone number)
  const trimmedNumber = numbersOnly.slice(0, 11);

  // Format as "XX XXXXX-XXXX" for 11-digit numbers
  if (trimmedNumber.length === 11) {
    return `${trimmedNumber.slice(0, 2)} ${trimmedNumber.slice(2, 7)}-${trimmedNumber.slice(7)}`;
  }

  return trimmedNumber;
}
