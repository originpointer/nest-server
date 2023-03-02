import { MongooseModuleOptions } from '@nestjs/mongoose';

const mongoDBConfig = {
  useFactory: (): MongooseModuleOptions => {
    return {
      uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/speaker?authSource=admin&directConnection=true`,
    };
  },
};
export { mongoDBConfig };
