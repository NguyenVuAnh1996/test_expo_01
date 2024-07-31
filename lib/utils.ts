export const getFileTypeFromUri = (input: string): string => {
  return input.substring(input.lastIndexOf("."));
}