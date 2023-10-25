import { PrismaClient } from "@prisma/client";
import { server } from "@passwordless-id/webauthn";
import { generateWalletAddress } from "../server.js";

export async function userIntent(req: any, res: any, prisma: PrismaClient){
    const userIntention = req.body.userIntent;
    console.log("User intention:", userIntention);

    if(userIntention == 'register')
    {
        try {
            const registration = req.body.payload.registration;
            const origin = req.body.payload.origin;
            console.log("Registration:", registration);
        
            const challengeResult = await prisma.challenges.findFirst({
              where: { username: registration.username },
            });
        
            if (!challengeResult) {
              throw new Error("Invalid challenge");
            }
        
            const expected = {
              challenge: String(challengeResult.challenge),
              origin: origin,
            };
        
            console.log("Expected:", expected);
            const registrationParsed = await server.verifyRegistration(
              registration,
              expected
            );
            console.log("Registration parsed:", registrationParsed);
        
            const walletAddr = generateWalletAddress();
            console.log("Wallet address:", walletAddr.address);
        
            await prisma.users.create({
              data: {
                username: registration.username,
                credential_id: registrationParsed.credential.id,
                public_key: registrationParsed.credential.publicKey,
                algorithm: registrationParsed.credential.algorithm,
                wallet_address: walletAddr.address,
              },
            });
        
            console.log(
              `Registration and wallet address stored for ${registration.username}: ${registrationParsed.credential.id}`
            );
            const responseObject = {
              success: true,
              username: registrationParsed.username,
              credentialId: registrationParsed.credential.id,
              publicKey: registrationParsed.credential.publicKey,
            }
            console.log(responseObject)
            res.json(responseObject);
            } catch (error: any) {
            res.status(403).json({ error: "Failed to register. " + error.message });
            }
    }

    else if (userIntention == 'login')
    {
        try {
            // const { challenge, authentication, origin } = req.body;
            const challenge = req.body.challenge;
            const authentication = req.body.authentication;
            const origin = req.body.origin;
        
            // Corrected from authentication.credential_id to authentication.credentialId
            const userRecord = await prisma.users.findUnique({
              where: { credential_id: authentication.credentialId },
            });
        
            if (!userRecord) {
              throw new Error("Invalid credential ID");
            }
        
            const expected = {
              challenge: challenge,
              origin: origin,
              userVerified: true,
              counter: -1,
            };
        
            const credentialKey: any = {
              id: userRecord.credential_id,
              publicKey: userRecord.public_key,
              algorithm: userRecord.algorithm,
            } as const;
        
            const authenticationParsed = await server.verifyAuthentication(
              authentication,
              credentialKey,
              expected
            );
        
            // Corrected from authentication.credentialId to userRecord.credential_id
            console.log(
              `Authentication verified for ${userRecord.username}: ${userRecord.credential_id}`
            );
            res.json({ success: true });
          } catch (error: any) {
            console.log(error);
            res.status(403).json({ error: "Failed to authenticate. " + error.message });
          }
    }
}
