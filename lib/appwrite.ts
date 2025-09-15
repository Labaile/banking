"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = (await cookies()).get("appwrite-session");

  console.log('Session cookie:', session);

  if (!session || !session.value) {
    console.log('No session found in cookies');
    throw new Error("No session");
  }

  try {
    const sessionData = JSON.parse(session.value);
    console.log('Parsed session data:', sessionData);
    client.setSession(sessionData.secret);
    console.log('Session set on client');
  } catch (parseError) {
    console.error('Error parsing session data:', parseError);
    throw new Error("Invalid session data");
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    }
  };
}

