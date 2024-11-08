const express = require('express');

import { config } from 'dotenv';

config();

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoint to get environment variables
app.get('/api/config', (req, res) => {
    res.json({
        loginPassword: process.env.LOGIN_PASSWORD,
        locations: {
            BHELUPUR: {
                BHADAINI: process.env.BHELUPUR_BHADAINI_URL,
                BHELUPUR: process.env.BHELUPUR_BHELUPUR_URL,
                GODAULIA: process.env.BHELUPUR_GODAULIA_URL,
                SHANKULDHARA: process.env.BHELUPUR_SHANKULDHARA_URL,
            },
            CHETMANI: {
                NAGWA: process.env.CHETMANI_NAGWA_URL,
                AMRAKHEDA: process.env.CHETMANI_AMRAKHEDA_URL,
                BHU: process.env.CHETMANI_BHU_URL,
                DAFI: process.env.CHETMANI_DAFI_URL,
                KABIR_NAGAR: process.env.CHETMANI_KABIR_NAGAR_URL,
                KANDWA: process.env.CHETMANI_KANDWA_URL,
                KARUNDI: process.env.CHETMANI_KARUNDI_URL,
                RAMNAGAR: process.env.CHETMANI_RAMNAGAR_URL,
                RAMNAGAR_NEW: process.env.CHETMANI_RAMNAGAR_NEW_URL,
            }
        }
    });
});

export default app;
