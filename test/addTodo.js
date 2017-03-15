'use strict';

var assert = require('assert');
var expect = require('expect');
var redux = require('redux');

// Reducer that handles changes on individual todo
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id, text: action.text, completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, { completed: !state.completed });
        default:
            return state;
    }
};

// Reducer that handles changes on all todos
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo({}, action)
            ];
            break;
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

// Reducer for filtering
const visibilityFiltrer = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const testAddTodo = () => {
    const todoBefore = []

    const action = {
        id: 0,
        type: 'ADD_TODO',
        text: 'Learn Redux'
    }

    const stateAfter = [{ id: 0, text: 'Learn Redux', completed: false }]

    Object.freeze(todoBefore);
    Object.freeze(action);

    expect(todos(todoBefore, action)).toEqual(stateAfter);
};

const testAddTodo2 = () => {
    const stateBefore = [
        { id: 0, text: 'Learn Redux', completed: false },
        { id: 1, text: 'Go shopping', completed: false }
    ];

    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }

    const stateAfter = [
        { id: 0, text: 'Learn Redux', completed: false },
        { id: 1, text: 'Go shopping', completed: true }
    ];

    Object.freeze(stateBefore);
    Object.freeze(stateAfter);
    Object.freeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
    const stateBefore = 'SHOW_ALL';

    const action = {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED'
    }

    const stateAfter = 'SHOW_COMPLETED';

    Object.freeze(stateBefore);
    Object.freeze(stateAfter);
    Object.freeze(action);

    expect(visibilityFiltrer(stateBefore, action)).toEqual(stateAfter);
};

const testStore = () => {
    const reducers = redux.combineReducers({ todos: todos, todo: todo});

    const store = redux.createStore({}, reducers);

    console.log(store);
};

testStore();

describe('Set filter', () => {
    it('Sets filter', testVisibilityFilter);
});

describe('Add todo', () => {
    it('Toggle todo', testAddTodo);
});

describe('Add todo2', () => {
    it('Toggle todo', testAddTodo2);
});