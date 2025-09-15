import { readFileSync } from "fs";
import path from "path";

const schemaPath = path.join(__dirname, "schema.graphql");
const typeDefs = readFileSync(schemaPath, "utf8");

export default typeDefs;
