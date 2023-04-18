import { easyMock, easyMockContainer } from "../parse";

let template;

function open(method, url, async, user, password) {
  template = easyMock.getTemplate({ method, url });
}

function send(body) {
  if (this.onload) {
    this.onload();
  }
  this.responseText = virtualResponse();
  if (this.onloadend) {
    this.onloadend();
  }
}

function setRequestHeader(key, val) {}
function getAllResponseHeaders() {}

function virtualResponse() {
  if (template) {
    return easyMockContainer.parseTemplateData(template);
  } else {
    return {};
  }
}

export const proxyFunctions = {
  send,
  open,
  setRequestHeader,
  getAllResponseHeaders,
};
