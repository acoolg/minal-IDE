import { settings as c } from "./config.js";
import { getCurrentWindow } from "@tauri-apps/api/window";
console.log("working");
var typeZone = document.getElementById("type");
var color = document.getElementById("color");
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

typeZone.addEventListener("keydown", async (e) => {
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

function runcode(code) {
    var codeThatSplits = code.split("\n");

    var codeThatRealRuns = [];

    codeThatSplits.forEach((element) => {
        if (element.startsWith(c.tab)) {
            codeThatRealRuns[codeThatRealRuns.length - 1] += "\n" + element;
        } else {
            codeThatRealRuns.push(element);
        }
    });

    var terminal = document.getElementById("test-zone");
    terminal.innerHTML = "";

    for (var i = 0; i < codeThatRealRuns.length; i++) {
        var thisLine = codeThatRealRuns[i];

        if (thisLine.startsWith("say ")) {
            terminal.innerHTML += "> " + thisLine.slice(4) + "<br>";
        } else if (thisLine.startsWith("branch")) {
            var nest = codeThatRealRuns[i].split("\n");
            console.log(nest);
            for (var i = 1; i < nest.length; i++) {
                printToTheTerminalLike(`${nest[i].slice(6)}(${i})<br>`);
            }
        }
    }
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

setInterval((e) => {
    runcode(typeZone.value);
}, 100);

function runItem(text) {
    if (thisLine.startsWith("say ")) {
        terminal.innerHTML += "> " + thisLine.slice(4) + "<br>";
    } else if (thisLine.startsWith("portal")) {
        var nest = codeThatRealRuns[i].split("\n");
        console.log(nest);
        for (var i = 1; i < nest.length; i++) {
            printToTheTerminalLike(`${nest[i].slice(6)}(${i})<br>`);
        }
    }
}

window.onload = () => {
    const appWindow = getCurrentWindow();
    document
        .getElementById("titlebar-minimize")
        ?.addEventListener("click", () => {
            console.log("Minimize button clicked");
            appWindow.minimize();
        });
    document
        .getElementById("titlebar-maximize")
        ?.addEventListener("click", () => {
            console.log("Maximize button clicked");
            appWindow.toggleMaximize();
        });
    document.getElementById("titlebar-close")?.addEventListener("click", () => {
        console.log("Close button clicked");
        appWindow.close();
    });
    document.getElementById("titlebar")?.addEventListener("mousedown", (e) => {
        if (e.buttons === 1) {
            // Primary (left) button
            e.detail === 2
                ? appWindow.toggleMaximize() // Maximize on double click
                : appWindow.startDragging(); // Else start dragging
        }
    });
    console.log("set up top button");
};
