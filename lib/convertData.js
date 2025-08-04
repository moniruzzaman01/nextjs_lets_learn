export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export const slugify = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-") // Spaces to hyphens
    .replace(/[^\w-]+/g, "") // Remove non-word chars
    .replace(/-+/g, "-") // Replace multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens
};
