import { PrismaClient } from '@prisma/client';

export async function credentialUsernameController(req: any, res: any, prisma: PrismaClient) {
    try {
        const { username } = req.params;
        
        const user = await prisma.users.findUnique({
            where: { username: username }
        });
        
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const credentialIds = [user.credential_id];
        const walletAddress = user.wallet_address;

        res.json({ credentialIds, walletAddress });
    } catch (error: any) {
        res.status(403).json({ error: 'Failed to fetch credentials. ' + error.message });
    }
}
