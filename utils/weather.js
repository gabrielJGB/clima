import { formatDayCardDate } from "@utils/time";

export const groupByDay = (data) => {
    return data.reduce((acumulador, item) => {

        const fecha = item["@_from"].split("T")[0];


        if (!acumulador[fecha]) {
            acumulador[fecha] = [];
        }


        acumulador[fecha].push(item);



        return acumulador;
    }, {});
}


export const findMinMaxTemperature = (dataArray) => {
    let minTemp = Infinity;
    let maxTemp = -Infinity;
    let minPos = false;
    let maxPos = false;

    dataArray.forEach((item, i) => {
        const tempValue = parseFloat(item.temperature["@_value"]);

        if (tempValue < minTemp) {
            minTemp = tempValue;
            minPos = i;
        }

        if (tempValue > maxTemp) {
            maxTemp = tempValue;
            maxPos = i;
        }
    });

    return {
        minTemp: {
            value: minTemp,
            pos: minPos,
        },
        maxTemp: {
            value: maxTemp,
            pos: maxPos
        },

    };
}


export const sumPrecipitation = (dataArray) => {
    let totalPrecipitation = 0;

    dataArray.forEach(item => {
        const precipValue = parseFloat(item.precipitation["@_value"]);
        totalPrecipitation += precipValue;
    });

    return totalPrecipitation;
}


export const getDropsArray = (mm) => {
    let arr = [0, 0.1, 5, 12, 20, 50]
    let num = parseFloat(mm)

    if (num === arr[0])
        return [false, false, false, false, false]
    else if (num > arr[1] && num <= arr[2])
        return [false, false, false, false, true]
    else if (num > arr[2] && num <= arr[3])
        return [false, false, false, true, true]
    else if (num > arr[3] && num <= arr[4])
        return [false, false, true, true, true]
    else if (num > arr[4] && num <= arr[5])
        return [false, true, true, true, true]
    else if (num > arr[5])
        return [true, true, true, true, true]
    else {
        return [false, false, false, false, false]
    }

    // if (num === arr[0])
    //     return []
    // else if (num > arr[1] && num <= arr[2])
    //     return [0]
    // else if (num > arr[2] && num <= arr[3])
    //     return [0, 1]
    // else if (num > arr[3] && num <= arr[4])
    //     return [0, 1, 2]
    // else if (num > arr[4] && num <= arr[5])
    //     return [0, 1, 2, 3]
    // else if (num > arr[5])
    //     return [0, 1, 2, 3, 4]
    // else {
    //     return []
    // }

}


export const getIconCode = (data) => {

    const from = data["@_from"].split("T")[1].slice(0, 5)
    const svar = data.symbol["@_var"]
    let symbol = data.symbol["@_number"]




    if (svar === "01n") {
        if (from === "00:00" || from === "03:00" || from === "21:00") {
            symbol = "1n"
        }
        else if (from === "06:00" || from === "09:00") {
            symbol = "1"
        }
    } else if (svar === "02n") {
        if (from === "00:00" || from === "03:00" || from === "21:00") {
            symbol = "2n"
        }
    }

    return symbol

}