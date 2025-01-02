import { validateSync, ValidationError } from 'class-validator';

export class BaseDto {
  constructor(values: Record<any, any>) {
    Object.assign(this, values);
  }

  validate(): [boolean, ValidationError[]] {
    const errors = validateSync(this);

    if (errors.length > 0) {
      return [false, errors];
    }

    return [true, []];
  }
}
