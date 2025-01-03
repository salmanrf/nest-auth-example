import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ErrorDetailsDto } from '@/common/dtos/errors';

export function formatValidationErrorDetails(
  errors: ValidationError[],
  path = '',
): ErrorDetailsDto[] {
  if (!(errors instanceof Array)) {
    return [];
  }

  const [head, ...tail] = errors;

  if (!head) {
    return [];
  }

  const { property, constraints, children } = head;

  const location = path + property;
  const formatted = [];

  if (constraints) {
    const errorMessages = Object.values(constraints);
    const details = {
      location,
      messages: errorMessages,
    };

    formatted.push(details);
  }

  if (children instanceof Array) {
    formatted.push(...formatValidationErrorDetails(children, location + '.'));
  }

  if (tail instanceof Array) {
    formatted.push(...formatValidationErrorDetails(tail));
  }

  return formatted;
}

export function formatValidationErrors(errors: ValidationError[]) {
  const formatted = formatValidationErrorDetails(errors);

  return new BadRequestException(formatted);
}
