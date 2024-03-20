//Объявление переменных:
const expectedOrder = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, '']
const dragItems = document.querySelectorAll('.drag-item')
let showResult = document.getElementById('showResult')
showResult.style.color = 'green'
let inputNew_name = document.getElementById('new_name')
let showName = document.getElementById('showName')
/* - expectedOrder - массив, представляющий ожидаемый порядок элементов для игры. Включает числа от 1 до 15 и пустую строку.
- dragItems - коллекция DOM-элементов с классом drag-item.
- showResult - DOM-элемент, в котором будет отображаться результат игры.
- inputNew_name - DOM-элемент для ввода имени игрока.
- showName - DOM-элемент, в котором будет отображено имя игрока.*/

/*Обработчик события submit для формы: Данный код добавляет обработчик события submit на форму с id "username".
При отправке формы он предотвращает её действие по умолчанию (отправку) и обновляет содержимое элемента с id "showName"
значением, введённым в поле ввода с id "new_name".*/
const form = document.getElementById('username')
// Добавляем обработчик события submit на форму
form.addEventListener('submit', function (event) {
    event.preventDefault() // Предотвращаем отправку формы
    let playerName = inputNew_name.value // Получаем введенное имя из поля ввода
    showName.textContent = playerName// Обновляем содержимое элемента с id "showName" новым именем
})

//Обработчик события "shuffle": - перемешать пятнашки
/*Добавляется обработчик события "click" на элемент с id "shuffle".
При клике вызывается функция shuffleAndDisplay(), которая перемешивает элементы и проверяет порядок.*/
document.getElementById('shuffle').addEventListener('click', () => {
    shuffleAndDisplay()
})

/*   - Функция `shuffleArray(arr)` производит перемешивание массива с числами и пустой строкой,
используя алгоритм Фишера-Йетса с добавлением случайного числа для сортировки.
Функция принимает массив arr.
Вначале каждому элементу массива присваивается случайное число sort с помощью метода map.
Массив с элементами и случайными числами сортируется по возрастанию случайных чисел.
Затем возвращается массив, состоящий только из значений элементов, таким образом, массив перемешивается.*/
function shuffleArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}

/*   - Функция `shuffleAndDisplay()` перемешивает элементы на странице, используя результат `shuffleArray(expectedOrder)`.
Вначале вызывается функция shuffleArray(expectedOrder), чтобы получить перемешанный массив.
Затем выбираются все родительские контейнеры (.drag-list).
Для каждого контейнера выбираются дочерние элементы (ячейки игрового поля) и присваиваются им значения из перемешанного массива.
Вызывается функция checkOrder() для проверки правильности расположения элементов*/
function shuffleAndDisplay() {
    const shuffledArray = shuffleArray(expectedOrder)
    const parents = document.querySelectorAll('.drag-list')
    let index = 0

    parents.forEach(parent => {
        const items = Array.from(parent.children)
        items.forEach(item => {
            item.textContent = shuffledArray[index++]
        })
    })

    checkOrder() // Проверяем правильность расположения элементов после перемешивания
}

// Функция проверки на правильное место расположения элементов
/*   - Функция `checkOrder()` проходит по всем элементам, сравнивая их текстовое содержимое с ожидаемым порядком.
Если большинство элементов расположены правильно, выводится соответствующее сообщение.
- Выбираются все родительские контейнеры (.drag-list) и для каждого контейнера выбираются дочерние элементы (ячейки игрового поля).
- Создается массив currentOrder, содержащий значения текстового содержимого каждой ячейки как целые числа.
- Переменная correctCount используется для подсчета количества правильно расположенных элементов.
- Проходится по массиву currentOrder и сравнивается каждый элемент с ожидаемым значением в expectedOrder.
- В зависимости от количества правильно расположенных элементов выводится соответствующее сообщение в showResult.*/
function checkOrder() {
    const parents = document.querySelectorAll('.drag-list')
    const allItems = []

    parents.forEach(parent => {
        const items = Array.from(parent.children);
        allItems.push(...items)
    })

    const currentOrder = allItems.map(item => parseInt(item.textContent))
    let correctCount = 0

    for (let i = 0; i < currentOrder.length; i++) {
        if (currentOrder[i] === expectedOrder[i]) {
            correctCount++
        }
    }

    if (correctCount === (expectedOrder.length - 1)) {
        showResult.innerHTML = 'WIN !!!'
    } else {
        showResult.innerHTML = 'Right position: ' + correctCount
    }
}


let currentItem

