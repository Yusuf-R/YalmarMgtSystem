import Popper from "@mui/material/Popper";

export const mainSection = {
    padding: '20px',
    width: 'calc(100% - 250px)',
    position: 'absolute',
    top: '70px',
    left: '200px',
}
export const txProps = {
    color: "red",
    bgcolor: "#274e61",
    borderRadius: "10px",
    width: '250px',
    fontSize: '16px',
    fontStyle: 'bold',
    '&:hover': {
        bgcolor: '#051935',
    },
    fontFamily: 'Poppins',
    "& .MuiInputBase-input": {
        color: 'white',
    },
    "& .MuiFormHelperText-root": {
        color: 'red',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: 'green',
    },
    "& input:-webkit-autofill": {
        WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
        WebkitTextFillColor: 'white',
    },
};
export const modalStyle = {
    position: 'absolute',
    top: '51%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    // overflow: 'auto',
    display: 'block',
    borderRadius: '10px',
    backgroundColor: 'white',
};
export const statesAndLGAs = {
    Abia: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikwuano",
        "Isiala-Ngwa North",
        "Isiala-Ngwa South",
        "Isuikwato",
        "Obi Nwa",
        "Ohafia",
        "Osisioma",
        "Ngwa",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "Umuahia South",
        "Umu-Neochi"
    ],
    Adamawa: [
        "Demsa",
        "Fufore",
        "Ganaye",
        "Gireri",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South"
    ],
    Anambra: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili south",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi"
    ],
    "Akwa Ibom": [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat Enin",
        "Nsit Atai",
        "Nsit Ibom",
        "Nsit Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong/Oruko ",
        "Uyo"
    ],
    Bauchi: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Ganjuwa",
        "Giade",
        "Itas/Gadau",
        "Jama'are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa-Balewa",
        "Toro",
        "Warji",
        "Zaki"
    ],
    Bayelsa: [
        "Brass",
        "Ekeremor",
        "Kolokuma/Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Jaw",
        "Yenegoa"
    ],
    Benue: [
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Obi",
        "Ogbadibo",
        "Oju",
        "Okpokwu",
        "Ohimini",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya"
    ],
    Borno: [
        "Abadam",
        "Askira/Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala/Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani"
    ],
    "Cross River": [
        "Akpabuyo",
        "Odukpani",
        "Akamkpa",
        "Biase",
        "Abi",
        "Ikom",
        "Yarkur",
        "Odubra",
        "Boki",
        "Ogoja",
        "Yala",
        "Obanliku",
        "Obudu",
        "Calabar South",
        "Etung",
        "Bekwara",
        "Bakassi",
        "Calabar Municipality"
    ],
    Delta: [
        "Oshimili",
        "Aniocha",
        "Aniocha South",
        "Ika South",
        "Ika North-East",
        "Ndokwa West",
        "Ndokwa East",
        "Isoko south",
        "Isoko North",
        "Bomadi",
        "Burutu",
        "Ughelli South",
        "Ughelli North",
        "Ethiope West",
        "Ethiope East",
        "Sapele",
        "Okpe",
        "Warri North",
        "Warri South",
        "Uvwie",
        "Udu",
        "Warri Central",
        "Ukwani",
        "Oshimili North",
        "Patani"
    ],
    Ebonyi: [
        "Edda",
        "Afikpo",
        "Onicha",
        "Ohaozara",
        "Abakaliki",
        "Ishielu",
        "lkwo",
        "Ezza",
        "Ezza South",
        "Ohaukwu",
        "Ebonyi",
        "Ivo"
    ],
    Enugu: [
        "Enugu South,",
        "Igbo-Eze South",
        "Enugu North",
        "Nkanu",
        "Udi Agwu",
        "Oji-River",
        "Ezeagu",
        "IgboEze North",
        "Isi-Uzo",
        "Nsukka",
        "Igbo-Ekiti",
        "Uzo-Uwani",
        "Enugu Eas",
        "Aninri",
        "Nkanu East",
        "Udenu."
    ],
    Edo: [
        "Esan North-East",
        "Esan Central",
        "Esan West",
        "Egor",
        "Ukpoba",
        "Central",
        "Etsako Central",
        "Igueben",
        "Oredo",
        "Ovia SouthWest",
        "Ovia South-East",
        "Orhionwon",
        "Uhunmwonde",
        "Etsako East",
        "Esan South-East"
    ],
    Ekiti: [
        "Ado",
        "Ekiti-East",
        "Ekiti-West",
        "Emure/Ise/Orun",
        "Ekiti South-West",
        "Ikere",
        "Irepodun",
        "Ijero,",
        "Ido/Osi",
        "Oye",
        "Ikole",
        "Moba",
        "Gbonyin",
        "Efon",
        "Ise/Orun",
        "Ilejemeje."
    ],
    FCT: [
        "Abaji",
        "Abuja Municipal",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali"
    ],
    Gombe: [
        "Akko",
        "Balanga",
        "Billiri",
        'Dukku',
        "Kaltungo",
        "Kwami",
        "Shomgom",
        "Funakaye",
        "Gombe",
        "Nafada/Bajoga",
        "Yamaltu/Delta."
    ],
    Imo: [
        "Aboh-Mbaise",
        "Ahiazu-Mbaise",
        "Ehime-Mbano",
        "Ezinihitte",
        "Ideato North",
        "Ideato South",
        "Ihitte/Uboma",
        "Ikeduru",
        "Isiala Mbano",
        "Isu",
        "Mbaitoli",
        "Mbaitoli",
        "Ngor-Okpala",
        "Njaba",
        "Nwangele",
        "Nkwerre",
        "Obowo",
        "Oguta",
        "Ohaji/Egbema",
        "Okigwe",
        "Orlu",
        "Orsu",
        "Oru East",
        "Oru West",
        "Owerri-Municipal",
        "Owerri North",
        "Owerri West"
    ],
    Jigawa: [
        "Auyo",
        "Babura",
        "Birni Kudu",
        "Biriniwa",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin Hausa",
        "Kaugama Kazaure",
        "Kiri Kasamma",
        "Kiyawa",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule-Tankarkar",
        "Taura",
        "Yankwashi"
    ],
    Kaduna: [
        "Birni-Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "jaba",
        "Jema'a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon-Gari",
        "Sanga",
        "Soba",
        "Zango-Kataf",
        "Zaria"
    ],
    Kano: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garum",
        "Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "kumbotso",
        "Ghari",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takali",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun Wada",
        "Ungogo",
        "Warawa",
        "Wudil"
    ],
    Katsina: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dandume",
        "Danja",
        "Dan Musa",
        "Daura",
        "Dutsi",
        "Dutsin-Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai'Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazuu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango"
    ],
    Kebbi: [
        "Aleiro",
        "Arewa-Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko/Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu/Danko",
        "Yauri",
        "Zuru"
    ],
    Kogi: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Bassa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela-Odolu",
        "Ijumu",
        "Kabba/Bunu",
        "Kogi",
        "Lokoja",
        "Mopa-Muro",
        "Ofu",
        "Ogori/Mangongo",
        "Okehi",
        "Okene",
        "Olamabolo",
        "Omala",
        "Yagba East",
        "Yagba West"
    ],
    Kwara: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti",
        "Ifelodun",
        "Ilorin East",
        "Ilorin West",
        "Irepodun",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke-Ero",
        "Oyun",
        "Pategi"
    ],
    Lagos: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti-Osa",
        "Ibeju/Lekki",
        "Ifako-Ijaye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Lagos Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere"
    ],
    Nasarawa: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa-Eggon",
        "Obi",
        "Toto",
        "Wamba"
    ],
    Niger: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Muya",
        "Pailoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi"
    ],
    Ogun: [
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo/Ota",
        "Yewa North",
        "Yewa South",
        "Ewekoro",
        "Ifo",
        "Ijebu East",
        "Ijebu North",
        "Ijebu North East",
        "Ijebu Ode",
        "Ikenne",
        "Imeko-Afon",
        "Ipokia",
        "Obafemi-Owode",
        "Ogun Waterside",
        "Odeda",
        "Odogbolu",
        "Remo North",
        "Shagamu"
    ],
    Ondo: [
        "Akoko North East",
        "Akoko North West",
        "Akoko South Akure East",
        "Akoko South West",
        "Akure North",
        "Akure South",
        "Ese-Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile-Oluji",
        "Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo East",
        "Ondo West",
        "Ose",
        "Owo"
    ],
    Osun: [
        "Aiyedade",
        "Aiyedire",
        "Atakumosa East",
        "Atakumosa West",
        "Boluwaduro",
        "Boripe",
        "Ede North",
        "Ede South",
        "Egbedore",
        "Ejigbo",
        "Ife Central",
        "Ife East",
        "Ife North",
        "Ife South",
        "Ifedayo",
        "Ifelodun",
        "Ila",
        "Ilesha East",
        "Ilesha West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo-Otin",
        "Ola-Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo"
    ],
    Oyo: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan Central",
        "Ibadan North",
        "Ibadan North West",
        "Ibadan South East",
        "Ibadan South West",
        "Ibarapa Central",
        "Ibarapa East",
        "Ibarapa North",
        "Ido",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona-Ara",
        "Orelope",
        "Ori Ire",
        "Oyo East",
        "Oyo West",
        "Saki East",
        "Saki West",
        "Surulere"
    ],
    Plateau: [
        "Barikin Ladi",
        "Bassa",
        "Bokkos",
        "Jos East",
        "Jos North",
        "Jos South",
        "Kanam",
        "Kanke",
        "Langtang North",
        "Langtang South",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase"
    ],
    Rivers: [
        "Abua/Odual",
        "Ahoada East",
        "Ahoada West",
        "Akuku Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Emohua",
        "Eleme",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio/Akpor",
        "Ogba/Egbema/Ndoni",
        "Ogu/Bolo",
        "Okrika",
        "Omumma",
        "Opobo/Nkoro",
        "Oyigbo",
        "Port-Harcourt",
        "Tai"
    ],
    Sokoto: [
        "Binji",
        "Bodinga",
        "Dange-shnsi",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gawabawa",
        "Illela",
        "Isa",
        "Kware",
        "kebbe",
        "Rabah",
        "Sabon birni",
        "Shagari",
        "Silame",
        "Sokoto North",
        "Sokoto South",
        "Tambuwal",
        "Tqngaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo"
    ],
    Taraba: [
        "Ardo-kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Cassol",
        "Ibi",
        "Jalingo",
        "Karin-Lamido",
        "Kurmi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing"
    ],
    Yobe: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Karawa",
        "Machina",
        "Nangere",
        "Nguru Potiskum",
        "Tarmua",
        "Yunusari",
        "Yusufari"
    ],
    Zamfara: [
        "Anka",
        "Bakura",
        "Birnin Magaji",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Kaura",
        "Namoda",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata Mafara",
        "Tsafe",
        "Zurmi"
    ]
};
export const jobTitle =
    [
        'Accountant',
        'Admin',
        'Driver',
        'Field Supervisor',
        'Generator Technician',
        'Lawyer',
        'Procurement Officer',
        'Security Officer',
        'SuperAdmin',
        'User',
    ];
