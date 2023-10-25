import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';

export async function requestChallengeController(req: any, res: any, prisma: PrismaClient) {
    try {
        const username = req.body.username;
        const challenge = uuidv4();
        console.log(`Challenge generated for ${username}: ${challenge}`);
        
        console.log(await prisma.challenges.create({
            data: {
                challenge: challenge,
                username: username
            }
        }));
        
        console.log(`Challenge stored for ${username}: ${challenge}`);
        res.json({ challenge });
    } catch (error) {
        console.error('Error in requestChallengeController:', error);
        res.status(500).json({ error: 'Failed to request challenge.' });
    }
}
