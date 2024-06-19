import { SchemaEvolution } from '../generated/types';
import { assertMatch } from './assertions';

function choiceTestCases(
  fallbackBefore: SchemaEvolution.Before.ExampleChoiceOut,
  fallbackAfter: SchemaEvolution.After.ExampleChoiceIn,
): [
  SchemaEvolution.Before.ExampleChoiceOut,
  SchemaEvolution.After.ExampleChoiceIn,
][] {
  return [
    [
      {
        requiredToRequired: 'required_to_required',
      },
      {
        $field: 'requiredToRequired',
        requiredToRequired: 'required_to_required',
      },
    ],
    [
      {
        requiredToAsymmetric: 'required_to_asymmetric',
      },
      {
        $field: 'requiredToAsymmetric',
        requiredToAsymmetric: 'required_to_asymmetric',
      },
    ],
    [
      {
        asymmetricToRequired: 'asymmetric_to_required',
        $fallback: fallbackBefore,
      },
      {
        $field: 'asymmetricToRequired',
        asymmetricToRequired: 'asymmetric_to_required',
      },
    ],
    [
      {
        asymmetricToAsymmetric: 'asymmetric_to_asymmetric',
        $fallback: fallbackBefore,
      },
      {
        $field: 'asymmetricToAsymmetric',
        asymmetricToAsymmetric: 'asymmetric_to_asymmetric',
      },
    ],
    [
      {
        asymmetricToOptional: 'asymmetric_to_optional',
        $fallback: fallbackBefore,
      },
      {
        $field: 'asymmetricToOptional',
        asymmetricToOptional: 'asymmetric_to_optional',
        $fallback: fallbackAfter,
      },
    ],
    [
      {
        asymmetricToNonexistent: 'asymmetric_to_nonexistent',
        $fallback: fallbackBefore,
      },
      fallbackAfter,
    ],
    [
      {
        optionalToRequired: 'optional_to_required',
        $fallback: fallbackBefore,
      },
      {
        $field: 'optionalToRequired',
        optionalToRequired: 'optional_to_required',
      },
    ],
    [
      {
        optionalToAsymmetric: 'optional_to_asymmetric',
        $fallback: fallbackBefore,
      },
      {
        $field: 'optionalToAsymmetric',
        optionalToAsymmetric: 'optional_to_asymmetric',
      },
    ],
    [
      {
        optionalToOptional: 'optional_to_optional',
        $fallback: fallbackBefore,
      },
      {
        $field: 'optionalToOptional',
        optionalToOptional: 'optional_to_optional',
        $fallback: fallbackAfter,
      },
    ],
    [
      {
        optionalToNonexistent: 'optional_to_nonexistent',
        $fallback: fallbackBefore,
      },
      fallbackAfter,
    ],
  ];
}

