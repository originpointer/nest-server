const mongoDBConfig = {
  useFactory: () => {
    return {
      uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
    };
  },
};
export { mongoDBConfig };
