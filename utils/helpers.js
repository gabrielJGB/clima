import { XMLParser } from 'fast-xml-parser';
import { Platform } from 'react-native';

const proxyURL = "https://corsproxy.io/?"



const convertXMLtoJSON = (xml) => {
    const parser = new XMLParser({
        ignoreAttributes: false,
    });
    const json = parser.parse(xml);
    return json;
};





export const fetchXML = async (url) => {
    //  ?_=${new Date().getTime()}
    const isPlatformWeb = Platform.OS === "web"

    try {
        const res = await fetch(`${isPlatformWeb ? proxyURL : ""}${url}?_=${new Date().getTime()}`)
        const XMLdata = await res.text()

        const JSONdata = convertXMLtoJSON(XMLdata)
        return JSONdata

    } catch (error) {
        console.log(error)
        throw error
    }

}