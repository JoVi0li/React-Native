import AdvisorService from "../../../src/services/advisor_service";

const adService = new AdvisorService();

test("busca o clima atual da cidade de São Paulo", done => {

    const climate = adService.getClimate("BR");

    climate.then(data => {
        console.log(data);
        done();
    });
})