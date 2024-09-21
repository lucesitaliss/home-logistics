"use server";
import { auth } from "../../auth";

export async function googleSessionAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("There are problems with user authentication");
  }
  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error("Could not obtain accessToken.");
  }
  return { session, accessToken };
}
