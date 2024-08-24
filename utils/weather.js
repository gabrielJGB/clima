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


export const  sumPrecipitation = (dataArray) => {
    let totalPrecipitation = 0;

    dataArray.forEach(item => {
        const precipValue = parseFloat(item.precipitation["@attributes"].value);
        totalPrecipitation += precipValue;
    });

    return totalPrecipitation;
}


export const getDropsArray = (mm) => {
    let arr = [0, 0.1, 5, 12, 20, 50]
    let num = parseFloat(mm)

    if (num === arr[0])
        return []
    else if (num > arr[1] && num <= arr[2])
        return [0]
    else if (num > arr[2] && num <= arr[3])
        return [0, 1]
    else if (num > arr[3] && num <= arr[4])
        return [0, 1, 2]
    else if (num > arr[4] && num <= arr[5])
        return [0, 1, 2, 3]
    else if (num > arr[5])
        return [0, 1, 2, 3, 4]
    else {
        return []
    }

}