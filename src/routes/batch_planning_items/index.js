import { corrections } from "./infrastructure/corrections";

const { location: { pathname } } = window;

const load = async () => {
    if (/corrections/.test(pathname)) corrections();
};

export default load;