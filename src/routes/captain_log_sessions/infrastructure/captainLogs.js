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




export const captainLogs = async () => {
    const captainLogsAddInformation = getCaptainLogs().map(async ($captainLog) => {
        const $container = $captainLog.querySelector("div");
        $container.style.flexWrap = "wrap";
        const $loader = createLoader();
        $container.appendChild($loader);
        const idStudent = getIdUser($captainLog);
        const responseStudents = await fetch(`https://intranet.hbtn.io/users/${idStudent}`)
        const htmlStudents = await responseStudents.text();
        const $document = await loadHTML(htmlStudents);
        const tdsAverage = getAverageTds($document);
        const $td = tdsAverage.pop();
        const average = getLastAverage($td);
        const curriculum = tdsAverage.length > 0
            ? getExpecialization($td.parentElement)
            : "Foundations";
        $loader.remove();
        const $wrapper = document.createElement("div");
        $wrapper.appendChild(buttonCurriculum(curriculum));
        $wrapper.appendChild(spanAverage());
        $wrapper.appendChild(buttonAverage(average));
        $container.appendChild($wrapper);
        $document.remove();
    });

    const $menu = document.createElement("div");
    $menu.classList.add("list-group-item");
    $menu.appendChild(createSubTitle("Sorting by"));
    const $reference = document.querySelector(".show > .tab-pane");
    $reference.insertAdjacentElement("beforebegin", $menu);
    const $sortByLowAverage = buttonFilterBy("Low average", () => sortBy(getCaptainLogs(), sortByLowAverage));
    const $sortByHigtAverage = buttonFilterBy("Higt average", () => sortBy(getCaptainLogs(), sortByHigtAverage));
    const $sortByName = buttonFilterBy("Name", () => sortBy(getCaptainLogs(), sortByName));
    const $sortByCurriculum = buttonFilterBy("Curriculum", () => sortBy(getCaptainLogs(), sortByCurriculum));
    const $sortByMaxContent = buttonFilterBy("Max content", () => sortBy(getCaptainLogs(), sortByMaxContent));

    const activePOstLoad = [$sortByLowAverage, $sortByHigtAverage, $sortByCurriculum];

    activePOstLoad.forEach($element => $element.setAttribute("disabled", true));
    [$sortByLowAverage, $sortByHigtAverage, $sortByName, $sortByCurriculum, $sortByMaxContent]
        .forEach($element => $menu.appendChild($element));

    await Promise.all(captainLogsAddInformation);
    activePOstLoad.forEach($element => $element.removeAttribute("disabled"));
    sortBy(getCaptainLogs(), sortByLowAverage);
}