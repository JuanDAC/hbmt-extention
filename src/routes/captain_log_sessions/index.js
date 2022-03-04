import { loadHTML } from "../../share/htmlTools";
const { location: { pathname } } = window;
const { body } = document;



const filterStudentTablecells = ($item, index) => {
    const indexId = 1, indexCurriculum = 7, indexCurrentActivity = 8, classContact = "contact";
    return index === indexId
        || $item.classList.contains(classContact)
        || index === indexCurriculum
        || index === indexCurrentActivity;
}

const getInfoStudets = $document => Object.fromEntries([...($document?.querySelectorAll("tbody tr") || [])]
    .map(($tr) => {
        const item = [...($tr?.children || [])].filter(filterStudentTablecells);
        const key = item.shift().textContent;
        const data = item.map($td => {
            const elements = [...$td.children];
            return elements.map(element => {
                if (element.textContent.includes("Specializations")) {


                }
                return element;
            })
        })
        return [key, data];
    }));

const getLastAverage = ($td) => {
    if (!$td)
        return null;

    const avarage = getLastAverage($td.nextElementSibling);

    if (!avarage)
        return Number($td.previousElementSibling.textContent);

    return (avarage)
};

const getExpecialization = ($tr) => {
    if (!$tr)
        return null;

    const avarage = getExpecialization($tr.nextElementSibling);

    if (!avarage)
        return $tr.firstElementChild.textContent;

    return (avarage)
};

const captainLogs = async () => {

    [...document.querySelectorAll("li.list-group-item")].forEach(async (captainLog) => {
        const idStudent = [...captainLog.querySelector("a").getAttribute("href").match(/[\d]+/)].pop();
        const responseStudents = await fetch(`https://intranet.hbtn.io/users/${idStudent}`)
        const htmlStudents = await responseStudents.text();
        const $document = await loadHTML(htmlStudents);
        const tds = [...$document.querySelectorAll("td")]
            .filter(element => element.textContent.includes("Average"));
        const $td = tds.pop();
        const average = getLastAverage($td);

        const curriculum = tds.length > 0
            ? getExpecialization($td.parentElement)
            : "Foundations";
        const $span = document.createElement("span");
        $span.classList.add("fw-bold")
        "btn btn-sm btn-default btn-success"
        $span.textContent = `Average: `;
        const $average = document.createElement("button");
        $average.setAttribute("disabled", true);
        $average.classList.add("btn", "btn-sm", "btn-default", average < 80 ? "btn-danger" : "btn-success");

        $average.textContent = average;

        const $curriculum = document.createElement("button");
        $curriculum.classList.add("btn", "btn-sm", "btn-default");
        $curriculum.setAttribute("disabled", true);
        $curriculum.textContent = curriculum;
        const $container = captainLog.querySelector("div");
        $container.appendChild($curriculum);
        $container.appendChild($span);
        $container.appendChild($average);
        $document.remove();

    })

}

const load = () => {
    if (/captain_logs/.test(pathname)) captainLogs();

}

export default load;
