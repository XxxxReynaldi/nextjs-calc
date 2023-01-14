/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */

// import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useReducer, useState, useEffect } from 'react';

import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import DigitButton from '../../components/atoms/DigitButton';
import OperationButton from '../../components/atoms/OperationButton';
import SideBar from '../../components/organisms/Sidebar';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      // if (payload.digit === '.' && state.currentOperand == null) {
      //   return state;
      // }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};
    // return {
    //   ...state,
    //   // currentOperand: '0',
    //   currentOperand: null,
    //   previousOperand: null,
    //   operation: null,
    // };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return null;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return '';

  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '÷':
      computation = prev / curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    default:
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

export default function Home() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <>
      <SideBar activeMenu='home' />
      <div className='calculator-grid'>
        <div className='output'>
          <div className='previous-operand'>
            {formatOperand(previousOperand)} {operation}
            {/* {previousOperand} {operation} */}
          </div>
          <div className='current-operand'>{formatOperand(currentOperand)}</div>
        </div>
        <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation='÷' dispatch={dispatch} className='span-two' />
        <DigitButton digit='1' dispatch={dispatch} />
        <DigitButton digit='2' dispatch={dispatch} />
        <DigitButton digit='3' dispatch={dispatch} />
        <OperationButton operation='*' dispatch={dispatch} />
        <DigitButton digit='4' dispatch={dispatch} />
        <DigitButton digit='5' dispatch={dispatch} />
        <DigitButton digit='6' dispatch={dispatch} />
        <OperationButton operation='+' dispatch={dispatch} />
        <DigitButton digit='7' dispatch={dispatch} />
        <DigitButton digit='8' dispatch={dispatch} />
        <DigitButton digit='9' dispatch={dispatch} />
        <OperationButton operation='-' dispatch={dispatch} />
        <DigitButton digit='.' dispatch={dispatch} />
        <DigitButton digit='0' dispatch={dispatch} />
        <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
          =
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      // user: userFromPayload,
    },
  };
}