export const employmentType =
    [
        'FullTime',
        'Contract',
        'Trainee',
    ];
export const sitesData = {
    'BIRNIN-GWARI': [
        "BRU001",
        "BGR007",
        "BGR005",
        "BGR003",
        "BGR002",
        "BGR001",
        "KOM001"
    ],
    'KADUNA-CENTRAL': [
        "KAD020",
        "KAD037",
        "KAD038",
        "KAD052",
        "KAD055",
        "KAD056",
        "KAD064",
        "KAD071",
        "KAD072",
        "KAD081",
        "KAD103",
        "TNA013"
    ],
    ZARIA: [
        "ZAR001",
        "ZAR002",
        "ZAR003",
        "ZAR004",
        "ZAR005",
        "ZAR006",
        "ZAR007",
        "ZAR012",
        "ZAR014",
        "ZAR015",
        "ZAR017",
        "ZAR019",
        "ZAR026",
        "ZAR028",
        "ZAR029",
        "ZAR032",
        "ZAR033",
        "ZAR045",
        "ZAR048",
        "ZAR049",
        "ZAR050",
        "TAB008",
        "TNB010",
        "TNB011",
        "KZK015",
        "KZK016",
        "KZK046",
        "KZK009",
        "KZK010",
        "KZK011",
        "KZK012",
        "KZK013",
        "KZK014",
        "KZK017",
        "KZK018",
        "KZK019",
        "KZK030",
        "KZK031",
        "KZK801",
        "MKF002",
        "SBA001",
        "SBA002",
        "SBA003",
        "SBA004",
        "MTR001",
        "MTR002"
    ],
};
export const siteStates = [
    'KADUNA',
];
export const sex = [
    'Female',
    'Male',
];
export const martialStatus = [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
];
export const title = [
    'Miss',
    'Mr',
    'Mrs',
];
export const religionIdentity = [
    'Christianity',
    'Islam',
    'Others',
];
export const Countries = [
    'Nigeria',
];
export const nextOfKinRelationship = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Son',
    'Daughter',
    'Spouse',
    'Wife',
    'Husband',
    'Uncle',
    'Aunt',
    'Cousin',
    'Nephew',
    'Niece',
    'Grandfather',
    'Grandmother',
    'Others',
];
export const highestDegree = [
    'SSCE',
    'NCE',
    'ND',
    'OND',
    'HND',
    'BSc',
    'MSc',
    'PgD',
    'PhD',
    'Others',
];
export const institutions = [
    "Abubakar Tafawa Balewa University, Bauchi",
    "Ahmadu Bello University, Zaria",
    "Bayero University of Kano, Kano",
    "Federal University Gashua, Yobe",
    "Federal University of Petroleum Resources, Effurun",
    "Federal University of Technology, Akure",
    "Federal University of Technology, Minna",
    "Federal University of Technology, Owerri",
    "Federal University, Dutse, Jigawa State",
    "Federal University, Dutsin-Ma, Katsina",
    "Federal University, Kashere, Gombe State",
    "Federal University, Lafia, Nasarawa State",
    "Federal University, Lokoja, Kogi State",
    "Alex Ekwueme University, Ndufu-Alike, Ebonyi State",
    "Federal University, Otuoke, Bayelsa",
    "Federal University, Oye-Ekiti, Ekiti State",
    "Federal University, Wukari, Taraba State",
    "Federal University, Birnin Kebbi",
    "Federal University, Gusau Zamfara",
    "Michael Okpara University of Agricultural Umudike",
    "Modibbo Adama University of Technology, Yola",
    "National Open University of Nigeria, Lagos",
    "Nigeria Police Academy Wudil",
    "Nigerian Defence Academy Kaduna",
    "Nnamdi Azikiwe University, Awka",
    "Obafemi Awolowo University,Ile-Ife",
    "University of Abuja, Gwagwalada",
    "Federal University of Agriculture, Abeokuta",
    "Joseph Sarwuan Tarka University, Makurdi",
    "University of Benin",
    "University of Calabar",
    "University of Ibadan, Ibadan",
    "University of Ilorin",
    "University of Jos",
    "University of Lagos, Akoka, Lagos State",
    "University of Maiduguri",
    "University of Nigeria, Nsukka",
    "University of Port-Harcourt",
    "University of Uyo",
    "Usumanu Danfodiyo University, Sokoto",
    "Nigerian Maritime University Okerenkoko, Delta State",
    "Air Force Institute of Technology, Kaduna",
    "Nigerian Army University Biu",
    "Federal University of Health Technology, Otukpo Benue State",
    "Federal University of Agriculture, Zuru, Kebbi State",
    "Federal University of Technology, Babura, Jigawa State",
    "Federal University of Technology, Ikot Abasi, Akwa Ibom State",
    "Federal University of Health Sciences, Azare, Bauchi State",
    "Federal University of Health Sciences, Ila Orangun, Osun State",
    "David Nweze Umahi Federal University of Medical Sciences, Uburu",
    "Admiralty University Ibusa, Delta State",
    "Federal University of Transportation Daura, Katsina",
    "African Aviation and Aerospace University",
    "Abia State University, Uturu",
    "Adamawa State University Mubi",
    "Adekunle Ajasin University, Akungba",
    "Akwa Ibom State University, Ikot Akpaden",
    "Ambrose Alli University, Ekpoma",
    "Chukwuemeka Odumegwu Ojukwu University, Uli",
    "Bauchi State University, Gadau",
    "Benue State University, Makurdi",
    "Yobe State University, Damaturu",
    "Cross River State University of  Technology, Calabar",
    "Delta State University Abraka",
    "Ebonyi State University, Abakaliki",
    "Ekiti State University",
    "Enugu State University of Science and Technology, Enugu",
    "Gombe State Univeristy, Gombe",
    "Ibrahim Badamasi Babangida University, Lapai",
    "Ignatius Ajuru University of Education,Rumuolumeni",
    "Imo State University, Owerri",
    "Sule Lamido University, Kafin Hausa, Jigawa",
    "Kaduna State University, Kaduna",
    "Kano University of Science & Technology, Wudil",
    "Kebbi State University of Science and Technology, Aliero",
    "Prince Abubakar Audu University Anyigba",
    "Kwara State University, Ilorin",
    "Ladoke Akintola University of Technology, Ogbomoso",
    "Ondo State University of Science and Technology Okitipupa",
    "Rivers State University",
    "Olabisi Onabanjo University, Ago Iwoye",
    "Lagos State University, Ojo",
    "Niger Delta University Yenagoa",
    "Nasarawa State University Keffi",
    "Plateau State University Bokkos",
    "Tai Solarin University of Education Ijebu Ode",
    "Umar Musa Yar' Adua University Katsina",
    "Osun State University Osogbo",
    "Taraba State University, Jalingo",
    "Sokoto State University",
    "Yusuf Maitama Sule University Kano",
    "First Technical University Ibadan",
    "Ondo State University of Medical Sciences",
    "Edo State University Uzairue",
    "Kingsley Ozumba Mbadiwe University Ogboko, Imo State",
    "University of Africa Toru Orua, Bayelsa State",
    "Bornu State University, Maiduguri",
    "Moshood Abiola University of Science and Technology Abeokuta",
    "Gombe State University of Science and Technology",
    "Zamfara State University",
    "Bayelsa Medical University",
    "University of Agriculture and Environmental Sciences Umuagwo, Imo State",
    "Confluence University of Science and Technology Osara, Kogi",
    "University of Delta, Agbor",
    "Delta University of Science and Technology, Ozoro",
    "Dennis Osadebe University, Asaba",
    "Bamidele Olumilua University of Science and Technology Ikere, Ekiti State",
    "Lagos State University of Education, Ijanikin",
    "Lagos State University of Science and Technology Ikorodu",
    "Shehu Shagari University of Education, Sokoto",
    "State University of Medical and Applied Sciences, Igbo-Eno, Enugu",
    "University of Ilesa, Osun State",
    "Emanuel Alayande University of Education Oyo",
    "Sa’adatu Rimi University of Education",
    "Kogi State University, Kabba",
    "Niger State University of Education, Minna",
    "Achievers University, Owo",
    "Adeleke University, Ede",
    "Afe Babalola University, Ado-Ekiti - Ekiti State",
    "African University of Science & Technology, Abuja",
    "Ajayi Crowther University, Ibadan",
    "Al-Hikmah University, Ilorin",
    "Al-Qalam University, Katsina",
    "American University of Nigeria, Yola",
    "Augustine University",
    "Babcock University,Ilishan-Remo",
    "Baze University",
    "Bells University of Technology, Otta",
    "Benson Idahosa University, Benin City",
    "Bingham University, New Karu",
    "Bowen University, Iwo",
    "Caleb University, Lagos",
    "Caritas University, Enugu",
    "Chrisland University",
    "Covenant University Ota",
    "Crawford University Igbesa",
    "Crescent University",
    "Edwin Clark University, Kaigbodo",
    "Elizade University, Ilara-Mokin",
    "Evangel University, Akaeze",
    "Fountain Unveristy, Oshogbo",
    "Godfrey Okoye University, Ugwuomu-Nike - Enugu State",
    "Gregory University, Uturu",
    "Hallmark University, Ijebi Itele, Ogun",
    "Hezekiah University, Umudi",
    "Igbinedion University Okada",
    "Joseph Ayo Babalola University, Ikeji-Arakeji",
    "Kings University, Ode Omu",
    "Kwararafa University, Wukari",
    "Landmark University, Omu-Aran.",
    "Lead City University, Ibadan",
    "Madonna University, Okija",
    "Mcpherson University, Seriki Sotayo, Ajebo",
    "Micheal & Cecilia Ibru University",
    "Mountain Top University",
    "Nile University of Nigeria, Abuja",
    "Novena University, Ogume",
    "Obong University, Obong Ntak",
    "Oduduwa University, Ipetumodu - Osun State",
    "Pan-Atlantic University, Lagos",
    "Paul University, Awka - Anambra State",
    "Redeemer's University, Ede",
    "Renaissance University, Enugu",
    "Rhema University, Obeama-Asa - Rivers State",
    "Ritman University, Ikot Ekpene, Akwa Ibom",
    "Salem University, Lokoja",
    "Glorious Vision University, Ogwa, Edo State.",
    "Southwestern University, Oku Owa",
    "Summit University, Offa",
    "Tansian University, Umunya",
    "University of Mkar, Mkar",
    "Veritas University, Abuja",
    "Wellspring University, Evbuobanosa - Edo State",
    "Wesley University Ondo",
    "Western Delta University, Oghara Delta State",
    "Christopher University Mowe",
    "Kola Daisi University Ibadan, Oyo State",
    "Anchor University Ayobo Lagos State",
    "Dominican University Ibadan Oyo State",
    "Legacy University, Okija Anambra State",
    "Arthur Javis University Akpoyubo Cross river State",
    "Ojaja University Eiyenkorin, Kwara State",
    "Coal City University Enugu State",
    "Clifford University Owerrinta Abia State",
    "Spiritan University, Nneochi Abia State",
    "Precious Cornerstone University, Oyo",
    "PAMO University of Medical Sciences, Portharcourt",
    "Atiba University Oyo",
    "Eko University of Medical and Health Sciences Ijanikin, Lagos",
    "Skyline University, Kano",
    "Greenfield University, Kaduna",
    "Dominion University Ibadan, Oyo State",
    "Trinity University Ogun State",
    "Westland University Iwo, Osun State",
    "Topfaith University, Mkpatak, Akwa Ibom State",
    "Thomas Adewumi University, Oko-Irese, Kwara State",
    "Maranathan University, Mgbidi, Imo State",
    "Ave Maria University, Piyanko, Nasarawa State",
    "Al-Istiqama University, Sumaila, Kano State",
    "Mudiame University, Irrua, Edo State",
    "Havilla University, Nde-Ikom, Cross River State",
    "Claretian University of Nigeria, Nekede, Imo State",
    "NOK University, Kachia, Kaduna State",
    "Karl-Kumm University, Vom, Plateau State",
    "James Hope University, Lagos, Lagos State",
    "Maryam Abacha American University of Nigeria, Kano State",
    "Capital City University, Kano State",
    "Ahman Pategi University, Kwara State",
    "University of Offa, Kwara State",
    "Mewar International University, Masaka, Nasarawa State",
    "Edusoko University, Bida, Niger State",
    "Philomath University, Kuje, Abuja",
    "Khadija University, Majia, Jigawa State",
    "Anan University, Kwall, Plateau State",
    "PEN Resource University, Gombe",
    "Al-Ansar University, Maiduguri, Borno",
    "Margaret Lawrence University, Umunede, Delta State",
    "Khalifa Isiyaku Rabiu University, Kano",
    "Sports University, Idumuje, Ugboko, Delta State",
    "Baba Ahmed University, Kano State",
    "Saisa University of Medical Sciences and Technology, Sokoto State",
    "Nigerian British University, Asa, Abia State",
    "Peter University, Achina-Onneh Anambra State",
    "Newgate University, MInna, Niger State.",
    "European University of Nigeria, Duboyi, FCT",
    "NorthWest University Sokoto State",
    "Rayhaan University, Kebbi",
    "Muhammad Kamalud University Kwara",
    "Sam Maris University, Ondo",
    "Aletheia University, Ago-Iwoye Ogun State",
    "Lux Mundi University Umuahia, Abia State",
    "Maduka University, Ekwegbe, Enugu State",
    "PeaceLand University, Enugu State",
    "Amadeus University, Amizi, Abia State",
    "Vision University, Ikogbo, Ogun State",
    "Azman University, Kano State",
    "Huda University, Gusau, Zamafara State",
    "Franco British International University, Kaduna State",
    "Canadian University of Nigeria, Abuja",
    "Gerar University of Medical Science Imope Ijebu, Ogun State.",
    "British Canadian University, Obufu Cross River State",
    "Hensard University, Toru-Orua, Sagbama, Bayelsa State",
    "Amaj University, Kwali, Abuja",
    "Phoenix University, Agwada, Nasarawa State",
    "Wigwe University, Isiokpo Rivers State",
    "Hillside University of Science and Technology, Okemisi, Ekiti State",
    "University on the Niger, Umunya, Anambra state",
    "Elrazi Medical University Yargaya University, Kano State",
    "Venite University, Iloro-Ekiti, Ekiti State",
    "Shanahan University Onitsha, Anambra State",
    "The Duke Medical University, Calabar, Cross River State",
    "Mercy Medical University, Iwo, Ogun State",
    "Cosmopolitan University Abuja",
    "Miva Open University, Abuja FCT",
    "Iconic Open University, Sokoto State.",
    "West Midlands Open University, Ibadan, Oyo State",
    "Al-Muhibbah Open University, Abuja",
    "El-Amin University, Minna, Niger State",
    "College of Petroleum and Energy Studies, Kaduna State",
    "Jewel University, Gombe state",
    "Prime University, Kuje, FCT Abuja",
    "Nigerian University of Technology and Management, Apapa, Lagos State",
    "Al-Bayan University, Ankpa, Kogi State",
    "Others",
];
export const faculties = [
    "Arts",
    "Basic Medical Sciences",
    "Clinical Sciences",
    "Dental Sciences",
    "Education",
    "Physical Sciences",
    "Engineering",
    "Environmental Sciences",
    "Science",
    "Health",
    "Business",
    "Law",
    "Management Sciences",
    "Pharmacy",
    "Social Sciences",
    "Humanities",
    "Others",
]
export const classOfDegree = [
    "Distinction",
    "First Class",
    "Second Class Upper",
    "Second Class Lower",
    "Third Class",
    "Upper Credit",
    "Lower Credit",
    "Credit",
    "Merit",
    "Pass",
    "Others",
]
export const status = [
    "Active",
    "Suspended",
    "Terminated",
    "Deceased",
    'Pending',
]
export const leaveType = [
    "Annual",
    "Casual",
    "Compassionate",
    "Emergency",
    "Maternity",
    "Paternity",
    "Sick",
    "Study",
    "Leave without Pay",
    "Others",
]
export const leaveReason = [
    "Accident",
    "Annual",
    "Appointment",
    "Bereavement",
    "Burial",
    "Emergency",
    "Family Related",
    "Personal",
    "Medical CheckUp",
    "Medical",
    "Surgery",
    "Wedding",
    "Confidential",
]
export const statusAction = [
    "Pending",
    "Accepted",
    "Rejected"
]
export const siteStatus = [
    'Inactive',
    'Active',
    'Deactivated',
]
export const type = [
    'MGW',
    'HUB',
    'MAJOR-HUB',
    'TERMINAL',
    'TERMINAL-HUB',
    'BSC',
]
export const autoCompleteSx = {
    backgroundColor: "#274e61",
    borderRadius: "10px",
    width: '250px',
    "& .MuiInputLabel-root": {
        color: '#46F0F9', // Label text color
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: '#FFF', // Label text color when focused
    },
    // text color to white after selecting from the dropdown list
    "& .MuiInputBase-input": {
        color: '#FFF',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    "& .MuiAutocomplete-endAdornment": {
        color: '#FFF',
    },
    "& .MuiAutocomplete-clearIndicator": {
        color: '#FFF',
    },
    "& .MuiAutocomplete-popupIndicator": {
        color: '#FFF',
    },
    '&:hover': {
        bgcolor: '#051935',
    },
};
export const CustomPopper = (props) => {
    return (
        <Popper
            {...props}
            sx={{
                '& .MuiAutocomplete-listbox': {
                    bgcolor: '#274e61', // Background color of the dropdown list
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                },
                '& .MuiAutocomplete-option': {
                    '&[aria-selected="true"]': {
                        bgcolor: '#051935 !important', // Background color of the selected option
                        color: 'white !important', // Ensure the text color of the selected option is white
                    },
                    '&:hover': {
                        bgcolor: '#1a3a4f !important', // Background color of the hovered option
                        color: 'white !important', // Ensure the text color of the hovered option is white
                    },
                },
            }}
        />
    );
};
export const baseFields = [
    'adminFullName', 'adminEmail', 'adminRole', 'incidentDate', 'reportCategory', 'severity',
    'reportDescription', 'images', 'admin_id'
];
export const categoryFields = {
    Others: [],
    Fuel: [
        'fuelSiteInfo', 'categoryFuel', 'categoryTheft', 'categoryQuality', 'categoryIntervention', 'categoryFuelOthers'
    ],
    Site: [
        'siteInfo', 'categorySite', 'categorySecurity', 'categoryShelter', 'categorySiteOthers'
    ],
    Service: [
        'serviceSiteInfo', 'categoryService', 'categoryMaintenance', 'categoryRepair', 'categoryOverhauling', 'categoryReplacement', 'categoryServiceOthers'
    ],
    Staff: [
        'staff_id', 'fullName', 'email', 'role', 'classAction',
        'categoryEmployment', 'categoryRole', 'categoryViolence', 'categoryStaffOthers'
    ],
};
