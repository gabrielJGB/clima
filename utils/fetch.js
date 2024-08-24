const baseURL = "https://api.allorigins.win/raw?url=https://www.meteobahia.com.ar/jsonp.php"

const headers = {
    "headers": {
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
    }
}



export const fetchData = async (city) => {

    try {
        const res1 = await fetch(`${baseURL}?url=https://meteobahia.com.ar/scripts/meteogramas/${city}.xml`, headers)
        const res1Text = await res1.text()
        const meteogram = res1Text.replace("callback", "").replace(";", "").slice(1, -1)

        const res2 = await fetch(`${baseURL}?url=https://meteobahia.com.ar/scripts/xml/now-${city}.xml`, headers)
        const res2Text = await res2.text()
        const now = res2Text.replace("callback", "").replace(";", "").slice(1, -1)


        

        return {
            meteogram: JSON.parse(meteogram),
            now: JSON.parse(now)
        }


    } catch (error) {
        throw error;
    }
}