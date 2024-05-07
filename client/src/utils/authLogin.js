import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
export const axiosPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosPrivate.interceptors.request.use((config) => {
    console.log('Interceptor called!');
    const accessToken = document.cookie.match(/accessToken=([^;]*)/)[1];
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosPrivate.interceptors.response.use((response) => {
    console.log('Everything is fine,  no error encountered');
    return response;
}, async (error) => {
    console.log('The intended request suffered a failure, this is the response: ', error.response.data);
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.error === "jwt expired" && !originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = document.cookie.match(/accessToken=([^;]*)/)[1];
        // make an api call to the refresh token endpoint
        const newCall = await axiosPrivate({
            method: "POST",
            url: '/auth/refresh',
            Authorization: `Bearer ${accessToken}`
        });
        // get the new access token from the cookie storage
        const newAccessToken = newCall.data.accessToken;
        // set the new access token in the header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // retry the request
        return axiosPrivate(originalRequest);
    }
    return Promise.reject(error);
});


const UserLogin = async (obj) => {
    // Encode username and password in base64
    const encoded = Buffer.from(obj.email + ':' + obj.password).toString('base64');
    const BasicAuth =
        `Basic ${encoded}`
    ;
    // use axios for http request
    try {
        const response = await axios(
            {
                method: "POST",
                url: '/user/login',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": BasicAuth
                },
                data: obj,
                withCredentials: true // Include cookies in the request
            });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

const userDashboard = async () => {
    try {
        const response = await axiosPrivate({
            method: "GET",
            url: '/user/dashboard',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error({
            error: error.response.data.message,
            status: error.response.status,
            headers: error.response.headers
        });
    }
}

const verifyCredentials = async (request) => {
    try {
        // we will use fetch in this scenario since it supports edge runtime
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`
            , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    cookie: request.cookies.get('accessToken')?.value
                },
                credentials: 'include',
            });
        if (response.status === 400) {
            return new Error('Access Denied');
        }
        if (response.status === 200) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log(error);
        throw new Error('Access Denied');
    }
}

const privateCheck = async (request) => {
    console.log('Going for a private check');
    try {
        const response = await axiosPrivate({
            method: "GET",
            url: '/auth/health',
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Access Denied');
    }
}

const data = [
    {
        "id": 1,
        "firstName": "Breanne",
        "lastName": "Alastair",
        "email": "balastair0@netvibes.com",
        "role": "Female"
    }, {
        "id": 2,
        "firstName": "Ursa",
        "lastName": "Iggalden",
        "email": "uiggalden1@intel.com",
        "role": "Female"
    }, {
        "id": 3,
        "firstName": "Eugenio",
        "lastName": "McGuggy",
        "email": "emcguggy2@google.fr",
        "role": "Male"
    }, {
        "id": 4,
        "firstName": "Aaron",
        "lastName": "Plumb",
        "email": "aplumb3@irs.gov",
        "role": "Male"
    }, {
        "id": 5,
        "firstName": "Rickey",
        "lastName": "Dy",
        "email": "rdy4@slideshare.net",
        "role": "Genderfluid"
    }, {
        "id": 6,
        "firstName": "Clayborn",
        "lastName": "Curphey",
        "email": "ccurphey5@washingtonpost.com",
        "role": "Male"
    }, {
        "id": 7,
        "firstName": "Avis",
        "lastName": "Clemmey",
        "email": "aclemmey6@360.cn",
        "role": "Female"
    }, {
        "id": 8,
        "firstName": "Noach",
        "lastName": "Soro",
        "email": "nsoro7@digg.com",
        "role": "Male"
    }, {
        "id": 9,
        "firstName": "Josy",
        "lastName": "MacCaughey",
        "email": "jmaccaughey8@imdb.com",
        "role": "Female"
    }, {
        "id": 10,
        "firstName": "Forest",
        "lastName": "Boak",
        "email": "fboak9@dailymail.co.uk",
        "role": "Male"
    }, {
        "id": 11,
        "firstName": "Dame",
        "lastName": "Spoure",
        "email": "dspourea@apple.com",
        "role": "Male"
    }, {
        "id": 12,
        "firstName": "Jacklyn",
        "lastName": "Rizzardi",
        "email": "jrizzardib@example.com",
        "role": "Non-binary"
    }, {
        "id": 13,
        "firstName": "Nata",
        "lastName": "Truggian",
        "email": "ntruggianc@e-recht24.de",
        "role": "Genderfluid"
    }, {
        "id": 14,
        "firstName": "Tammie",
        "lastName": "Summerell",
        "email": "tsummerelld@disqus.com",
        "role": "Female"
    }, {
        "id": 15,
        "firstName": "Shea",
        "lastName": "Arsey",
        "email": "sarseye@4shared.com",
        "role": "Polygender"
    }, {
        "id": 16,
        "firstName": "Eamon",
        "lastName": "Maccaig",
        "email": "emaccaigf@bigcartel.com",
        "role": "Male"
    }, {
        "id": 17,
        "firstName": "Winifield",
        "lastName": "Tonry",
        "email": "wtonryg@cisco.com",
        "role": "Male"
    }, {
        "id": 18,
        "firstName": "Bary",
        "lastName": "Gainseford",
        "email": "bgainsefordh@archive.org",
        "role": "Male"
    }, {
        "id": 19,
        "firstName": "Trenna",
        "lastName": "La Torre",
        "email": "tlatorrei@wordpress.com",
        "role": "Female"
    }, {
        "id": 20,
        "firstName": "Tracie",
        "lastName": "Summerside",
        "email": "tsummersidej@home.pl",
        "role": "Female"
    }, {
        "id": 21,
        "firstName": "Bendite",
        "lastName": "Amburgy",
        "email": "bamburgyk@ibm.com",
        "role": "Female"
    }, {
        "id": 22,
        "firstName": "Fayth",
        "lastName": "Trow",
        "email": "ftrowl@theglobeandmail.com",
        "role": "Female"
    }, {
        "id": 23,
        "firstName": "Ambrosio",
        "lastName": "Galsworthy",
        "email": "agalsworthym@telegraph.co.uk",
        "role": "Male"
    }, {
        "id": 24,
        "firstName": "Doloritas",
        "lastName": "Hayward",
        "email": "dhaywardn@instagram.com",
        "role": "Female"
    }, {
        "id": 25,
        "firstName": "Gayelord",
        "lastName": "Lavalle",
        "email": "glavalleo@wikia.com",
        "role": "Male"
    }, {
        "id": 26,
        "firstName": "Marion",
        "lastName": "Clerke",
        "email": "mclerkep@tiny.cc",
        "role": "Female"
    }, {
        "id": 27,
        "firstName": "Leigh",
        "lastName": "Baskeyfield",
        "email": "lbaskeyfieldq@cnn.com",
        "role": "Female"
    }, {
        "id": 28,
        "firstName": "Massimiliano",
        "lastName": "Caine",
        "email": "mcainer@blogspot.com",
        "role": "Male"
    }, {
        "id": 29,
        "firstName": "Fowler",
        "lastName": "Greenhalgh",
        "email": "fgreenhalghs@redcross.org",
        "role": "Male"
    }, {
        "id": 30,
        "firstName": "Spike",
        "lastName": "Mabee",
        "email": "smabeet@narod.ru",
        "role": "Male"
    }, {
        "id": 31,
        "firstName": "Lorne",
        "lastName": "Yakunin",
        "email": "lyakuninu@xing.com",
        "role": "Male"
    }, {
        "id": 32,
        "firstName": "Cleveland",
        "lastName": "Oury",
        "email": "couryv@desdev.cn",
        "role": "Male"
    }, {
        "id": 33,
        "firstName": "Ebenezer",
        "lastName": "Oneill",
        "email": "eoneillw@ucsd.edu",
        "role": "Male"
    }, {
        "id": 34,
        "firstName": "Deloria",
        "lastName": "Puttan",
        "email": "dputtanx@webeden.co.uk",
        "role": "Female"
    }, {
        "id": 35,
        "firstName": "Percy",
        "lastName": "Woodworth",
        "email": "pwoodworthy@homestead.com",
        "role": "Male"
    }, {
        "id": 36,
        "firstName": "Barbee",
        "lastName": "Mollatt",
        "email": "bmollattz@comsenz.com",
        "role": "Female"
    }, {
        "id": 37,
        "firstName": "Adrea",
        "lastName": "Guiot",
        "email": "aguiot10@edublogs.org",
        "role": "Agender"
    }, {
        "id": 38,
        "firstName": "Danica",
        "lastName": "McGaw",
        "email": "dmcgaw11@ameblo.jp",
        "role": "Non-binary"
    }, {
        "id": 39,
        "firstName": "Delinda",
        "lastName": "Killingback",
        "email": "dkillingback12@mayoclinic.com",
        "role": "Female"
    }, {
        "id": 40,
        "firstName": "Scotti",
        "lastName": "O'Sharry",
        "email": "sosharry13@usgs.gov",
        "role": "Male"
    }, {
        "id": 41,
        "firstName": "Isador",
        "lastName": "Bithany",
        "email": "ibithany14@freewebs.com",
        "role": "Male"
    }, {
        "id": 42,
        "firstName": "Grete",
        "lastName": "Callicott",
        "email": "gcallicott15@mysql.com",
        "role": "Female"
    }, {
        "id": 43,
        "firstName": "Bradan",
        "lastName": "Thewles",
        "email": "bthewles16@lulu.com",
        "role": "Male"
    }, {
        "id": 44,
        "firstName": "Claudia",
        "lastName": "Hould",
        "email": "chould17@ustream.tv",
        "role": "Female"
    }, {
        "id": 45,
        "firstName": "Ashlie",
        "lastName": "Philipeaux",
        "email": "aphilipeaux18@jigsy.com",
        "role": "Female"
    }, {
        "id": 46,
        "firstName": "Franchot",
        "lastName": "Olfert",
        "email": "folfert19@adobe.com",
        "role": "Male"
    }, {
        "id": 47,
        "firstName": "Donn",
        "lastName": "Gonnely",
        "email": "dgonnely1a@oakley.com",
        "role": "Genderfluid"
    }, {
        "id": 48,
        "firstName": "Wilfred",
        "lastName": "Gross",
        "email": "wgross1b@cocolog-nifty.com",
        "role": "Male"
    }, {
        "id": 49,
        "firstName": "Dorelia",
        "lastName": "Pendlington",
        "email": "dpendlington1c@google.ca",
        "role": "Female"
    }, {
        "id": 50,
        "firstName": "Maurie",
        "lastName": "Lacrouts",
        "email": "mlacrouts1d@quantcast.com",
        "role": "Bigender"
    }, {
        "id": 51,
        "firstName": "Molli",
        "lastName": "Joder",
        "email": "mjoder1e@tripadvisor.com",
        "role": "Female"
    }, {
        "id": 52,
        "firstName": "Gualterio",
        "lastName": "Pudden",
        "email": "gpudden1f@nba.com",
        "role": "Polygender"
    }, {
        "id": 53,
        "firstName": "Meggy",
        "lastName": "Fidele",
        "email": "mfidele1g@indiatimes.com",
        "role": "Female"
    }, {
        "id": 54,
        "firstName": "Pauletta",
        "lastName": "Brouard",
        "email": "pbrouard1h@bing.com",
        "role": "Female"
    }, {
        "id": 55,
        "firstName": "Eartha",
        "lastName": "Duckels",
        "email": "educkels1i@moonfruit.com",
        "role": "Female"
    }, {
        "id": 56,
        "firstName": "Chauncey",
        "lastName": "Ilchuk",
        "email": "cilchuk1j@ning.com",
        "role": "Male"
    }, {
        "id": 57,
        "firstName": "Melvin",
        "lastName": "Creavin",
        "email": "mcreavin1k@i2i.jp",
        "role": "Male"
    }, {
        "id": 58,
        "firstName": "Clarita",
        "lastName": "Dovinson",
        "email": "cdovinson1l@npr.org",
        "role": "Female"
    }, {
        "id": 59,
        "firstName": "Gearalt",
        "lastName": "Dyche",
        "email": "gdyche1m@netscape.com",
        "role": "Male"
    }, {
        "id": 60,
        "firstName": "Greggory",
        "lastName": "Beall",
        "email": "gbeall1n@chron.com",
        "role": "Male"
    }, {
        "id": 61,
        "firstName": "Horst",
        "lastName": "Livett",
        "email": "hlivett1o@globo.com",
        "role": "Male"
    }, {
        "id": 62,
        "firstName": "Ester",
        "lastName": "Radish",
        "email": "eradish1p@prlog.org",
        "role": "Agender"
    }, {
        "id": 63,
        "firstName": "Domenico",
        "lastName": "Pattington",
        "email": "dpattington1q@aol.com",
        "role": "Genderqueer"
    }, {
        "id": 64,
        "firstName": "Owen",
        "lastName": "Dillestone",
        "email": "odillestone1r@cmu.edu",
        "role": "Male"
    }, {
        "id": 65,
        "firstName": "Jeannette",
        "lastName": "Beardsdale",
        "email": "jbeardsdale1s@technorati.com",
        "role": "Female"
    }, {
        "id": 66,
        "firstName": "Ezri",
        "lastName": "Halson",
        "email": "ehalson1t@google.fr",
        "role": "Male"
    }, {
        "id": 67,
        "firstName": "Keri",
        "lastName": "Cullin",
        "email": "kcullin1u@stumbleupon.com",
        "role": "Female"
    }, {
        "id": 68,
        "firstName": "Sarita",
        "lastName": "Down",
        "email": "sdown1v@un.org",
        "role": "Female"
    }, {
        "id": 69,
        "firstName": "Boris",
        "lastName": "Strong",
        "email": "bstrong1w@163.com",
        "role": "Male"
    }, {
        "id": 70,
        "firstName": "Boigie",
        "lastName": "Losebie",
        "email": "blosebie1x@pagesperso-orange.fr",
        "role": "Male"
    }, {
        "id": 71,
        "firstName": "Reuven",
        "lastName": "Duckitt",
        "email": "rduckitt1y@mtv.com",
        "role": "Male"
    }, {
        "id": 72,
        "firstName": "Waiter",
        "lastName": "Baike",
        "email": "wbaike1z@gmpg.org",
        "role": "Non-binary"
    }, {
        "id": 73,
        "firstName": "Danielle",
        "lastName": "Romme",
        "email": "dromme20@webnode.com",
        "role": "Genderqueer"
    }, {
        "id": 74,
        "firstName": "Tabbitha",
        "lastName": "Reeks",
        "email": "treeks21@youtube.com",
        "role": "Non-binary"
    }, {
        "id": 75,
        "firstName": "Freeman",
        "lastName": "Izzard",
        "email": "fizzard22@webmd.com",
        "role": "Male"
    }, {
        "id": 76,
        "firstName": "Jamal",
        "lastName": "Mauchline",
        "email": "jmauchline23@stanford.edu",
        "role": "Male"
    }, {
        "id": 77,
        "firstName": "Kristoforo",
        "lastName": "Bucknill",
        "email": "kbucknill24@photobucket.com",
        "role": "Male"
    }, {
        "id": 78,
        "firstName": "Jose",
        "lastName": "Marklund",
        "email": "jmarklund25@wired.com",
        "role": "Male"
    }, {
        "id": 79,
        "firstName": "Neddy",
        "lastName": "McGonigal",
        "email": "nmcgonigal26@miibeian.gov.cn",
        "role": "Male"
    }, {
        "id": 80,
        "firstName": "Zebadiah",
        "lastName": "Maudlen",
        "email": "zmaudlen27@nasa.gov",
        "role": "Non-binary"
    }, {
        "id": 81,
        "firstName": "Valera",
        "lastName": "Nund",
        "email": "vnund28@npr.org",
        "role": "Female"
    }, {
        "id": 82,
        "firstName": "Beltran",
        "lastName": "Peagram",
        "email": "bpeagram29@paginegialle.it",
        "role": "Male"
    }, {
        "id": 83,
        "firstName": "Sharyl",
        "lastName": "Rosterne",
        "email": "srosterne2a@1und1.de",
        "role": "Female"
    }, {
        "id": 84,
        "firstName": "Tildy",
        "lastName": "Pattullo",
        "email": "tpattullo2b@utexas.edu",
        "role": "Female"
    }, {
        "id": 85,
        "firstName": "Laura",
        "lastName": "Richardes",
        "email": "lrichardes2c@geocities.com",
        "role": "Female"
    }, {
        "id": 86,
        "firstName": "Cristy",
        "lastName": "Swalwell",
        "email": "cswalwell2d@va.gov",
        "role": "Female"
    }, {
        "id": 87,
        "firstName": "Tonnie",
        "lastName": "Gilstin",
        "email": "tgilstin2e@pcworld.com",
        "role": "Male"
    }, {
        "id": 88,
        "firstName": "Valeda",
        "lastName": "Lunbech",
        "email": "vlunbech2f@adobe.com",
        "role": "Female"
    }, {
        "id": 89,
        "firstName": "Conney",
        "lastName": "Le feaver",
        "email": "clefeaver2g@stanford.edu",
        "role": "Male"
    }, {
        "id": 90,
        "firstName": "Ninon",
        "lastName": "Blaxlande",
        "email": "nblaxlande2h@whitehouse.gov",
        "role": "Polygender"
    }, {
        "id": 91,
        "firstName": "Rubina",
        "lastName": "Dawton",
        "email": "rdawton2i@sourceforge.net",
        "role": "Female"
    }, {
        "id": 92,
        "firstName": "Billye",
        "lastName": "Sperry",
        "email": "bsperry2j@redcross.org",
        "role": "Agender"
    }, {
        "id": 93,
        "firstName": "Jackie",
        "lastName": "Abell",
        "email": "jabell2k@nytimes.com",
        "role": "Male"
    }, {
        "id": 94,
        "firstName": "Ly",
        "lastName": "Klaas",
        "email": "lklaas2l@intel.com",
        "role": "Male"
    }, {
        "id": 95,
        "firstName": "Wini",
        "lastName": "Wrighton",
        "email": "wwrighton2m@drupal.org",
        "role": "Female"
    }, {
        "id": 96,
        "firstName": "Olivie",
        "lastName": "Whilde",
        "email": "owhilde2n@army.mil",
        "role": "Female"
    }, {
        "id": 97,
        "firstName": "Lela",
        "lastName": "Domenicone",
        "email": "ldomenicone2o@home.pl",
        "role": "Female"
    }, {
        "id": 98,
        "firstName": "Myrle",
        "lastName": "MacLucais",
        "email": "mmaclucais2p@is.gd",
        "role": "Female"
    }, {
        "id": 99,
        "firstName": "Alexine",
        "lastName": "Pordall",
        "email": "apordall2q@over-blog.com",
        "role": "Female"
    }, {
        "id": 100,
        "firstName": "Erminie",
        "lastName": "Guwer",
        "email": "eguwer2r@auda.org.au",
        "role": "Female"
    }

]

export {
    UserLogin,
    userDashboard,
    verifyCredentials,
    privateCheck,
    data,
}