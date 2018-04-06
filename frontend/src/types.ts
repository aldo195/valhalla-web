import {Dispatch} from 'redux';

export interface ConnectedReduxProps<S> {
  dispatch: Dispatch<S>;
}
