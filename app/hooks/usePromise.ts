import { useReducer } from "react";

export interface UsePromiseParams<T extends any[], P> {
  promiseFunction: (...args: T) => Promise<P>;
}

export enum PromiseStatus {
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  INITIAL = "INITIAL",
}

export interface PromiseAction<P> {
  type: PromiseStatus;
  payload?: P | null;
}

export interface PromiseState<P> {
  value?: P | null;
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
  initial: boolean;
  reason: any;
}

const promiseReducer = <P>(
  state: PromiseState<P>,
  action: PromiseAction<P>
) => {
  const { type, payload } = action;
  switch (type) {
    case PromiseStatus.PENDING:
      return {
        ...state,
        rejected: false,
        pending: true,
        fulfilled: false,
        initial: false,
      };
    case PromiseStatus.FULFILLED:
      return {
        ...state,
        rejected: false,
        pending: false,
        fulfilled: true,
        initial: false,
        value: payload,
      };
    case PromiseStatus.REJECTED:
      return {
        ...state,
        pending: false,
        fulfilled: false,
        rejected: true,
        initial: false,
        reason: payload,
      };
    case PromiseStatus.INITIAL:
      return {
        pending: false,
        rejected: false,
        fulfilled: false,
        initial: true,
        reason: null,
        value: null,
      };
    default:
      return state;
  }
};

export interface UsePromiseValue<T extends any[], P = any> {
  call: (...args: T) => void;
  reset: () => void;
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
  initial: boolean;
  value?: P | null;
  reason: any;
}

export const usePromise = <T extends any[], P = any>({
  promiseFunction,
}: UsePromiseParams<T, P>) => {
  const [promiseState, dispatch] = useReducer(promiseReducer<P>, {
    pending: false,
    rejected: false,
    fulfilled: false,
    initial: true,
    reason: null,
    value: null,
  });

  const call = async (...params: T) => {
    dispatch({
      type: PromiseStatus.PENDING,
    });
    promiseFunction(...params).then(
      (result) => {
        dispatch({
          type: PromiseStatus.FULFILLED,
          payload: result,
        });
        return result;
      },
      (error) => {
        dispatch({
          type: PromiseStatus.REJECTED,
          payload: error,
        });
        throw error;
      }
    );
  };

  const reset = () => {
    dispatch({ type: PromiseStatus.INITIAL });
  };

  return {
    ...promiseState,
    call,
    reset,
  };
};
