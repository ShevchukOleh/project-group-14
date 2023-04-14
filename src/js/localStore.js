
export const getFilmFromList = (fieldName, id) => {
    try {
        const list = JSON.parse(localStorage.getItem(fieldName));

        return list.find((item) => item.id === id);
    } catch {
        return null
    }

}

export const getListOfFilm = (fieldName) => {
    try {
        return JSON.parse(localStorage.getItem(fieldName));
    } catch {
        return null
    }
}

export const addFilmToList = (fieldName, item) => {
    let result = [];

    try {
        const list = JSON.parse(localStorage.getItem(fieldName));

        result.push(...list)
    } catch {
    } finally {
        result.push(item)
        localStorage.setItem(fieldName, JSON.stringify(result));
    }
}

export const removeFromList = (fieldName, item) => {
    try {
        const list = JSON.parse(localStorage.getItem(fieldName));
        const result = list.filter((existFil) => existFil.id === item.id);

        localStorage.setItem(fieldName, JSON.stringify(result));
    } catch { }
}