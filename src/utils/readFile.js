export const ReadFile = function (filePath) {
  let xhr = new XMLHttpRequest();
  const okStatus = document.location.protocol === "file:" ? 0 : 200;
  xhr.open("GET", filePath, false);
  xhr.overrideMimeType("text/html;charset=utf-8"); //默认utf-8
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
};
