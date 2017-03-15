'use strict';

var assert = require('assert');
var expect = require('expect');

const addCounter = (list) => {
  return [...list, 0];
};

const removeCounter = (list, index) => {
  // spread används för att lägga till en array mitt i en array 
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  let result = removeCounter(listBefore, 1);

  expect(result).toEqual(listAfter);
};

const incrementCounter = (list, index1) => {
  return list.map((el, index) => {
    if (index === index1) {
      return el + 1;
    } else {
      return el;
    }
  });;
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  Object.freeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

describe('Increment counter', () => {
  it('Should increment counter', testIncrementCounter);
})

describe('Remove counter', () => {
  it('Should remove counter', testRemoveCounter);
})

describe('#indexOf()', function () {
  it('should return -1 when the value is not present', function () {
    const listBefore = [];
    const listAfter = [0];

    Object.freeze(listBefore);
    const second = addCounter(listBefore);
    const third = addCounter(second);

    expect(addCounter(listBefore)).toEqual(listAfter);
  });
});
