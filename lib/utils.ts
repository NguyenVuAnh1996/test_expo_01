export const getFileTypeFromUri = (input: string): string => {
  return input.substring(input.lastIndexOf("."));
}

export const validateEmail = (value: string) => {
  const regex = /^([0-9a-zA-Z]([-_.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_.]*[0-9a-zA-Z]+)*)\.([a-zA-Z]{2,9})$/;
  return regex.test(String(value).toLowerCase());
};