export default function run(): void {
  assertMatch(
    SchemaEvolution.Before.ExampleStruct.size,
    SchemaEvolution.Before.ExampleStruct.serialize,
    SchemaEvolution.After.ExampleStruct.deserialize,
    {
      requiredToRequired: 'required_to_required',
      requiredToAsymmetric: 'required_to_asymmetric',
      requiredToOptional: 'required_to_optional',
      requiredToNonexistent: 'required_to_nonexistent',
      asymmetricToRequired: 'asymmetric_to_required',
      asymmetricToAsymmetric: 'asymmetric_to_asymmetric',
      asymmetricToOptional: 'asymmetric_to_optional',
      asymmetricToNonexistent: 'asymmetric_to_nonexistent',
      optionalToRequired: 'optional_to_required',
      optionalToAsymmetric: undefined,
      optionalToOptional: undefined,
      optionalToNonexistent: undefined,
    },
    {
      requiredToRequired: 'required_to_required',
      requiredToAsymmetric: 'required_to_asymmetric',
      requiredToOptional: 'required_to_optional',
      asymmetricToRequired: 'asymmetric_to_required',
      asymmetricToAsymmetric: 'asymmetric_to_asymmetric',
      asymmetricToOptional: 'asymmetric_to_optional',
      optionalToRequired: 'optional_to_required',
      optionalToAsymmetric: undefined,
      optionalToOptional: undefined,
      nonexistentToAsymmetric: undefined,
      nonexistentToOptional: undefined,
    },
  );

  assertMatch(
    SchemaEvolution.Before.ExampleStruct.size,
    SchemaEvolution.Before.ExampleStruct.serialize,
    SchemaEvolution.After.ExampleStruct.deserialize,
    {
      requiredToRequired: 'required_to_required',
      requiredToAsymmetric: 'required_to_asymmetric',
      requiredToOptional: 'required_to_optional',
      requiredToNonexistent: 'required_to_nonexistent',
      asymmetricToRequired: 'asymmetric_to_required',
      asymmetricToAsymmetric: 'asymmetric_to_asymmetric',
      asymmetricToOptional: 'asymmetric_to_optional',
      asymmetricToNonexistent: 'asymmetric_to_nonexistent',
      optionalToRequired: 'optional_to_required',
      optionalToAsymmetric: 'optional_to_asymmetric',
      optionalToOptional: 'optional_to_optional',
      optionalToNonexistent: 'optional_to_nonexistent',
    },
    {
      requiredToRequired: 'required_to_required',
      requiredToAsymmetric: 'required_to_asymmetric',
      requiredToOptional: 'required_to_optional',
      asymmetricToRequired: 'asymmetric_to_required',
      asymmetricToAsymmetric: 'asymmetric_to_asymmetric',
      asymmetricToOptional: 'asymmetric_to_optional',
      optionalToRequired: 'optional_to_required',
      optionalToAsymmetric: 'optional_to_asymmetric',
      optionalToOptional: 'optional_to_optional',
      nonexistentToAsymmetric: undefined,
      nonexistentToOptional: undefined,
    },
  );

  // eslint-disable-next-line no-console -- Allow us to separate the test groups with a line break.
  console.log();

  const secondFallbacks = choiceTestCases(
    {
      requiredToRequired: 'required_to_required',
    },
    {
      $field: 'requiredToRequired',
      requiredToRequired: 'required_to_required',
    },
  );

  /* eslint-disable @typescript-eslint/prefer-for-of -- The Airbnb lint rules forbid this. */
  /* eslint-disable @typescript-eslint/no-magic-numbers -- Loop counter math is not too magical. */
  for (let i = 0; i < secondFallbacks.length; i += 1) {
    const firstFallbacks = choiceTestCases(...secondFallbacks[i]);

    for (let j = 0; j < firstFallbacks.length; j += 1) {
      const tests = choiceTestCases(...firstFallbacks[j]);

      for (let k = 0; k < tests.length; k += 1) {
        const [before, after] = tests[k];

        assertMatch(
          SchemaEvolution.Before.ExampleChoice.size,
          SchemaEvolution.Before.ExampleChoice.serialize,
          SchemaEvolution.After.ExampleChoice.deserialize,
          before,
          after,
        );
      }
    }
  }
  /* eslint-enable @typescript-eslint/no-magic-numbers -- Re-enable this rule. */
  /* eslint-enable @typescript-eslint/prefer-for-of -- Re-enable this rule. */

  // eslint-disable-next-line no-console -- Allow us to separate the test groups with a line break.
  console.log();

  assertMatch(
    SchemaEvolution.Types.SingletonStruct.size,
    SchemaEvolution.Types.SingletonStruct.serialize,
    SchemaEvolution.Types.SingletonChoice.deserialize,
    {
      x: 'foo',
    },
    {
      $field: 'x',
      x: 'foo',
    },
  );

  assertMatch(
    SchemaEvolution.Types.SingletonChoice.size,
    SchemaEvolution.Types.SingletonChoice.serialize,
    SchemaEvolution.Types.SingletonStruct.deserialize,
    {
      x: 'foo',
    },
    {
      x: 'foo',
    },
  );
}
