import { isUsingExpoGo } from "./quick_config";

export default class ImageCompressor {
  constructor() { }
  static async compress(uriBefore: string) {
    if (isUsingExpoGo) {
      return uriBefore;
    } else {
      const { Image } = require('react-native-compressor')
      return await Image.compress(uriBefore, {});
    }
  }
}