import { v4 as uuid } from 'uuid';
const generateUsername = (): string => {
  const namePrefix = '用户';
  const randomName = Math.random().toString(36).slice(3, 9);
  return `${namePrefix}${randomName}`;
};

const generateRandomFilename = (): string => {
  const filename = uuid();
  return filename
}

export {
  generateUsername,
  generateRandomFilename
}
