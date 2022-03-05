import { captainLogs } from "./infrastructure/captainLogs"
const { location: { pathname } } = window;



const load = () => {
    if (/captain_logs/.test(pathname)) captainLogs();

}

export default load;
