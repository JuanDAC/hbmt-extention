
export const getLastAverage = ($td) => {
    if (!$td)
        return null;

    const avarage = getLastAverage($td.nextElementSibling);

    if (!avarage)
        return Number($td.previousElementSibling.textContent);

    return (avarage)
};

export const getExpecialization = ($tr) => {
    if (!$tr)
        return null;

    const avarage = getExpecialization($tr.nextElementSibling);

    if (!avarage)
        return $tr.firstElementChild.textContent;

    return (avarage)
};

export const getIdUser = $document => Number([...$document.querySelector("a").getAttribute("href").match(/[\d]+/)].pop());

export const getAverageTds = $document => [...$document.querySelectorAll("td")]
    .filter(element => element.textContent.includes("Average"));

export const getCaptainLogs = () => [...document.querySelectorAll(".list-group li.list-group-item")];

export const getAverage = $captainLog =>
    Number($captainLog.querySelector("#data-average")?.textContent || 0);

export const getCurriculum = $captainLog =>
    $captainLog.querySelector("#data-curriculum")?.textContent || "Fundations";

export const getUserName = $captainLog =>
    $captainLog.querySelector("img").nextElementSibling.textContent;

export const getMaxContentResponse = $captainLog =>
    [...$captainLog.querySelectorAll(".clean.well.gray.few-padding.fs-small")]
        .map($element => $element.textContent.split(""))
        .flat(2).join().length;
