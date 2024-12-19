export const generateId = (collection) => {
    if (!Array.isArray(collection)){
        throw new Error("COLLECTION NOT FOUND");
    }

    let maxId = 0;

    collection.forEach((item) => {
        if (item.id > maxId) {
            maxId = item.id;
        }
    });
    return maxId + 1;
};