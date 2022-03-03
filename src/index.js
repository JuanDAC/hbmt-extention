import loadCaptainLogs from "./routes/captain_log_sessions/index"
import loadBatchPlanning from "./routes/batch_planning_items/index"
const { location: { pathname } } = window;

if (/captain_log_sessions/.test(pathname)) loadCaptainLogs();
if (/batch_planning_items/.test(pathname)) loadBatchPlanning();