// - Функция `handleDragStart(e)` Этот обработчик запоминает текущий перетаскиваемый элемент, устанавливает атрибуты
// для перетаскивания и сохраняет внутренний HTML элемента.
/* 1. function handleDragStart(e) { - Объявление функции с именем handleDragStart, которая принимает параметр e, представляющий
объект события. Эта функция будет вызвана при начале перетаскивания элемента.
2. currentItem = this -  Здесь устанавливается значение переменной currentItem, которая является глобальной переменной,
равным текущему элементу, который был начат для перетаскивания. Ключевое слово this в данном контексте ссылается на элемент,
на котором было начато перетаскивание.
3. e.dataTransfer.effectAllowed = 'move' - Это устанавливает свойство effectAllowed объекта dataTransfer события перетаскивания
(e.dataTransfer). Значение 'move' указывает, что элемент может быть перемещен.
4. e.dataTransfer.setData('text/html', this.innerHTML) - Здесь устанавливается данные для перетаскивания. Метод setData()
объекта dataTransfer устанавливает данные, которые будут переданы в момент бросания элемента. Первый аргумент 'text/html'
указывает на формат данных, а второй аргумент this.innerHTML содержит HTML-код текущего элемента. Это означает, что при
бросании элемента на другую область, внутренний HTML-код этого элемента будет передан вместе с событием перетаскивания.*/
function handleDragStart(e) {
    currentItem = this
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.innerHTML)
}

/*- `handleDragEnter()` обрабатывает событие наведения мыши на элемент. Если элемент можно перетащить на текущее место,
и он соседний, то добавляется класс `drag-over`.
1. function handleDragEnter() {
-Это объявление функции с именем handleDragEnter, которая не принимает никаких параметров.
Эта функция будет вызываться при событии "dragenter", когда перетаскиваемый элемент входит в область другого элемента.
2. if (this !== currentItem && currentItem != null) {
-Эта строка начинает условную проверку. Здесь проверяется, не является
ли текущий элемент (this) тем же самым элементом, который был начат для перетаскивания (currentItem). Также проверяется,
что currentItem не равен null. Если оба условия выполняются, это означает, что перетаскиваемый элемент входит в другую область.
3. const isAdjacentBlock = findAdjacentBlock(this, currentItem)
-Здесь вызывается функция findAdjacentBlock с двумя
аргументами: текущим элементом (this) и элементом, начатым для перетаскивания (currentItem). Результат этого вызова
присваивается переменной isAdjacentBlock.
4. if (isAdjacentBlock) {
-Здесь начинается еще одна условная проверка. Она проверяет значение переменной isAdjacentBlock.
Если оно истинно, это означает, что текущий элемент может быть перетащен на текущее место.
5. this.classList.add('drag-over')
-Если isAdjacentBlock равно true, то элементу (this) добавляется класс 'drag-over'.
Этот класс обычно используется для визуальной обратной связи, чтобы подсветить область, на которую можно бросить элемент.
6. } else {
- Иначе если isAdjacentBlock равно false, начинается блок кода, который выполнится, если текущий элемент не может быть
перетащен на текущее место.
7. this.classList.remove('drag-over')
- В этой строке класс 'drag-over' удаляется из элемента (this). Это может использоваться для удаления визуальной подсветки,
если элемент больше не находится в области, куда его можно бросить.*/
function handleDragEnter() {
    if (this !== currentItem && currentItem != null) {
        const isAdjacentBlock = findAdjacentBlock(this, currentItem)

        if (isAdjacentBlock) {
            this.classList.add('drag-over')
        } else {
            this.classList.remove('drag-over')
        }
    }
}

//- `handleDragOver(e)` предотвращает стандартное поведение браузера для перетаскивания и устанавливает эффект перетаскивания.
/* 1. e.preventDefault && e.preventDefault()
 - Здесь используется метод preventDefault() объекта события e. Этот метод предотвращает стандартное поведение браузера для
 события "dragover". Обратите внимание, что метод вызывается дважды. Однако, правильным способом будет вызов метода один раз:
 e.preventDefault()
 2. e.dataTransfer.dropEffect = 'move'
 - Здесь устанавливается значение свойства dropEffect объекта dataTransfer события.
 Свойство dropEffect указывает, какое действие должно выполняться при бросании элемента. В данном случае, значение 'move'
 указывает на перемещение элемента.
 3. return false
 - Возвращаемое значение false в данной функции также имеет целью предотвратить стандартное поведение браузера при событии
 "dragover". Это также может влиять на поведение браузера при перетаскивании элемента.*/
