const slider = document.querySelector('.grid-amount');
const gridSizeText = document.querySelector('.grid-size-text');
const buttons = Array.from(document.querySelectorAll('input[type="button"]'));
const gridContainer = document.querySelector('.draw-container');
const boxes = Array.from(document.querySelectorAll('.box'));

function removeAllGridBoxes() {
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function createGrid(gridSize = 16) {
    let totalGridSize = gridSize * gridSize;
    for(let i = 1; i <= totalGridSize; i++) {
        let div = document.createElement('div');
        div.className = 'box';
        gridContainer.append(div);
        div.addEventListener('mouseover', (e) => {
            if(e.buttons == 1 || e.buttons == 3) {
                div.setAttribute('style', `background-color: ${drawMode()};` )
            }
        })
    }
}

function clearGrid() {
    const boxes = Array.from(document.querySelectorAll('.box'));
    for(let i = 0; i <= boxes.length; i++) {
        boxes[i].style.removeProperty("background-color");
    }
}

function drawMode() {
    let activeMode = getActiveButton(buttons);
    switch (activeMode.value) {
        case 'rainbow':
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            return `#${randomColor}`
        case 'eraser':
            return '#fff'
        default:
            const color = document.querySelector('.color-picker')
            return color.value
    }
}

function updateGridSize(gridSize = 16) {
    return gridContainer.setAttribute('style', `grid-template-columns: repeat(${gridSize}, 1fr);grid-template-rows: repeat(${gridSize}, 1fr)`);
}

function updateGridSizeText(gridSize) {
    return gridSizeText.textContent=`${gridSize} x ${gridSize}`;
}

function getActiveButton(buttons) {
    for(let i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains('active')) return buttons[i];
    }
    return false;
}

function updateActiveButton(button) {
    let currentActiveBtn = getActiveButton(buttons);
    if(button === currentActiveBtn) return;
    currentActiveBtn.classList.remove('active');
    button.classList.add('active');
}

createGrid();
updateGridSize();

slider.addEventListener('input', () => {
    updateGridSizeText(slider.value);
})

slider.addEventListener('mouseup', () => {
    updateGridSize(slider.value);
    removeAllGridBoxes();
    createGrid(slider.value);
})

buttons.forEach(button => button.addEventListener('click', () => {
    if(button.value === 'clear') return clearGrid();
    updateActiveButton(button);
}));