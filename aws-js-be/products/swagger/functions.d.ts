import { CustomServerless, ServerlessFunction } from '../models/serverless-plugin.models';
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
declare const _default: (serverless: CustomServerless) => PartialRecord<'swaggerUI' | 'swaggerJSON' | 'swaggerRedirectURI', ServerlessFunction>;
export default _default;
