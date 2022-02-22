export default interface IAdvidorService {
    getClimate(country: string): Promise<void>;
    getCurrentWeather(cityId: number): Promise<void>;
}