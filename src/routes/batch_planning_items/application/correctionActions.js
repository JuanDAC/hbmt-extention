import { recursiveFetch } from "../../../share/servicesFetch";

function generateActionAll(filter = "") {
    const links = [...document.querySelectorAll("td li a")];
    const urls = links.map(link => {
        if (!link?.textContent?.includes(filter))
            return false;
        return link.getAttribute("href");
    }).filter(Boolean);

    return async () => {
        this.classList.add("animate-flicker");
        await recursiveFetch(urls);
        this.classList.remove("animate-flicker");
        location.reload();
    }
};

export const createGlobalAction = (action = "Review (100%)") => {
    const $link = document.createElement("button");
    $link.className = "btn btn-sm btn-default dropdown-toggle mr-2";
    $link.textContent = action;
    $link.onclick = generateActionAll.call($link, action);
    const $table = document.querySelector("table");
    $table.insertAdjacentElement("beforebegin", $link);
}

export const createTitleOfActions = () => {
    const $title = document.createElement("strong");
    $title.className = "mr-2";
    $title.textContent = "Apply to all:";
    const $table = document.querySelector("table");
    $table.insertAdjacentElement("beforebegin", $title);
}

