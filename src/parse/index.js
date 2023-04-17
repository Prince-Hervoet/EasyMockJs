import { randomeGenerate } from "./generate.js";

const container = {};
const globalTemplate = {};

function addUrlInfo(urlInfo) {
  if (!urlInfo || !urlInfo.method || !urlInfo.url) {
    return;
  }
  const method = urlInfo.method;
  const strs = urlInfo.url.split("/");
  const template = urlInfo.tempalte ?? globalTemplate;
  if (!container[method]) {
    container[method] = { next: {} };
  }
  let run = container[method];
  let i = 0;
  for (const str of strs) {
    if (!str) {
      ++i;
      continue;
    }
    if (str in run.next) {
      run = run.next[str];
    } else {
      let temp = {
        next: {},
      };
      if (i === strs.length - 1) {
        temp.has = true;
        temp.template = template;
      }
      run.next[str] = temp;
      run = run.next[str];
    }
    ++i;
  }
}

function getTemplate(urlInfo) {
  if (!urlInfo || !urlInfo.method || !urlInfo.url) {
    return {};
  }
  const method = urlInfo.method;
  const strs = urlInfo.url.split("/");
  if (!container[method]) {
    return null;
  }
  let i = 0;
  let run = container[method];
  for (const str of strs) {
    if (!str) {
      ++i;
      continue;
    }
    if (str in run.next) {
      run = run.next[str];
    } else if ("*" in run.next) {
      run = run.next["*"];
    } else {
      return null;
    }
    if (i === strs.length - 1 && run.has) {
      return run.template ?? globalTemplate;
    }
    ++i;
  }
  return {};
}

addUrlInfo({
  method: "GET",
  url: "https://developer.mozilla.org/open",
  tempalte: [
    {
      username: () => randomeGenerate.generateString(2, ["Mike ", "Tell"]),
      id: () => randomeGenerate.uuid(),
      info: {
        id: () => randomeGenerate.generateInteger(),
        address: [() => randomeGenerate.generateString(3), 3],
        uuk: "asdfasdf",
      },
    },
    4,
  ],
});

const test = getTemplate({
  method: "GET",
  url: "https://developer.mozilla.org/open",
});

console.log(test);

function setUrlInfo(urlInfo, template) {
  if (!template) {
    return;
  }
  urlInfo.template = template;
  addUrlInfo(urlInfo);
}

function setGlobal(template) {
  if (!template) {
    return;
  }
  globalTemplate = template;
}

function parseTemplateData(template) {
  if (!template) {
    return [{}];
  }
  if (Array.isArray(template)) {
    const ans = [];
    if (template.length === 2 && typeof template[1] === "number") {
      for (let i = 0; i < template[1]; i++) {
        ans.push(parseTemplateData(template[0]));
      }
    } else {
      for (const value of template) {
        ans.push(parseTemplateData(value));
      }
    }
    return ans;
  } else if (typeof template === "function") {
    return template();
  } else if (typeof template === "object") {
    const obj = {};
    for (const key in template) {
      const value = template[key];
      if (typeof value === "function") {
        obj[key] = value();
      } else {
        obj[key] = parseTemplateData(value);
      }
    }
    return obj;
  }
  return template;
}

export const easyMock = {
  setGlobal,
  setUrlInfo,
  getTemplate,
  parseTemplateData,
};

// const test = parseTemplateData([
//   {
//     username: () => randomeGenerate.generateString(2, ["Mike ", "Tell"]),
//     id: () => randomeGenerate.uuid(),
//     info: {
//       id: () => randomeGenerate.generateInteger(),
//       address: [() => randomeGenerate.generateString(3), 3],
//       uuk: "asdfasdf",
//     },
//   },
//   4,
// ]);
// console.log(test);
// console.log(test[0].info.address);
