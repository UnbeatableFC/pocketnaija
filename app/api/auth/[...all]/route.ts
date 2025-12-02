import { auth } from "@/lib/auth"; // import from step 3
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);