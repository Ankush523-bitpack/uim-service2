import express from 'express';
import cors from 'cors';
import { Wallet } from 'ethers';
import { requestChallengeController } from './controllers/request-challenge.js';
import { credentialUsernameController } from './controllers/credential-username.js';
import { PrismaClient } from '@prisma/client';
import { checkDbConnection } from './controllers/checkdbconnection.js';
import { userIntent } from './controllers/userIntent.js';

const app = express();
app.use(cors());

const prisma = new PrismaClient();

export function generateWalletAddress(): { address: string, privateKey: string } {
    const wallet = Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

const port = 3000;
app.use(express.json());

app.get('/healthcheck',(req,res)=>checkDbConnection(req,res));
app.post('/request-challenge', (req,res) => requestChallengeController(req, res, prisma));
app.get('/credentials/:username', (req,res) => credentialUsernameController(req, res, prisma));
app.post('/userIntention', (req,res) => userIntent(req, res, prisma));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
