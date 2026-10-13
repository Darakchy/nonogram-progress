// Загружает оригинальный скрипт игры, добавляет в него доступ к состоянию поля
// (window.__nnpState) и выполняет его на месте оригинала.
(function () {
  var url = document.currentScript && document.currentScript.src;
  if (!url) return;
  url += (url.indexOf("?") < 0 ? "?" : "&") + "nnp_orig=1";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  var src = xhr.responseText;

  try {
    // Имена переменных минифицированы — находим их по коду сериализации поля.
    var m1 = src.match(
      /for\(var \w+="",(\w+)=0;\1<(\w+);\1\+\+\)for\(var (\w+)=0;\3<(\w+);\3\+\+\)\{var \w+=\(-1>(\w+)\[\3\]\[\1\]/,
    );
    var m2 = src.match(
      /for\((\w+)=0;\1<\w+;\1\+\+\)\{for\((\w+)=0;0!==?(\w+)\[\1\]\[\2\]&&50>\2;\)\2\+\+/g,
    );
    var H = m1[2],
      W = m1[4],
      L = m1[5];
    var names = m2.map(function (s) {
      return s.match(/0!==?(\w+)\[/)[1];
    });
    var rows = names[0],
      cols = names[1];
    var hook =
      "window.__nnpState=function(){try{return{w:" +
      W +
      ",h:" +
      H +
      ",grid:" +
      L +
      ",rows:" +
      rows +
      ",cols:" +
      cols +
      "}}catch(e){return null}};";
    var end = src.lastIndexOf("})();");
    src = src.slice(0, end) + hook + src.slice(end);
  } catch (e) {
    console.warn("[Nonogram Progress] не удалось подключиться к игре:", e);
  }

  (0, eval)(src);
})();
