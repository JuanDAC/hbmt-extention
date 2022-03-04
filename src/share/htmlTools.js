const { body } = document;


export const loadHTML = html => new Promise((resolve, reject) => {
    try {
        const $div = document.createElement("div");
        $div.style.setProperty("visibility", "hidden");
        $div.style.setProperty("height", "0px");
        $div.style.setProperty("width", "0px");
        $div.innerHTML = html;
        body.appendChild($div);
        resolve($div);
    }
    catch (e) {
        reject($div);
    }
});

