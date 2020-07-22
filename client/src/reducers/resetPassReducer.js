import { resetPassActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null };
const defaultState = { isResetPassLoading: false };

const resetPassBeginLoading = state => ({ ...state, isResetPassLoading: true });
const resetPassEndLoading = state => ({ ...state, isResetPassLoading: false });

export default function resetPass(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case resetPassActionTypes.RESET_PASS_BEGIN_LOADING:
            return resetPassBeginLoading(state);
        case resetPassActionTypes.RESET_PASS_END_LOADING:
            return resetPassEndLoading(state);
        default:
            return state;
    }
};