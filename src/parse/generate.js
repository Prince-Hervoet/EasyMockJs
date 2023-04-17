import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const MAX_INTEGER = 9999999999;
function generateInteger(start, end) {
  if (typeof start !== "number" || typeof end !== "number" || start > end) {
    return Math.floor(Math.random() * MAX_INTEGER);
  }
  return Math.floor(Math.random() * (end - start) + start);
}

function generateFloat(start, end) {
  if (typeof start !== "number" || typeof end !== "number" || start > end) {
    return Math.random() * MAX_INTEGER;
  }
  return Math.random() * (end - start) + start;
}

function generateString(length, ruleArray) {
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

function uuid() {
  return uuidv4();
}

function nanoId() {
  return nanoid();
}

function generateDate(rule) {
  if (!rule) {
    return new Date().getTime();
  }
}

export const randomeGenerate = {
  generateInteger,
  generateFloat,
  generateString,
  generateDate,
  uuid,
  nanoId,
};
