

/**
 * Opens a tab in the specified path within the given element.
 *
 * @param {string} path - The path where the tab will be opened.
 * @param {HTMLElement} inElement - The element that will contain the opened tab.
 * @param {HTMLElement} barElement - The element that will contain the opened tab title.
 */
export async function openTabIn(path, inElement, barElement) {
    fetch(path).then(e => {
        /**
        *  @type {HTMLElement} ea - hh
        */
        e.text().then(ea => {
            inElement.innerHTML = ea;
            barElement.innerHTML += '<div class="item">dfgshsrthsrhsrhsghrhswth</div>'
            console.log(ea);
        })
    })
}