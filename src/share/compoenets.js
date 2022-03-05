import { loaderTextAnimation } from "./htmlTools"

export const createLoader = () => {
    const $loader = document.createElement("button");
    $loader.classList.add("btn", "btn-sm", "btn-default", "btn-warning");
    $loader.setAttribute("disabled", true);
    $loader.textContent = "Loading";
    loaderTextAnimation.call($loader, $loader.textContent);
    const remove = $loader.remove;
    $loader.remove = function () {
        this.removeTextAnimation();
        remove.call(this);
    };
    return $loader;
};

export const createSubTitle = name => {
    const $span = document.createElement("span");
    $span.classList.add("fw-bold", "mr-2")
    $span.textContent = `${name}: `;
    return $span;
};
