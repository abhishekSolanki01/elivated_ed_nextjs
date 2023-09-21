import { label } from "next-api-middleware";
import authMw from "./auth";

const withMiddleware = label (
{ authMw },
[]
)

export default withMiddleware;
