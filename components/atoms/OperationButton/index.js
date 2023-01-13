/* eslint-disable import/no-cycle */
import { ACTIONS } from '../../../pages';

export default function OperationButton({ dispatch, operation }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>{operation}</button>
  );
}
