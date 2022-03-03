
export const recursiveFetch = async ([url, ...urls]) => {
    if (!url)
        return;
    await fetch(url);
    await recursiveFetch(urls);
}
