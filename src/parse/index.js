const container = {};

function addUrlInfo(urlInfo) {
  if (!urlInfo || !urlInfo.method || !urlInfo.url) {
    return;
  }
  const method = urlInfo.method;
  const strs = urlInfo.url.split("/");
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
      }
      run.next[str] = temp;
      run = run.next[str];
    }
    ++i;
  }
}

function isInContainer(urlInfo) {
  if (!urlInfo || !urlInfo.method || !urlInfo.url) {
    return null;
  }
  const method = urlInfo.method;
  const strs = urlInfo.url.split("/");
  if (!container[method]) {
    return null;
  }
  let i = 0;
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
      return run.template;
    }
    ++i;
  }
  return null;
}

addUrlInfo({
  method: "GET",
  url: "https://developer.mozilla.org/open",
});

// addUrlInfo({
//   method: "GET",
//   url: "https://developer.mozilla.org/asdfeee",
// });

console.log(JSON.stringify(container));

export function setUrlInfo(urlInfo) {}

export function setGlobal(template) {
  if (!template || !template.data) {
    return;
  }
  const count = template.count ?? 0;
  const data = template.data;
  const ans = [];
  for (let i = 0; i < count; i++) {
    const obj = {};
    for (const key in data) {
      if (typeof data[key] === "function") {
        obj[key] = data[key]();
      } else if (Array.isArray(data[key])) {
      }
    }
  }
}