function handleDragOver(e) {
    e.preventDefault && e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    return false;
}

//- `handleDragLeave()` - Этот обработчик удаляет класс `drag-over` при уходе курсора мыши с элемента.
function handleDragLeave() {
    this.classList.remove('drag-over')
}

/* 1. `handleDrop(e)`
- Это объявление функции handleDrop, которая будет вызываться при событии "drop", когда перетаскиваемый элемент
бросается на целевой элемент.
2. e.stopPropagation()
- Этот метод предотвращает дальнейшее всплытие события вверх по иерархии DOM, что может остановить влияние события "drop"
на другие элементы.
3. if (this !== currentItem && currentItem != null) {
- Это условие проверяет, является ли целевой элемент (this) текущим перетаскиваемым элементом (currentItem) и не равен ли
currentItem null. Это важно для избежания конфликтов в случае, если элемент пытаются перетащить на самого себя.
4. const isAdjacentBlock = findAdjacentBlock(this, currentItem)
 - Здесь вызывается функция findAdjacentBlock, чтобы определить, являются ли элементы соседними по осям X или Y.
5. const isSameParentBlock = currentItem.parentNode === this.parentNode
  - Здесь проверяется, находятся ли currentItem и this в одном и том же родительском контейнере.
6. const isAllowedDrag = this.textContent === ''
 - Здесь проверяется, является ли текстовое содержимое целевого элемента пустым, что означает, что целевой элемент можно
 использовать для перетаскивания.
7. const coords1 = {...}; и const coords2 = {...}
 - Здесь создаются объекты coords1 и coords2, которые содержат координаты (x и y) и ссылки на элементы (element) текущего
перетаскиваемого элемента (currentItem) и целевого элемента (this) с использованием метода getBoundingClientRect().
*/
function handleDrop(e) {
    e.stopPropagation()

    if (this !== currentItem && currentItem != null) {
        const isAdjacentBlock = findAdjacentBlock(this, currentItem)
        const isSameParentBlock = currentItem.parentNode === this.parentNode
        const isAllowedDrag = this.textContent === ''
        const coords1 = {
            x: currentItem.getBoundingClientRect().left,
            y: currentItem.getBoundingClientRect().top,
            element: currentItem
        }
        const coords2 = {
            x: this.getBoundingClientRect().left,
            y: this.getBoundingClientRect().top,
            element: this
        }

        //console.log('isAdjacentBlock:', isAdjacentBlock) //являются ли элементы соседними
        //console.log('isSameParentBlock:', isSameParentBlock) //находятся ли элементы в одном родительском контейнере
        //console.log('isAllowedDrag:', isAllowedDrag) // разрешено ли перетаскивание на целевой элемент.
        /* 8. if (isAllowedDrag && (isAdjacentBlock || isSameParentBlock) && isValidForSwap(coords1, coords2)) {
         - Это условие проверяет, выполняются ли условия для разрешения перетаскивания элементов и выполнения обмена местами.
         9. this.innerHTML = e.dataTransfer.getData('text/html')
          - Здесь устанавливается содержимое целевого элемента (this) равным содержимому перетаскиваемого элемента (currentItem),
          полученному из объекта dataTransfer события "drop".
          10. currentItem.innerHTML = ''
           - Здесь очищается содержимое перетаскиваемого элемента (currentItem).
          11. checkOrder()
            - Вызывается функция checkOrder() для проверки правильности расположения элементов после перетаскивания.
          12. return false
            - Возвращаемое значение false также предотвращает стандартное поведение браузера при событии "drop".*/
        if (isAllowedDrag && (isAdjacentBlock || isSameParentBlock) && isValidForSwap(coords1, coords2)) {
            this.innerHTML = e.dataTransfer.getData('text/html')
            currentItem.innerHTML = ''
            checkOrder()
        }
    }
    return false
}

//   - `handleDragEnd()` удаляет класс `drag-over` у всех элементов, завершая визуальную обратную связь при перетаскивании.
/*1. dragItems.forEach((item) => {
 - Здесь используется метод forEach для перебора всех элементов с классом .drag-item.
 2. item.classList.remove('drag-over')
  - Внутри цикла удаляется класс drag-over у каждого элемента. Этот класс добавлялся в функции handleDragEnter для
  визуального обозначения соседних элементов, над которыми можно выполнять перетаскивание.*/
function handleDragEnd() {
    dragItems.forEach((item) => {
        item.classList.remove('drag-over')
    })
}

