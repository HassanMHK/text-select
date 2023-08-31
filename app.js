const section = document.querySelector('.section');

window.addEventListener('DOMContentLoaded', function(){
    selectText();
});

function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function newLayer(){
    const grayLayer = `<div class="gray-layer"></div>`;
    section.innerHTML += grayLayer;
}

function displayText(text){
    const grayLayer = document.querySelector('.gray-layer');
    grayLayer.innerHTML += `<div class="left-section">
        <div class="selected-text">
            <h2>Selected Text</h2>
            <p class="selected-paragraph">${text}</p>
        </div>
        <div class="bullet-points-list">
            <ol>
                <li>Section A</li>
                <li>Section B</li>
                <li>Section C</li>
                <li>Section D</li>
                <li>Section E</li>
            </ol>
        </div>
    </div>
    <div class="right-section">
        <ul>
            <li class="text-menu-item" data-name="details"><button class="list-btn">Details</button></li>
            <li class="text-menu-item" data-name="bullet-points"><button class="list-btn">Bullet points</button></li>
            <li class="text-menu-item" data-name="other"><button class="list-btn">Other</button></li>
        </ul>
    </div>`;
}

function selectText(){
    const paragraph = document.querySelector('.text');
    paragraph.addEventListener('mouseup', function(){
        const savedText = getSelectedText(paragraph.textContent);
        newLayer();
        displayText(savedText);
        textMenu();
        closeGrayLayer();
    });
}

function textMenu(){
    const textMenuItems = document.querySelectorAll('.text-menu-item');
    const selectedText = document.querySelector('.selected-text');
    const bulletList = document.querySelector('.bullet-points-list');
    textMenuItems.forEach(function(item){
        item.addEventListener('click', function(){
            if(item.dataset.name === "details"){
                bulletList.style.display = "none";
                selectedText.style.display = "block";
            }else if(item.dataset.name === "bullet-points"){
                selectedText.style.display = "none";
                bulletList.style.display = "block";
            }else{
                bulletList.style.display = "none";
                selectedText.style.display = "none";
            }
        });
    });
}

function closeGrayLayer(){
    const grayLayer = document.querySelector('.gray-layer');
    grayLayer.addEventListener('click', function(event){
        if(event.target.className === "gray-layer" || event.target.className === "left-section" || event.target.className === "right-section" || event.target.localName === "ul"){
            const grayLayer = document.querySelector('.gray-layer');
            grayLayer.remove();
            selectText();
        }
        // console.log(event.target);
    });
}