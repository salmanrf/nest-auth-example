import { BadRequestException } from '@nestjs/common';

import {
  formatValidationErrorDetails,
  formatValidationErrors,
} from '@/common/utils';

describe('Error Utils', () => {
  describe('formatValidationErrors', () => {
    it.each([
      [[], new BadRequestException([])],
      [null, new BadRequestException([])],
    ])(
      'Should return an instance of BadRequestException',
      (errors, expected) => {
        const sut = formatValidationErrors;

        const actual = sut(errors);

        expect(actual).toBeInstanceOf(BadRequestException);
        expect(actual).toStrictEqual(expected);
      },
    );
  });

  describe('formatValidationErrorDetails', () => {
    let sut: typeof formatValidationErrorDetails;

    beforeEach(() => {
      sut = formatValidationErrorDetails;
    });

    it('Should return empty array when errors is empty', () => {
      const errors = [];

      const expected = [];

      const actual = sut(errors);

      expect(actual).toStrictEqual(expected);
    });

    it.each([
      // * Test empty constraints
      {
        errors: [
          {
            property: 'a',
            constraints: null,
          },
        ],
        expected: [],
      },
      // * Test nested errors
      {
        errors: [
          {
            property: 'a',
            constraints: null,
            children: [
              {
                property: 'b',
                constraints: {
                  notNull: "b can't be null",
                },
              },
            ],
          },
        ],
        expected: [
          {
            location: 'a.b',
            messages: ["b can't be null"],
          },
        ],
      },
      // * Test multiple ValidationError items
      {
        errors: [
          {
            property: 'a',
            constraints: {
              isString: 'a must be a string',
              minLength: 'a must be a string with at least 5 characters',
            },
          },
          {
            property: 'b',
            constraints: {
              maxLength: 'b must be a string with at most 10 characters',
            },
          },
        ],
        expected: [
          {
            location: 'a',
            messages: [
              'a must be a string',
              'a must be a string with at least 5 characters',
            ],
          },
          {
            location: 'b',
            messages: ['b must be a string with at most 10 characters'],
          },
        ],
      },
    ])(
      'Should return flattened array of error details %#',
      ({ errors, expected }) => {
        const actual = sut(errors);

        expect(actual).toStrictEqual(expected);
      },
    );
  });
});
