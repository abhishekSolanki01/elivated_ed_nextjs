import { label } from "next-api-middleware";
import authMw from "./auth";
import userAuthMw from "./userAuth";

const withMiddleware = label (
{ authMw, userAuthMw },
[]
)

export default withMiddleware;
