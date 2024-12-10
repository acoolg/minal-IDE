// import { app } from "@tauri-apps/api";
import { settings as c } from "../config.js";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { openTabIn } from "./system/tab.js";
import { path } from "@tauri-apps/api";
console.log("working");

const appWindow = getCurrentWindow();
var typeZone = document.getElementById("type");
var color = document.getElementById("color");
var mouse = {
    x: 0,
    y: 0
}
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
/*
 * Opens a tab at the specified path within the given element.
 *
 * @param {string} path - The path where the tab will be opened.
 * @return {void}
 */
window.tab = function() {
    openTabIn("/src/assets/tab/code.html", document.getElementById("tab-main"));
}
    
const syntaxRules = [
    { regex: /(["'`])(?:\\.|[^\\])*?\1/g, css: "string" },
    { regex: /\b(say|portal)/g, css: "action" },
    { regex: /\b\d+\b/g, css: "number" },
    { regex: /\/\/.*|\/\*[\s\S]*?\*\//g, css: "comment" },
    // { regex: /\b[A-Za-z_]\w*(?=\()/g, css: 'function' },
    { regex: /\((.*?)\)|\[(.*?)\]|\{(.*?)\}/g, css: "input" },
    // { regex: /\{.*?\}/g, css: 'symbol-b' },
    // { regex: /\[.*?\]/g, css: 'symbol-m' },
    // { regex: /\(.*?\)/g, css: 'symbol-s' }
];

typeZone.addEventListener("keydown", async () => {
    setTimeout(() => {
        colo(typeZone.value);
    }, 1);
});

typeZone.addEventListener("keyup", async () => {
    setTimeout(() => {
        colo(typeZone.value);
    }, 1);
});

typeZone.addEventListener("keypress", async () => {
    setTimeout(() => {
        colo(typeZone.value);
    }, 1);
});

/**
 * Highlights the given text based on predefined syntax rules and updates the color element's innerHTML.
 *
 * @param {string} text - The text to be highlighted.
 * @return {void}
 */
function colo(text) {
    color.innerHTML = ""; // ��空之前的高��
    let highlightedText = text;

    highlightedText = highlightedText.replace("&", "&amp");
    highlightedText = highlightedText.replace("<", "&lt");
    highlightedText = highlightedText.replace(">", "&gt");
    highlightedText = highlightedText.replace(" ", "&nbsp");

    syntaxRules.forEach((rule) => {
        highlightedText = highlightedText.replace(rule.regex, (match) => {
            return `<span class="${rule.css}">${match}</span>`;
        });
    });

    color.innerHTML = highlightedText.replace(/\n/g, "<br>");
}

typeZone.addEventListener("keydown", function (e) {
    // 检测输入的是否是左括号
    if (e.key === "(") {
        e.preventDefault(); // 阻止默认行为
        insertTextAtCursor("()"); // 插入一对括号
        setCursorPosition(typeZone, typeZone.selectionStart - 1); // 将光标移到括号之间
    }
});

// 在光标位置插入文本
function insertTextAtCursor(text) {
    const startPos = typeZone.selectionStart;
    const endPos = typeZone.selectionEnd;
    const beforeText = typeZone.value.substring(0, startPos);
    const afterText = typeZone.value.substring(endPos, typeZone.value.length);

    typeZone.value = beforeText + text + afterText;
    typeZone.selectionStart = startPos + text.length;
    typeZone.selectionEnd = startPos + text.length;
}

// 设置光标位置
function setCursorPosition(elem, pos) {
    elem.selectionStart = pos;
    elem.selectionEnd = pos;
    elem.focus();
}

function printToTheTerminalLike(text) {
    var terminal = document.getElementById("test-zone");
    terminal.innerHTML += text;
}

// function printToTheTerminalLike(string){
//     var terminal = document.getElementById("test-zone");
//     terminal.innerHTML += string + "<br>";
//     terminal.scrollTop = terminal.scrollHeight;
// }

setInterval(async (e) => {
    console.log(isPointerOverElement(document.querySelector(".right-item"), mouse));
    
    // document.querySelectorAll(".")
    if(await appWindow.isMaximized()){
        document
            .getElementById("titlebar-maximize")
            .innerHTML = '<img src="https://api.iconify.design/mdi:window-restore.svg" alt="maximize" />'
    } else {
        document
            .getElementById("titlebar-maximize")
            .innerHTML = '<img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />'
    }
    runcode(typeZone.value);
}, 100);

function isPointerOverElement(element, vector2) {
    const hoveredElement = document.elementFromPoint(vector2.x, vector2.y);
    return hoveredElement === element || element.contains(hoveredElement);
}