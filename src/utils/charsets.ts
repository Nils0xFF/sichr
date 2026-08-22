export const NUMBERS = "0123456789";
export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const ALPHA_NUM = NUMBERS + LOWERCASE + UPPERCASE;

// source: https://owasp.org/www-community/password-special-characters
export const BASIC_SYMBOLS = "!@#$-_";

export const WIDELY_SUPPORTED_SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,./?~`";

export const COMMONLY_REJECTED_SYMBOLS = "'\"\\<> ";

export const BASIC_CHARS = ALPHA_NUM + BASIC_SYMBOLS;
export const VALID_CHARS = ALPHA_NUM + WIDELY_SUPPORTED_SYMBOLS;
