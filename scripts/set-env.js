const fs = require('fs');
const { writeFileSync, mkdirSync } = fs;

require('dotenv').config();

const targetPath = './src/environments/environment.production.ts'

const envFileContent = `
export const environment = {
    firebaseConfig: {
        projectId: "${process.env.FIREBASE_PROJECTID}", 
        appId: "${process.env.FIREBASE_APPID}",
        storageBucket: "${process.env.FIREBASE_STORAGEBUCKET}",
        apiKey: "${process.env.FIREBASE_APIKEY}",
        authDomain: "${process.env.FIREBASE_AUTHDOMAIN}", 
        messagingSenderId: "${process.env.FIREBASE_MESSAGINGSENDERID}",
    }
    
}
`;

mkdirSync('./src/environments', {recursive: true});

writeFileSync( targetPath, envFileContent );