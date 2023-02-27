import { nanoid } from 'nanoid';
const generateUsername = (): string => {
  const namePrefix = '用户';
  const randomName = nanoid(10);
  return `${namePrefix}${randomName}`;
};

export default generateUsername;
