import httpClient from './httpClient';

const END_POINT = '/users';

const getAllUsers = () => httpClient.get(END_POINT);
const getUser = (user_id) => httpClient.get(END_POINT, { user_id }); // you can pass arguments to use as request parameters/data

export {
    getAllUsers,
    getUser
}