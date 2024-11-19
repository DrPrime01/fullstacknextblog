import { withAuth } from "next-auth/middleware";
import { authConfig } from "./config/auth.config";

export default withAuth(authConfig);
