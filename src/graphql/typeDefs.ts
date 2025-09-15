import { readFileSync } from 'node:fs';
import path from 'node:path';

const schemaPath = path.join(__dirname, 'schema.graphql');
const typeDefs = readFileSync(schemaPath, 'utf8');

export default typeDefs;
