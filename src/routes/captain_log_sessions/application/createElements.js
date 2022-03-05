
export const spanAverage = () => {
    const $span = document.createElement("span");
    $span.classList.add("fw-bold", "mr-2")
    $span.textContent = `Average: `;
    return $span;
};

export const buttonAverage = average => {
    const $average = document.createElement("button");
    $average.setAttribute("disabled", true);
    $average.setAttribute("id", "data-average");
    $average.classList.add("btn", "btn-sm", "btn-default", average < 80 ? "btn-danger" : "btn-success");
    $average.textContent = average;
    return $average;
};

export const buttonCurriculum = curriculum => {
    const $curriculum = document.createElement("button");
    $curriculum.setAttribute("id", "data-curriculum");
    $curriculum.classList.add("btn", "btn-sm", "btn-default", "mr-2");
    $curriculum.setAttribute("disabled", true);
    $curriculum.textContent = curriculum;
    return $curriculum;
};


export const buttonFilterBy = (Name, filter) => {
    const $filter = document.createElement("button");
    $filter.setAttribute("id", "data-curriculum");
    $filter.classList.add("btn", "btn-sm", "btn-default", "mr-2");
    $filter.textContent = Name;
    $filter.onclick = filter;
    return $filter;
};
