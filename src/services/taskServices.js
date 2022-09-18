import axios from 'axios';
const apiUrl = "https://localhost:8080/api/tasks";


//read
export function getTasks() {
    return axios.get(apiUrl);
}

//create
export function addTask(task) {
    return axios.post(apiUrl, task)
}

//update
export function updateTask(id, task) {
    return axios.put(apiUrl + "/" +id, task)
}


//delete
export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id)
}