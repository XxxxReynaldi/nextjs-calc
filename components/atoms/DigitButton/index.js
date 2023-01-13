/* eslint-disable import/no-cycle */
import { ACTIONS } from '../../../pages';

export default function DigitButton({ dispatch, digit }) {
  return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>;
}
