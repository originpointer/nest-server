const generateUsername = (): string => {
  const namePrefix = '用户';
  const randomName = Math.random().toString(36).slice(3, 9);
  return `${namePrefix}${randomName}`;
};

export default generateUsername;
