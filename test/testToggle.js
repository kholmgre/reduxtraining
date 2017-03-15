'use strict';

var assert = require('assert');
var expect = require('expect');

const toggleTodo = (todo) => {
    return Object.assign({}, todo, { completed: !todo.completed });
};

const testToggleTodo = () =>{
    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    }

    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    }

    Object.freeze(todoBefore);

    expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

describe('Toggle todo', () => {
  it('Toggle todo', testToggleTodo);
})