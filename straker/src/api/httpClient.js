import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/", // process.env.VUE_APP_BASE_URL,
    timeout: 1000, // indicates, 1000ms ie. 1 second
    headers: {
        // "Content-Type": "application/json",
        // anything you want to add to the headers
    }
});

export default httpClient;