export const agruparPorDia = (data) => {
    return data.reduce((acumulador, item) => {

        const fecha = item["@attributes"].from.split("T")[0];


        if (!acumulador[fecha]) {
            acumulador[fecha] = [];
        }


        acumulador[fecha].push(item);

        

        return acumulador;
    }, {});
}


export const findMinMaxTemperature = (dataArray) =>{
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    dataArray.forEach(item => {
        const tempValue = parseFloat(item.temperature["@attributes"].value);
        
        if (tempValue < minTemp) {
            minTemp = tempValue;
        }
        
        if (tempValue > maxTemp) {
            maxTemp = tempValue;
        }
    });

    return {
        minTemp: minTemp,
        maxTemp: maxTemp
    };
}