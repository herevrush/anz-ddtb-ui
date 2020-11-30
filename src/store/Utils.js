import { ACCESS_TOKEN } from "./Constants";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

export const getAuthHeaders = () => {
    let headers = getHeaders();
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.Authorization = "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    }
    return headers;
};

export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
};
