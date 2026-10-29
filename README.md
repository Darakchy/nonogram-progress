# Nonogram Progress

A Chrome extension that shows your progress on a nonogram puzzle at [nonograms.ru](https://www.nonograms.ru).

A panel appears in the corner of the page (you can drag it around):

- **Filled** — how many cells are filled out of the required number (the sum of all clue numbers), with a progress bar. If more cells are filled than needed, the bar turns red.
- **Cells resolved** — what share of the whole grid has been marked (filled or marked with a cross/dot).
- **Rows / columns** — how many lines have a filled-cell count that matches their clues.

## Installation

1. Download the repository: click the green **Code → Download ZIP** button, then unzip the archive.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (the toggle in the top right corner).
4. Click **Load unpacked** and select the unzipped folder (the one containing `manifest.json`).
5. Open or reload a puzzle page.

It also works in Edge, Yandex Browser, and other Chromium-based browsers.

## How it works

The site draws the grid on a canvas, and the grid's state is stored inside the game script. The extension intercepts the loading of this script: it downloads the original from the site, adds a function that reads the grid state, and runs it. The game itself works as usual. The extension doesn't send or collect anything.

If the site updates its game script, the panel may show "No connection to the game", but the puzzle itself won't be affected.

# Nonogram Прогресс 
Расширение для Chrome, которое показывает прогресс решения японского кроссворда на [nonograms.ru](https://www.nonograms.ru).

В углу страницы появляется панель (её можно перетаскивать):

- **Закрашено** — сколько клеток закрашено из нужного количества (сумма всех чисел-подсказок), с полоской прогресса. Если закрашено больше нужного, полоска становится красной.
- **Определено клеток** — какая часть всего поля уже размечена (закрашено или отмечено крестиком/точкой).
- **Строк / столбцов** — в скольких линиях число закрашенных клеток совпадает с подсказками.

## Установка

1. Скачайте репозиторий: зелёная кнопка **Code → Download ZIP**, затем распакуйте архив.
2. Откройте в Chrome страницу `chrome://extensions`.
3. Включите **Режим разработчика** (переключатель справа вверху).
4. Нажмите **Загрузить распакованное** и выберите распакованную папку (ту, где лежит `manifest.json`).
5. Откройте или обновите страницу кроссворда.

Работает также в Edge, Яндекс Браузере и других браузерах на основе Chromium.

## Как это работает

Поле на сайте рисуется на canvas, а его состояние хранится внутри скрипта игры. Расширение подменяет загрузку этого скрипта: скачивает оригинал с сайта, добавляет в него функцию для чтения состояния поля и запускает. Сама игра работает как обычно. Расширение ничего не отправляет и не собирает.

Если сайт обновит скрипт игры, панель может показать «Нет связи с игрой», но на сам кроссворд это не повлияет.
