// Панель прогресса поверх страницы кроссворда.
(function () {
  if (!document.getElementById("nonogram_canvas")) return;

  var box = document.createElement("div");
  box.style.cssText =
    "position:fixed;right:16px;bottom:16px;z-index:99999;min-width:190px;" +
    "padding:10px 12px;background:#fff;border:1px solid #bbb;border-radius:8px;" +
    "box-shadow:0 2px 10px rgba(0,0,0,.15);font:13px/1.45 Arial,sans-serif;color:#222;cursor:move;user-select:none";
  box.innerHTML =
    '<div style="font-weight:bold;margin-bottom:6px">Прогресс</div>' +
    '<div data-k="fill"></div>' +
    '<div style="height:8px;background:#eee;border-radius:4px;margin:4px 0 8px;overflow:hidden">' +
    '<div data-k="bar" style="height:100%;width:0;background:#3a7bd5;transition:width .2s"></div></div>' +
    '<div data-k="known" style="color:#555"></div>' +
    '<div data-k="lines" style="color:#555"></div>';
  document.body.appendChild(box);
  var el = function (k) {
    return box.querySelector('[data-k="' + k + '"]');
  };

  // Перетаскивание панели
  box.addEventListener("mousedown", function (e) {
    var r = box.getBoundingClientRect(),
      dx = e.clientX - r.left,
      dy = e.clientY - r.top;
    function mv(ev) {
      box.style.left = ev.clientX - dx + "px";
      box.style.top = ev.clientY - dy + "px";
      box.style.right = "auto";
      box.style.bottom = "auto";
    }
    function up() {
      removeEventListener("mousemove", mv);
      removeEventListener("mouseup", up);
    }
    addEventListener("mousemove", mv);
    addEventListener("mouseup", up);
  });

  // Значения клетки: >0 или <=-4 — закрашена; -1, -2 — крестик/точка; 0, -3 — пусто
  var isFilled = function (v) {
    return v > 0 || v <= -4;
  };
  var isCross = function (v) {
    return v === -1 || v === -2;
  };
  var clueSum = function (arr) {
    var s = 0;
    for (var i = 0; i < arr.length && arr[i] !== 0; i++) s += Math.abs(arr[i]);
    return s;
  };
  var pct = function (a, b) {
    return b ? Math.floor((100 * a) / b) : 0;
  };

  function update() {
    var st = window.__nnpState && window.__nnpState();
    if (!st || !st.grid || !st.w) {
      el("fill").textContent = window.__nnpState
        ? "Загрузка…"
        : "Нет связи с игрой";
      return;
    }
    var w = st.w,
      h = st.h,
      filled = 0,
      crosses = 0,
      total = 0,
      rowsDone = 0,
      colsDone = 0;
    var rowCnt = new Array(h).fill(0),
      colCnt = new Array(w).fill(0);
    for (var x = 0; x < w; x++)
      for (var y = 0; y < h; y++) {
        var v = st.grid[x][y];
        if (isFilled(v)) {
          filled++;
          rowCnt[y]++;
          colCnt[x]++;
        } else if (isCross(v)) crosses++;
      }
    for (y = 0; y < h; y++) {
      var s = clueSum(st.rows[y]);
      total += s;
      if (rowCnt[y] === s) rowsDone++;
    }
    for (x = 0; x < w; x++) if (colCnt[x] === clueSum(st.cols[x])) colsDone++;

    var p = pct(filled, total);
    el("fill").textContent =
      "Закрашено: " + filled + " / " + total + " (" + p + "%)";
    el("bar").style.width = Math.min(100, p) + "%";
    el("bar").style.background = filled > total ? "#d9534f" : "#3a7bd5";
    el("known").textContent =
      "Определено клеток: " + pct(filled + crosses, w * h) + "%";
    el("lines").textContent =
      "Строк: " + rowsDone + "/" + h + "| Столбцов: " + colsDone + "/" + w;
  }

  update();
  setInterval(update, 300);
})();
