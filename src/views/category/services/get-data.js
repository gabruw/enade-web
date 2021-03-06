//#region Imports

import API from 'api/api';
import ENDPOINT from 'api/endpoint';

//#endregion

export const findCategory = (id) => API.get(ENDPOINT.CATEGORY.FIND(id));

export const findAllCategories = (page, order, direction) =>
    API.get(ENDPOINT.CATEGORY.FIND_ALL(page, order, direction));
