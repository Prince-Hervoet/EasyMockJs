import { proxyFunctions } from "./functions.js";
import axios from "axios";

const real = XMLHttpRequest;
const functionsKeys = Object.keys(proxyFunctions);

export function intercept() {
  XMLHttpRequest = function () {
    const realObj = new real();
    const ans = {};
    for (const el in realObj) {
      if (typeof realObj[el] === "function") {
        ans[el] = proxyFunction(realObj[el]);
      } else {
        ans[el] = realObj[el];
      }
    }
    return ans;
  };
}

export function giveBack() {
  XMLHttpRequest = real;
}

function proxyFunction(realFunction) {
  if (!realFunction) {
    return () => {};
  }
  const index = functionsKeys.indexOf(realFunction.name);
  if (index === -1) {
    return realFunction;
  }
  return proxyFunctions[functionsKeys[index]] || (() => {});
}

const test = XMLHttpRequest();
console.log(test.send());
axios("/user/12345");
