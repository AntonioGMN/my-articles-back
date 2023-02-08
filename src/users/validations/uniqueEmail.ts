import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}

  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userEmailIsNotUnique = await this.userService.findOne(email);
    return !userEmailIsNotUnique;
  }
}

// ...

export const EmailIsUnique = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [UsersService],
      validator: UniqueEmail,
    });
  };
};
