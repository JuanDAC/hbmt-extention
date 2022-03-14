import {
    buttonCurriculum,
    buttonAverage,
    spanAverage,
    buttonFilterBy,
} from "../application/createElements"
import {
    getLastAverage,
    getExpecialization,
    getIdUser,
    getCaptainLogs,
    getAverageTds,
    getAverage,
    getUserName,
    getCurriculum,
    getMaxContentResponse
} from "../application/getInfomation"
import {
    sortByTextDown,
    sortByTextUp,
    sortByDown,
    sortByUp,
} from "../application/sortings"
import { loadHTML, sortBy } from "../../../share/htmlTools";
import { createLoader } from "../../../share/compoenets";
import { createSubTitle } from "../../../share/compoenets";


const sortByLowAverage = sortByDown(getAverage);
const sortByHigtAverage = sortByUp(getAverage);
const sortByName = sortByTextUp(getUserName);
const sortByCurriculum = sortByTextUp(getCurriculum);
const sortByMaxContent = sortByUp(getMaxContentResponse);

const documentFrom = async url => {
    const responseStudents = await fetch(url)
    const htmlStudents = await responseStudents.text();
    const $document = await loadHTML(htmlStudents);
    return $document
}



const createCaptainLog = async id => {
    const $document = await documentFrom(`https://intranet.hbtn.io/users/${id}`);
    const { src } = $document.querySelector('img[src*="https://holbertonintranet.s3.amazonaws.com/users"]');
    const $name = $document.querySelector('h1');
    $name.lastElementChild.remove();
    const { textContent: name } = $name;
    $document.remove();
    return `
    <li class="list-group-item">
        <div class="align-items-center d-flex gap-4" style="flex-wrap: wrap;">
            <span class="align-items-center d-flex fs-3 fw-bold gap-2">
            <img class="img-rounded" height="30" width="30" src="${src}">
                <a href="/users/${id}">${name}</a>
            </span>
        </div>
        <button class="btn btn-block btn-default btn-sm mt-4" disabled="">Pending</button>
    </li>
    `;
}

const getAllStudents = async () => {
    fetch(`https://intranet.hbtn.io/batches/observe/active`);
    const idStudentsCaptainLogs = getCaptainLogs().map($captainLog => getIdUser($captainLog));
    const $documentStudet = await documentFrom(`https://intranet.hbtn.io/users/${idStudentsCaptainLogs[0]}`);
    const { href: batche } = $documentStudet.querySelector('a[href*="/batches/"]');
    if (!batche)
        return;
    const $documentBatche = await documentFrom(batche);
    const ids = [...$documentBatche.querySelectorAll("td > code")].map($id => Number($id.textContent));
    const idsStudentWithoutCaptainLogs = ids.filter(id => !idStudentsCaptainLogs.includes(id))
    const othersCaptains = idsStudentWithoutCaptainLogs.map(createCaptainLog);
    const captainLogs = (await Promise.all(othersCaptains)).reduce((acum, value) => `${acum}${value}`, '');
    $documentBatche.remove();
    $documentStudet.remove();
    return captainLogs;
}

export const captainLogs = async () => {
    const style = document.createElement("style");
    style.innerHTML = `
    li.list-group-item:nth-child(2n - 1) {
        background: aliceblue;
    }
    `;
    document.head.appendChild(style)
    const $wrapperPeddingLoad = document.querySelector(".sm-gap");
    const $loader = createLoader("Loading Pendings");
    $wrapperPeddingLoad.append($loader);
    const idsStudents = await getAllStudents();
    $loader.remove();
    document.querySelector(".list-group").innerHTML += idsStudents;
    const idStudenttsWithCaptainLogs = [];
    const captainLogsAddInformation = getCaptainLogs().map(async ($captainLog) => {
        const $newContainer = document.createElement("div");
        $newContainer.classList.add("d-flex", "justify-content-between", "align-items-center");
        const $container = $captainLog.querySelector("div");
        $container.style.flexWrap = "wrap";
        const $loader = createLoader();
        $container.appendChild($loader);
        const idStudent = getIdUser($captainLog);
        const $document = await documentFrom(`https://intranet.hbtn.io/users/${idStudent}`)
        const tdsAverage = getAverageTds($document);
        const $td = tdsAverage.pop();
        const average = getLastAverage($td);
        const curriculum = tdsAverage.length > 0
            ? getExpecialization($td.parentElement)
            : "Foundations";
        $loader.remove();
        const $wrapper = document.createElement("div");
        $wrapper.className = "align-items-center d-flex fs-3 fw-bold gap-2";
        $wrapper.appendChild(buttonCurriculum(curriculum));
        $wrapper.appendChild(spanAverage());
        $wrapper.appendChild(buttonAverage(average));
        const { parentElement: $parentElement } = $container;
        $newContainer.appendChild($container);
        $newContainer.appendChild($wrapper);
        $parentElement.insertAdjacentElement("afterbegin", $newContainer);
        idStudenttsWithCaptainLogs.push(idStudent);
        $document.remove();
    });

    const $menu = document.createElement("div");
    $menu.classList.add("list-group-item");
    $menu.style.cssText = `
        position: sticky;
        top: 0px;
        z-index: 2;
    `;
    $menu.appendChild(createSubTitle("Sorting by"));
    const $reference = document.querySelector(".show > .tab-pane");
    $reference.insertAdjacentElement("beforebegin", $menu);
    const $sortByLowAverage = buttonFilterBy("Low average", () => sortBy(getCaptainLogs(), sortByLowAverage));
    const $sortByHigtAverage = buttonFilterBy("Higt average", () => sortBy(getCaptainLogs(), sortByHigtAverage));
    const $sortByName = buttonFilterBy("Name", () => sortBy(getCaptainLogs(), sortByName));
    const $sortByCurriculum = buttonFilterBy("Curriculum", () => sortBy(getCaptainLogs(), sortByCurriculum));
    const $sortByMaxContent = buttonFilterBy("Max content", () => sortBy(getCaptainLogs(), sortByMaxContent));

    const activePostLoad = [$sortByLowAverage, $sortByHigtAverage, $sortByCurriculum];

    activePostLoad.forEach($element => $element.setAttribute("disabled", true));
    [$sortByLowAverage, $sortByHigtAverage, $sortByName, $sortByCurriculum, $sortByMaxContent]
        .forEach($element => $menu.appendChild($element));


    await Promise.all(captainLogsAddInformation);

    activePostLoad.forEach($element => $element.removeAttribute("disabled"));
    sortBy(getCaptainLogs(), sortByLowAverage);
}