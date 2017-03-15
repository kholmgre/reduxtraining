import { Pipeline } from './FilterPipeline';

export const getVisibleTodos = (state: Array<any>, filters: Array<any>) => {
    return Pipeline.OR(state, filters);
}

export const mapStateToProps = (state: any) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

