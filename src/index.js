import loadCaptainLogs from "./routes/captain_log_sessions/index"
import loadBatchPlanning from "./routes/batch_planning_items/index"
const { location: { pathname } } = window;



const loadRoutes = async () => {
    const load = await fetch("https://raw.githubusercontent.com/JuanDAC/hbmt-extention/main/manifest.json");
    const { version } = await load.json();
    if (version !== VERSION) {
        const $container = document.querySelector("#layout-bars");
        const $alert = document.createElement("DIV");
        $alert.setAttribute("id", "viewing_as_permission_group");
        $alert.className = "group-staff";
        $alert.innerHTML = `
        <div>
            <i aria-hidden="true" class="fa fa-download"></i>You have an extension update pending
        </div>
        <div>
            Update enabled:&nbsp;<a href="https://github.com/JuanDAC/hbmt-extention/raw/main/HolbertonSchool.zip">Here</a>&nbsp;|&nbsp;
        </div>
        `;
        $container.appendChild($alert);
        setTimeout(() => $alert.remove(), 10000)
    }

};

loadRoutes();
if (/captain_log_sessions/.test(pathname)) loadCaptainLogs();
if (/batch_planning_items/.test(pathname)) loadBatchPlanning();
