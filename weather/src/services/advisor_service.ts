import axios from "axios";
import IAdvidorService from "../interfaces/services/advisor_service_interface";
import { weatherEndpoint, climateEndpoint } from "./axios_service";


export default class AdvisorService implements IAdvidorService {

    async getClimate(country: string): Promise<void> {
        try {
            const response = await climateEndpoint(country, process.env.API_KEY).get("");

            return response.data;
        } catch (e) {
            console.error("Erro:\n", e);
        }
    }

    async getCurrentWeather(cityId: string): Promise<void> {
        try {
            const response = await weatherEndpoint(cityId, process.env.API_KEY).get("")

            return response.data;
        } catch (e) {
            return console.error("Erro:\n", e);
        }
    }

}