import axios from 'axios';

class Service {
    static axiosInstance() {
        return axios.create({
            baseURL: 'http://localhost:5000/api/v1/'
        });
    }

    static parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };


    static async uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'n3got5z5');

        const res = await fetch("https://api.cloudinary.com/v1_1/dvweth7yl/image/upload", {
            method: 'POST',
            body: formData
        });
        return res.json();
    }


    static async uploadImages(files) {
        const uploaders = files && Object.keys(files).map(async (key, index) => {
            const formData = new FormData();
            formData.append('file', files[key]);
            formData.append('upload_preset', 'n3got5z5');

            const res = await fetch("https://api.cloudinary.com/v1_1/dvweth7yl/image/upload", {
                method: 'POST',
                body: formData
            });

            return res.json();
        })

        return axios.all(uploaders);
    }
}

export default Service;