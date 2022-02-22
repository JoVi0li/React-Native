import axios from "axios";

export const climateEndpoint = (locale: string, token: string) => {
    return axios.create({
        baseURL: `http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/${locale}?token=${token}`
    });
}



export const weatherEndpoint = (cityId: number, token: string) => {
    return axios.create({
        baseURL: `http:apiadvisor.climatempo.com.br/api/v1/weather/locale/${cityId}/current?token=${token}`,
    })
}