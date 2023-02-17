import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ErrorMessage } from '../../messages';

export const hashData = async (data: string): Promise<string> => {
  try {
    return await bcrypt.hash(data, 10);
  } catch (error: unknown) {
    throw new HttpException(ErrorMessage.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
