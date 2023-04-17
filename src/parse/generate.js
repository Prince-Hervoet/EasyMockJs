import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const MAX_INTEGER = 9999999999;
export function generateInteger(start, end) {
  if (typeof start !== "number" || typeof end !== "number" || start > end) {
    return Math.floor(Math.random() * MAX_INTEGER);
  }
  return Math.floor(Math.random() * (end - start) + start);
}

function generateFloat(start, end) {}

export function generateString(length, ruleArray) {
  let str = "";
  if (!ruleArray || !Array.isArray(ruleArray) || ruleArray.length === 0) {
    for (let i = 0; i < length; i++) {
      const number = generateInteger(33, 126);
      str += String.fromCharCode(number);
    }
  } else {
    for (let i = 0; i < length; i++) {
      const number = generateInteger(0, ruleArray.length);
      console.log(ruleArray.length);
      str += ruleArray[number];
    }
  }
  return str;
}

export function uuid() {
  return uuidv4();
}

export function nanoId() {
  return nanoid();
}

export function generateDate(rule) {
  if (!rule) {
    return new Date().getTime();
  }
}