// Эта функция используется для определения, можно ли менять местами элементы. Она находит ближайшие блоки элементов по оси x,
// сравнивая их индексы в коллекции.
/* 1. function findAdjacentBlock(block, element) {
 - Это объявление функции findAdjacentBlock с двумя параметрами: block (текущий элемент, на который наведен курсор) и
 element (текущий перетаскиваемый элемент).
 2. const currentBlock = element.closest('.workOne, .workTwo, .workThree, .workFour')
  - Здесь используется метод closest для поиска ближайшего родительского элемента с одним из классов
  .workOne, .workTwo, .workThree или .workFour. Это позволяет определить контейнер, в котором находится текущий перетаскиваемый элемент.
  3. const adjacentBlock = block.closest('.workOne, .workTwo, .workThree, .workFour')
   - Аналогично находим ближайший контейнер для элемента, на который наведен курсор.*/
function findAdjacentBlock(block, element) {
    const currentBlock = element.closest('.workOne, .workTwo, .workThree, .workFour')
    const adjacentBlock = block.closest('.workOne, .workTwo, .workThree, .workFour')

    //console.log('currentBlock:', currentBlock)
    //console.log('adjacentBlock:', adjacentBlock)
//4. if (currentBlock && adjacentBlock) { - Проверяем, есть ли контейнеры для текущего элемента и элемента, на который наведен курсор.
// Если оба контейнера существуют, выполняется следующий код:
    /*5. const blockIndex = Array.from(document.querySelectorAll('.workOne, .workTwo, .workThree, .workFour')).indexOf(currentBlock)
     - Здесь используется метод querySelectorAll для поиска всех элементов с одним из указанных классов, а затем метод indexOf
     для определения индекса текущего контейнера в списке всех контейнеров.
     6. const adjacentIndex = Array.from(document.querySelectorAll('.workOne, .workTwo, .workThree, .workFour')).indexOf(adjacentBlock)
      - Аналогично определяется индекс контейнера для элемента, на который наведен курсор.*/
    if (currentBlock && adjacentBlock) {
        const blockIndex = Array.from(document.querySelectorAll('.workOne, .workTwo, .workThree, .workFour')).indexOf(currentBlock)
        const adjacentIndex = Array.from(document.querySelectorAll('.workOne, .workTwo, .workThree, .workFour')).indexOf(adjacentBlock)

        //console.log('blockIndex:', blockIndex)
        //console.log('adjacentIndex:', adjacentIndex)
        /*7. return Math.abs(blockIndex - adjacentIndex) === 1
         - Это выражение проверяет, находятся ли текущий контейнер и контейнер, на который наведен курсор, рядом друг с другом по горизонтали
          (если разница индексов равна 1). Функция возвращает true, если условие выполняется, и false в противном случае.
          8. return false
           - Если хотя бы один из контейнеров отсутствует, функция вернет false.*/
        return Math.abs(blockIndex - adjacentIndex) === 1
    }

    return false
}

// Функция для получения координат элемента
/*функция getCoordinates(element), которая возвращает объект с координатами элемента на матрице.
Эта функция использует метод getBoundingClientRect(), чтобы получить положение элемента на странице.
Она определяет индекс элемента в родительском контейнере (строка) и индекс контейнера в списке всех контейнеров (столбец).*/
function getCoordinates(element) {
    const parent = element.closest('.drag-list'); // Получаем родительский контейнер
    const row = Array.from(parent.children).indexOf(element); // Индекс элемента в контейнере
    const column = Array.from(document.querySelectorAll('.drag-list')).indexOf(parent) // Индекс контейнера в списке всех контейнеров

    return {
        x: column,
        y: row
    }
}

//функция для поиска соседнего элемента по оси Y. Она сравнивает разницу по координатам X и Y между элементами
// и проверяет, является ли второй элемент пустым.
function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)
    const isElementEmpty = coords2.element.textContent === ''
    //console.log('Coordinates:', coords1, coords2)
    console.log('diffX:', diffX, 'diffY:', diffY, 'isElementEmpty:', isElementEmpty)
    return (diffX === 0 && diffY === 140) || (diffX === 135 && diffY === 0) && isElementEmpty
}

dragItems.forEach((item) => {
    item.addEventListener('dragstart', handleDragStart, false)
    item.addEventListener('dragenter', handleDragEnter, false)
    item.addEventListener('dragover', handleDragOver, false)
    item.addEventListener('dragleave', handleDragLeave, false)
    item.addEventListener('drop', handleDrop, false)
    item.addEventListener('dragend', handleDragEnd, false)
})









