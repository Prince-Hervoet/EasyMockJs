export const proxyFunctions = {
  send,
  open,
  setRequestHeader,
  getAllResponseHeaders,
};

function open(method, url, async, user, password) {}

function send(body) {
  console.log(this);
  if (this.onload) {
    this.onload();
  }
  this.responseText = "asdfasdfasdf";
  if (this.onloadend) {
    this.onloadend();
  }
}

function setRequestHeader(key, val) {}
function getAllResponseHeaders() {}

function virtualResponse() {}
