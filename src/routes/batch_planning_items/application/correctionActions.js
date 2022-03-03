import { recursiveFetch } from "../../../share/servicesFetch";
import { timeout } from "../../../share/promsesTools";

function generateActionAll(filter = "", configFetch = { method: "GET" }) {
    const links = [...document.querySelectorAll("td li a")];
    const urls = links.map(link => {
        if (!link?.textContent?.includes(filter))
            return false;
        return link.getAttribute("href");
    }).filter(Boolean);

    if (urls.length === 0)
        return this.setAttribute("disabled", true);

    return async () => {
        this.classList.add("btn-warning", "animate-flicker");
        try {
            await recursiveFetch(urls, configFetch);
            this.classList.remove("btn-warning");
            this.classList.add("btn-success");
            await timeout(3000);
            this.classList.remove("btn-success", "animate-flicker");
            await timeout(2000);
            location.reload();
        } catch {
            this.classList.remove("btn-warning");
            this.classList.add("btn-danger");
            await timeout(4000);
            this.classList.remove("btn-danger", "animate-flicker");
        }
    }
};

export const createGlobalAction = (action = "Review (100%)", configFetch = { method: "GET" }) => {
    const $link = document.createElement("button");
    $link.className = "btn btn-sm btn-default dropdown-toggle mr-2";
    $link.textContent = action;
    $link.onclick = generateActionAll.call($link, action, configFetch);
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

