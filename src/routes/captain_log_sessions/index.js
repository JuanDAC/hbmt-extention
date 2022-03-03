const { body } = document;

const loadHTML = html => new Promise((resolve, reject) => {
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

const load = async () => {
    const responseStudents = await fetch("https://intranet.hbtn.io/batches/144/students")
    const htmlStudents = await responseStudents.text();
    const $documentStudents = await loadHTML(htmlStudents);

    const response = await fetch("https://intranet.hbtn.io/batches/78/path_choices")
    const html = await response.text();
    const $document = await loadHTML(html);

    const students = getInfoStudets($document)
    $document.remove();
    console.log(students);
    [...document.querySelectorAll("li.list-group-item")].forEach((captainLog) => {
        const idStudent = [...captainLog.querySelector("a").getAttribute("href").match(/[\d]+/)].pop();
        const [contacts, curriculum, currentActivity] = students[idStudent];
        const header = [...captainLog.children].shift();
        header.insertAdjacentElement("beforeend", [...curriculum.children].pop());
    })
}

export default load;
