
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

// export const removeFromList = (fieldName, id) => {
//     try {
//         const list = JSON.parse(localStorage.getItem(fieldName));
//         const result = list.filter((existFilm) => existFilm.id !== id);

//         localStorage.setItem(fieldName, JSON.stringify(result));
//     } catch { }
// }
export const removeFromList = (fieldName, id) => {
    try {
        const list = JSON.parse(localStorage.getItem(fieldName));
        const indexToRemove = list.findIndex((existFilm) => existFilm.id === id); // Find the index of the film to remove
        if (indexToRemove !== -1) {
            list.splice(indexToRemove, 1); // Remove the film from the list
        }

        localStorage.setItem(fieldName, JSON.stringify(list));
    } catch { }
}