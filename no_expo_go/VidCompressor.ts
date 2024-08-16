import { isUsingExpoGo } from './quick_config';

export class VidCompressor {
  constructor() { }
  static async compress(uriBefore: string) {
    if (isUsingExpoGo) {
      return uriBefore;
    } else {
      const { Video } = require('react-native-compressor')
      return await Video.compress(uriBefore, {});
    }
  }
}