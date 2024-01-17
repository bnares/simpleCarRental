import axios, {  AxiosError, AxiosResponse } from "axios";
import {toast} from "react-toastify";
import { router } from "../routes/Routes";

axios.defaults.baseURL = "https://localhost:7049/api/";

const responseBody = (response : AxiosResponse)=> response.data;

const request = {
    get: (url: string, token:string) => axios.get(url,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    }).then(responseBody),
    post: (url: string, body: {}, token: string)=>axios.post(url, body,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(responseBody),
    put: (url: string, token: string)=>axios.put(url,{
        "Authorization": `Bearer ${token}`
    }).then(responseBody),
    delete: (url: string, token: string)=>axios.delete(url,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(responseBody),

}

const authRequest ={
    post: (url: string, body:{})=> axios.post(url, body).then().catch((e)=>console.warn(e)),
}

const admin = {
    allCars :(token: string)=> request.get("Admin/allCars",token),
    car: (id: number, token: string)=> request.get(`Admin/car/${id}`, token),
    allRentedData:(token: string)=> request.get("Admin/allRentedData", token),
    deleteCar:(id : number, token: string)=> request.delete(`Admin/delete-car/${id}`, token),
    updateCarStatus: (id: number, token : string)=>request.put(`Admin/updateStatusOfCar/${id}`, token),
    addCar: (data: any, token: string)=>request.post("Admin/addCar",data, token),
}


const user = {
    allCars:(token: string)=> request.get("User/getAllCars",token),
    car: (id : number, token: string)=>request.get(`User/getCar/${id}`, token),
    reservation: (id: number, token: string)=> request.get(`User/your-reservation/${id}`, token),
    allReservation:(token: string)=> request.get("User/all-reservation", token),
    deleteReservation: (id: number, token: string)=> request.delete(`User/delete-reservation/${id}`, token),
    reserveCar: (data : any, token: string)=> request.post("User/reserve-car", data, token),
}


const auth = {
    login:(values: any)=>authRequest.post("Auth/login", values),
    register: (values: any)=>authRequest.post("Auth/register", values),
}

axios.interceptors.response.use(async response =>{
    return response;
},(error: AxiosError)=>{
    const {data, status} = error.response! as AxiosResponse;
    console.log("axios interceptors: ", error);
    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                toast.error(modelStateErrors.flat()[0]);
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error("You are not allowed to do that");
            break;
        case 500:
            router.navigate("/server-error",{state:{error:data}});
            toast.error(data.title);
            break;
        default:
            break;
    }
    console.log("error interceptors: ", error);
    return Promise.reject(error.response);
})

const agent = {
    admin,
    user,
    auth
}

export default agent;