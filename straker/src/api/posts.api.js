import httpClient from './httpClient';

const END_POINT = '/posts';

const getAllPosts = () => httpClient.get(END_POINT);
const getPost = (userId) => httpClient.get(END_POINT, { userId }); // you can pass arguments to use as request parameters/data

export {
    getAllPosts,
    getPost
}