import { getCurrentWindow } from "@tauri-apps/api/window";

const appwindow = getCurrentWindow();
window.onload = async () => {
    await appwindow.setResizable(false);
    setTimeout(async () => {
        await appwindow.setResizable(true);
        window.location.href = "./sheet/main.html";
    }, 2000);
};
