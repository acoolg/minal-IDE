import { getCurrentWindow } from "@tauri-apps/api/window";
console.log("working");
var mouse = {
    x: 0,
    y: 0
}
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

const appWindow = getCurrentWindow();

function isPointerOverElement(element, vector2) {
    const hoveredElement = document.elementFromPoint(vector2.x, vector2.y);
    return hoveredElement === element || element.contains(hoveredElement);
}

window.onload = async () => {
    appWindow.toggleMaximize()
    setupTrigger()
}

window.setTopButtons = () => {
    setupTrigger()
}

async function setupTrigger() {
    document
        .querySelectorAll("#titlebar-minimize")
        .forEach(element => {
            element.addEventListener("click", (e) => {
                e.stopPropagation()
                console.log("Minimize button clicked");
                appWindow.minimize();
            });
        });
        
    document
        .querySelectorAll("#titlebar-maximize")
        .forEach(element => {
            element.addEventListener("click",async (e) =>  {
                e.stopPropagation()
                console.log("Maximize button clicked");
                appWindow.toggleMaximize();
            });
        })
    document.querySelectorAll("#titlebar-close")
        .forEach(element => {
            element.addEventListener("click", (e) => {
                e.stopPropagation()
                console.log("Close button clicked");
                appWindow.close();
            });
        })
    
    document.getElementById("titlebar")?.addEventListener("mousedown", (e) => {
        e.stopPropagation()
        if(!isPointerOverElement(document.querySelector(".right-hitbox"), mouse) && !isPointerOverElement(document.querySelector(".left-item"), mouse)) {
            
            if (e.buttons === 1) {
                // Primary (left) button
                e.detail === 2
                    ?  appWindow.toggleMaximize() // Maximize on double click
                    : appWindow.startDragging(); // Else start dragging
            }
        }
        
    });
    console.log("set up top button");
}