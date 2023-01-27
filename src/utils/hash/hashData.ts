import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessage } from '../messages';

export const hashData = async (data: string): Promise<string> => {
  try {
    return await bcrypt.hash(data, 10);
  } catch (error) {
    throw new HttpException(ErrorMessage.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
