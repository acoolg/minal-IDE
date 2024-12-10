

/**
 * Opens a tab in the specified path within the given element.
 *
 * @param {string} path - The path where the tab will be opened.
 * @param {HTMLElement} element - The element that will contain the opened tab.
 */
export async function openTabIn(path, element) {
    fetch(path).then(e => {
        e.text().then(e => {
            element.innerHTML = e;
            console.log(e);
        })
    })
}