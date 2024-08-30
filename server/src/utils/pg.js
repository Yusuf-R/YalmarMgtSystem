// require('dotenv').config({path: '../../../server/.env'});
// const {v4: uuidv4} = require('uuid');
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const Site = require('../models/Sites');
// const Staff = require('../models/Staff'); // Adjust the path to your Staff model
// const Servicing = require('../models/Servicing')
//
//
// var jwt = require('jsonwebtoken');
// var cookieParser = require('cookie-parser')
//
// const encryptData = (data) => {
//     const keyBuffer = Buffer.from(process.env.CIPHER_SECRET, 'hex');
//     const iv = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
//     let encrypted = cipher.update(data, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     const authTag = cipher.getAuthTag();
//     return iv.toString('hex') + authTag.toString('hex') + encrypted;
// }
//
// const decryptedData = (encryptedData) => {
//     const keyBuffer = Buffer.from(process.env.CIPHER_SECRET, 'hex');
//     const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
//     const authTag = Buffer.from(encryptedData.slice(32, 64), 'hex');
//     const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
//     decipher.setAuthTag(authTag);
//     try {
//         let decryptedData = decipher.update(encryptedData.slice(64), 'hex', 'utf8');
//         decryptedData += decipher.final('utf8');
//         return decryptedData;
//     } catch (error) {
//         console.error('Error during decryption:', error.message);
//         return null;
//     }
// }
//
// const data = {
//     name: 'Kehinde',
//     id: uuid4(),
//     isAdmin: true,
// }
//
// const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
// console.log({accessToken});
// const encryptedData = encryptData(accessToken);
// console.log({encryptedData});
// const decryptDT = decryptedData(encryptedData);
// console.log({decryptDT});
// // console.log(crypto.randomBytes(32).toString('hex'));
//
//
//
// const allSitesData = {
//     'BIRNIN-GWARI': [
//         {siteId: "BGR001", location: "BRININ GWARI"},
//         {siteId: "BGR002", location: "KWAGA"},
//         {siteId: "BGR003", location: "POLE WIYA"},
//         {siteId: "BGR005", location: "KURIGA"},
//         {siteId: "BGR007", location: "UDAWA"},
//         {siteId: "BRU001", location: "BURUKU"},
//         {siteId: "KOM001", location: "DOKA"},
//     ],
//     'KADUNA-CENTRAL': [
//         {siteId: "KAD020", type: "TERMINAL", location: "AIR FORCE BASE"},
//         {siteId: "KAD037", type: "MAJOR-HUB", location: "UGWAN MUA'ZU ABATTOIR"},
//         {siteId: "KAD038", type: "TERMINAL", location: "KAKURI OPPOSITE NIG.BREWERIES"},
//         {siteId: "KAD052", type: "MAJOR-HUB", location: "MOUKA FOAM TRIKIANIA"},
//         {siteId: "KAD055", type: "TERMINAL", location: "TRIKIANIA"},
//         {siteId: "KAD056", type: "HUB", location: "NASSARAWA"},
//         {siteId: "KAD064", type: "TERMINAL", location: "EYE CENTER"},
//         {siteId: "KAD071", type: "TERMINAL", location: "KURMI GWARI MONDAY MARKET"},
//         {siteId: "KAD072", type: "TERMINAL", location: "UGWAN TAKE"},
//         {siteId: "KAD081", type: "TERMINAL", location: "SUNGLASS TRIKIANIA"},
//         {siteId: "KAD103", type: "HUB", location: "CON OIL KAD TOWN BEFORE TEN STORY"},
//         {siteId: "TNA013", type: "TERMINAL", location: "AIR FORCE BASE"},
//     ],
//     ZARIA: [
//         {siteId: "KZK009", type: "TERMINAL", location: "TASHA ANGO"},
//         {siteId: "KZK010", type: "HUB", location: "JAN MAMAMRA"},
//         {siteId: "KZK011", type: "HUB", location: "GIDAN BOKO"},
//         {siteId: "KZK012", type: "MGW", location: "TOLL GATE"},
//         {siteId: "KZK013", type: "HUB", location: "MARKE"},
//         {siteId: "KZK014", type: "MAJOR-HUB", location: "LIKORO(TASHE YARI"},
//         {siteId: "KZK015", type: "HUB", location: "MARABAN GWADA"},
//         {siteId: "KZK016", type: "MAJOR-HUB", location: "AGWAN DANKALI DANMAGAJI"},
//         {siteId: "KZK017", type: "HUB", location: "ZIRA(TAHIRAN SARKI"},
//         {siteId: "KZK018", type: "HUB", location: "SABON BIRNI TOWN"},
//         {siteId: "KZK019", type: "HUB", location: "BURAR DORI"},
//         {siteId: "KZK030", type: "TERMINAL", location: "TASHA YARI"},
//         {siteId: "KZK031", type: "TERMINAL", location: "KAROKA"},
//         {siteId: "KZK046", type: "HUB", location: "BEHIND TOWN SCHOOL GRA ZARIA"},
//         {siteId: "KZK801", type: "TERMINAL", location: "RUGGAR LAYI"},
//         {siteId: "MKF002", type: "TERMINAL", location: "TAUNGO"},
//         {siteId: "MTR001", type: "HUB", location: "MAIRAGO"},
//         {siteId: "MTR002", type: "TERMINAL", location: "RUGGAR KAMMA"},
//         {siteId: "SBA001", type: "HUB", location: "ZANGO GAYAM"},
//         {siteId: "SBA002", type: "TERMINAL", location: "RAFIN GUZA"},
//         {siteId: "SBA003", type: "HUB", location: "BAGAJA MAMMAN TSOHO"},
//         {siteId: "SBA004", type: "HUB", location: "KAROKA"},
//         {siteId: "TAB008", type: "TERMINAL", location: "FILIN MALAWA"},
//         {siteId: "TNB010", type: "TERMINAL", location: "POLY KAD. ZARIA ROAD"},
//         {siteId: "TNB011", type: "TERMINAL", location: "POLY GASKIYA"},
//         {siteId: "ZAR001", type: "HUB", location: "RIMI DOKO"},
//         {siteId: "ZAR002", type: "HUB", location: "KOFAR KUYANBANA"},
//         {siteId: "ZAR003", type: "TERMINAL", location: "BABAN DODO"},
//         {siteId: "ZAR004", type: "HUB", location: "KOROBEI"},
//         {siteId: "ZAR005", type: "MAJOR-HUB", location: "KOFAR DOKO"},
//         {siteId: "ZAR006", type: "TERMINAL", location: "PEPSI-COLA"},
//         {siteId: "ZAR007", type: "TERMINAL", location: "LAYIN WAWA"},
//         {siteId: "ZAR012", type: "TERMINAL", location: "ZARIA HOTEL(GRA)"},
//         {siteId: "ZAR014", type: "TERMINAL", location: "HAWA RD(GRA"},
//         {siteId: "ZAR015", type: "TERMINAL", location: "MTD JUNCTION"},
//         {siteId: "ZAR017", type: "MAJOR-HUB", location: "HAWA YANGORO"},
//         {siteId: "ZAR019", type: "HUB", location: "ZANGO SHANU(AVIATION"},
//         {siteId: "ZAR026", type: "TERMINAL", location: "KOROBEI MADARKACI"},
//         {siteId: "ZAR027", type: "TERMINAL", location: "OLD TOLL GATE"},
//         {siteId: "ZAR028", type: "TERMINAL", location: "ZARIA CITY MAGAJIN GARI"},
//         {siteId: "ZAR029", type: "TERMINAL", location: "BASSAWA"},
//         {siteId: "ZAR032", type: "HUB", location: "AGWAN KAYA"},
//         {siteId: "ZAR033", type: "TERMINAL-HUB", location: "GASKIYA"},
//         {siteId: "ZAR045", type: "HUB", location: "GANGARE KWADI"},
//         {siteId: "ZAR048", type: "TERMINAL", location: "ZABI(ZARIA KANO ROAD"},
//         {siteId: "ZAR049", type: "TERMINAL", location: "BEHIND FCE KONGO ZARIA"},
//         {siteId: "ZAR050", type: "TERMINAL", location: "ZARIA CITY BAKIN KASUWA"},
//     ],
// };
// const allSiteStates = [
//     'KADUNA',
// ];
//
// // script to create all the sites
// (async function () {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/YalmarMgt', {});
//         const sites = [];
//         for (const cluster in allSitesData) {
//             const siteIds = allSitesData[cluster];
//             siteIds.forEach(site => {
//                 sites.push({
//                     siteId: site.siteId,
//                     state: allSiteStates[0],
//                     cluster,
//                     type: site.type || 'HUB',
//                     status: 'Active',
//                     location: site.location,
//                     longitude: 0.00,
//                     latitude: 0.00,
//                 });
//             });
//         }
//         // console.log(sites);
//         await Site.insertMany(sites);
//         console.log('All sites created successfully');
//     } catch (error) {
//         console.error('Error creating sites:', error);
//     } finally {
//         await mongoose.disconnect();
//         process.exit();
//     }
// })();
//
// // script for updating staff FullName
// (async function () {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/YalmarMgt', {});
//         console.log('Connected to the database successfully.');
//
//         // Fetch all staff documents
//         const staffMembers = await Staff.find({});
//         console.log(`Found ${staffMembers.length} staff members.`);
//
//         // Function to generate full name
//         function generateFullName(doc) {
//             const {title, firstName, middleName, lastName} = doc;
//             let fullName = '';
//
//             if (title) {
//                 fullName += `${title} `;
//             }
//             if (firstName) {
//                 fullName += `${firstName} `;
//             }
//             if (middleName) {
//                 fullName += `${middleName} `;
//             }
//             if (lastName) {
//                 fullName += lastName;
//             }
//
//             return fullName.trim();
//         }
//
//         // Iterate over each staff document and update the fullName
//         for (const staff of staffMembers) {
//             staff.fullName = generateFullName(staff);
//             await staff.save();
//             console.log(`Updated fullName for staff: ${staff._id}`);
//         }
//
//         console.log('All staff full names updated successfully.');
//     } catch (error) {
//         console.error('Error updating staff fullName:', error);
//     } finally {
//         await mongoose.disconnect();
//         console.log('Disconnected from the database.');
//         process.exit();
//     }
// })();
//
// // function to update the serviceing date to date object type
// async function upDate() {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/YalmarMgt', {});
//         console.log('Connected to the database successfully.');
//
//         const allServiceRecords = await Servicing.find({});
//         for (const record of allServiceRecords) {
//             const servicingDate = new Date(record.servicingDate);
//             const nextServiceDate = new Date(record.nextServiceDate);
//
//             // Update the record
//             await Servicing.updateOne(
//                 {_id: record._id},
//                 {$set: {servicingDate, nextServiceDate}}
//             );
//         }
//         console.log('Date strings converted to Date objects successfully.');
//     } catch (error) {
//         console.error('Error servicing date records:', error);
//     } finally {
//         await mongoose.disconnect();
//         console.log('Disconnected from the database.');
//         process.exit();
//     }
// };
//
// upDate();



const query = {
    siteType: 'HUB',
    location: 'BRININ GWARI',
    pmInstance: 'PM1',
    year: '2024',
    month: 'august',
    siteId: 'BGR001',
    cluster: 'BIRNIN-GWARI',
    state: 'KADUNA'
}

// sort the query by the keys in ascending order and return an object variable called sortedQuery
const sortedQuery = Object.keys(query).sort().reduce((acc, key) => {
    acc[key] = query[key];
    return acc;
}, {});

const constructedValue = {
    siteType: 'HUB',
    location: 'BRININ GWARI',
    pmInstance: 'PM1',
    year: '2024',
    month: 'august',
    siteId: 'BGR001',
    cluster: 'BIRNIN-GWARI',
    state: 'KADUNA'
}
const cacheKey = JSON.stringify(constructedValue, Object.keys(constructedValue).sort());

console.log(cacheKey);