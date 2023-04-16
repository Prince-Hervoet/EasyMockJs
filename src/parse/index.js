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

addUrlInfo({
  method: "GET",
  url: "https://developer.mozilla.org/open",
});

// addUrlInfo({
//   method: "GET",
//   url: "https://developer.mozilla.org/asdfeee",
// });

console.log(JSON.stringify(container));
