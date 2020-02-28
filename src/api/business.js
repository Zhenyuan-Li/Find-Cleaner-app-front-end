import { get, put, post } from './axios';
import queryString from 'query-string';

const API_BUSINESSES_URL = '/businesses';
const getApiBusinessUrlWithId = id => `${API_BUSINESSES_URL}/${id}`

export const fetchBusinessById = id => {
    const url = getApiBusinessUrlWithId(id)
    return get(url).then(res => res.data.data)
}

export const fetchAllBusiness = () => {
    return get(API_BUSINESSES_URL).then(res => res.data.data)
}

// need to be double checked
export const fetchBusinessOrderById = id => {
    const url = `${getApiBusinessUrlWithId()}/orders`;
    return get(url).then(res => res.data.data)
}

export const createBusiness = (business) => {
    return post(API_BUSINESSES_URL, business).then(res => res.data.data)
}

export const updateBusinessById = (id, business) => {
    const url = getApiBusinessUrlWithId(id);
    return put(url, business);
}

export const fetchHisOrders = (id, page=1, pageSize=5) => {
    const  stringified = queryString.stringify({
        page,
        pageSize
    });
    const url = `${getApiBusinessUrlWithId(id)}/orders/?${stringified}`;

    return get(url).then(res => ({
        orders: res.data.data,
        pagination: res.data.pagination
    }));
}