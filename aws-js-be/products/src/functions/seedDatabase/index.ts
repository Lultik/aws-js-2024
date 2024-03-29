import { handlerPath } from '@libs/handler-resolver';

const seedDatabase = {
  handler: `${handlerPath(__dirname)}/handler.main`,
}

export default seedDatabase;
