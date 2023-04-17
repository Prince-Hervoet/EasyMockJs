import { easyMock } from "../parse";

export const proxyFunctions = {
  send,
  open,
  setRequestHeader,
  getAllResponseHeaders,
};

let template;

function open(method, url, async, user, password) {
  template = easyMock.getTemplate({ method, url });
}

function send(body) {
  if (this.onload) {
    this.onload();
  }
  this.responseText = easyMock.parseTemplateData(template);
  if (this.onloadend) {
    this.onloadend();
  }
}

function setRequestHeader(key, val) {}
function getAllResponseHeaders() {}

function virtualResponse() {}
