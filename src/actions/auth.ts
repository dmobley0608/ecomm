"use server"


import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import type { User, Session } from "@prisma/client";
import prisma from "@/lib/prisma";
import { cache } from "react";
import bcrypt from "bcryptjs";

export async function generateSessionToken(): Promise<string> {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await prisma.session.create({
		data: session
	});
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await prisma.session.findUnique({
		where: {
			id: sessionId
		},
		include: {
			user: true
		}
	});
	if (result === null) {
		return { session: null, user: null };
	}
	const { user, ...session } = result;
	if (Date.now() >= session.expiresAt.getTime()) {
		await prisma.session.delete({ where: { id: sessionId } });
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await prisma.session.update({
			where: {
				id: session.id
			},
			data: {
				expiresAt: session.expiresAt
			}
		});
	}
	const safeUser = {...user, passwordHash:undefined};
	return { session, user:safeUser };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateAllSessions(userId: string): Promise<void> {
	await prisma.session.deleteMany({
		where: {
			userId: userId
		}
	});
}

export type SessionValidationResult =
	| { session: Session; user: Omit<User, "passwordHash"> }
	| { session: null; user: null };

// COOKIES
export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		path: "/"
	});
}

export async function deleteSessionTokenCookie(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0,
		path: "/"
	});
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
	const cookieStore = await cookies();
	const token = cookieStore.get("session")?.value ?? null;
	if (token === null) {
		return { session: null, user: null };
	}
	const result = await validateSessionToken(token);
	return result;
});

//User Registration

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> =>  {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
};

export const registerUser = async (email: string, name:string, password: string) =>  {
    const hashedPassword = await hashPassword(password);
    ;
    try{
        const user = await prisma.user.create({
            data: {
                email,
                name,
                passwordHash: hashedPassword
            }
        });
		const safeUser = {...user, passwordHash:undefined};
        return {user:safeUser, error:null};
    }catch(e){
		console.log(e)
        return {
            user:null,
            error: "Failed to register user"
        }
    }
}

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(user === null){
        return {
            user: null,
            error: "Invalid Credentials"
        }
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if(!isValid){
        return {
            user: null,
            error: "Invalid Credentials"
        }
    }
    const safeUser = {...user, passwordHash:undefined};
    const token = await generateSessionToken();
    const session = await createSession(token, user.id);
    await setSessionTokenCookie(token, session.expiresAt);
    return {user:safeUser, error:null};
}

export const logoutUser = async () => {
    const currentSession = await getCurrentSession();
    if(currentSession.session?.id){
        await invalidateSession(currentSession.session.id);
    }
    await deleteSessionTokenCookie();
}


