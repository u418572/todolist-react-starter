
import axios from 'axios'
 
const baseUrl = 'https://todo-list.alphacamp.io/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
})


// Add a request interceptor
axiosInstance.interceptors.request.use((config) =>{
    // Do something before request is sent
    const token = localStorage.getItem('authToken')
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  }, 
  (error) => {
    // Do something with request error
    console.log(error);
  });

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};


export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};
export const patchTodo = async(payload) => {
  const {id, title, isDone} = payload
try{
   const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`,{
    title,
    isDone,
  })
  return res.data
}catch(error) {
  console.log('[Patch Todo failed]:',error)
}
 
};
export const deleteTodo = async(id) => {
try{
  const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`)
  return res.data
}catch(error) {
  console.log('[Delete Todo failed]:',error) 
} 
};