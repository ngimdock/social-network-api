import { NotFoundException } from '@nestjs/common';

export class UserNotFoudException extends NotFoundException {
  constructor() {
    super('User not found.');
  }
}
