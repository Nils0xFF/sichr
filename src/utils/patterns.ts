import {
  BASIC_CHARS,
  COMMONLY_REJECTED_SYMBOLS,
  LOWERCASE,
  NUMBERS,
  UPPERCASE,
  VALID_CHARS,
  WIDELY_SUPPORTED_SYMBOLS,
} from "./charsets.ts";

const escape = (value: string): string => value.replace(/[\\\]^ -]/g, "\\$&");

export const NUMBERS_ONLY = RegExp(`^[${NUMBERS}]+$`);

export const INCLUDES_LOWERCASE = RegExp(`[${LOWERCASE}]`);

export const INCLUDES_UPPERCASE = RegExp(`[${UPPERCASE}]`);

export const INCLUDES_NUMBERS = RegExp(`[${NUMBERS}]`);

export const INCLUDES_SPECIAL = RegExp(`[${escape(WIDELY_SUPPORTED_SYMBOLS)}]`);

export const INCLUDES_COMMONLY_REJECTED = RegExp(
  `[${escape(COMMONLY_REJECTED_SYMBOLS)}]`,
);

export const ONLY_BASIC_VALID_CHARS = RegExp(`^[${escape(BASIC_CHARS)}]+$`);

export const ONLY_VALID_CHARS = RegExp(`^[${escape(VALID_CHARS)}]+$`);
