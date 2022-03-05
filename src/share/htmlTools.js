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

export const addArrayTo = ($parent, [$element, ...elements]) => {
    if (!$element)
        return;
    $parent.appendChild($element);
    addArrayTo($parent, elements);
};

export const sortBy = (elements, sortedBy) => {
    if (!Array.isArray(elements) || elements.length <= 1)
        return;
    const { parentElement: $parentElement } = elements[0];
    elements.forEach($element => $element.remove());
    elements.sort(sortedBy)
    addArrayTo($parentElement, elements);
}

export const loaderTextAnimation = function (text) {
    const { textContent } = this;
    this.textContent = text;
    this.setAttribute("disabled", true);
    const timer = setInterval(() => {
        const { length } = this.textContent.match(/\./g) || [];
        const points = '.'.repeat((length + 1) % 4);
        this.textContent = `${text} ${points}`;
    }, 200);
    this.removeTextAnimation = function () {
        clearInterval(timer);
        this.removeAttribute("disabled");
        this.textContent = textContent;
    };
}
