import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessage } from '../messages';

export const checkHash = async (data: string, encrypted: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(data, encrypted);
  } catch (error) {
    throw new HttpException(ErrorMessage.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
