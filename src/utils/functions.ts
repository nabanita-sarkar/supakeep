import { customAlphabet } from "nanoid";

export const idGen = customAlphabet("0123456789abcdef", 24);
