export const BASE_URL="http://localhost:5000";

export const API_PATHS={
    Auth:{
        REGISTER: "/api/auth/register",  //SIGNUP
        LOGIN: "/api/auth/login", //Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/profile" //Get logged in user details
    },
    RESUME:{
        CREATE: "/api/resume",   //POST- Create a new resume
        GET_ALL: "/api/resume",  //GET- get all resumes of the logged in user
        GET_BY_ID: (id)=>   `/api/resume/${id}`,  //GET a specific resume
        UPDATE: (id)=>        `/api/resume/${id}`,  //PUT- update a resume
        DELETE: (id)=>      `/api/resume/${id}`,   //DELETE- Delete a resume
        UPLOAD_IMAGES:(id)=>       `/api/resume/${id}/upload-images`,  //PUT- upload thumbnail
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image"
    }

}