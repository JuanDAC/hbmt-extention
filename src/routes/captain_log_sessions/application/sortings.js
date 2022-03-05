const configComparation = Object.freeze({ ignorePunctuation: true, sensitivity: 'base' });

export const sortByDown = getNumber => (a, b) => getNumber(a) - getNumber(b);

export const sortByUp = getNumber => (a, b) => getNumber(b) - getNumber(a);

export const sortByTextUp = getData => (a, b) => getData(a).localeCompare(getData(b), "en", configComparation);

export const sortByTextDown = getData => (a, b) => getData(b).localeCompare(getData(a), "en", configComparation);
