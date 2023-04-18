import { proxyFunctions } from "./functions.js";

const real = XMLHttpRequest;
const functionsKeys = Object.keys(proxyFunctions);

function intercept() {
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

function giveBack() {
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
  return proxyFunctions[functionsKeys[index]] || realFunction;
}

export const easyMock = {
  intercept,
  giveBack,
};
