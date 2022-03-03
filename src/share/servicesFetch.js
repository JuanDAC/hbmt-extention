
export const recursiveFetch = async ([url, ...urls], config = { method: "GET" }) => {
    if (!url)
        return;
    await fetch(url, config);
    await recursiveFetch(urls, config);
}
