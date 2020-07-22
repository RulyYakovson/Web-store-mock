import {isEmpty} from "lodash";
import {MANDATORY_TITLE} from "./constants";
import {isPatternValid, VALIDATOR_TYPES} from "./validator";

const getErrorMessage = (inputType, input) => {
    switch (inputType) {
        case VALIDATOR_TYPES.EMAIL:
        case VALIDATOR_TYPES.PHONE:
            return `"${input}" is not a valid ${inputType}`;
        case VALIDATOR_TYPES.PASSWORD:
            return 'Password must be between 4 to 8 characters';
        case VALIDATOR_TYPES.CONFIRM_PASSWORD:
            return 'Passwords do not match';
        default:
            return '';
    }
};

const handlePasswordsMatchMessage = (pass, confirm, setConfirmPasswordErrorMessage) => {
    if (isEmpty(pass) || isEmpty(confirm)) {
        setConfirmPasswordErrorMessage(null);
    } else if (pass !== confirm) {
        setConfirmPasswordErrorMessage('Passwords do not match');
    } else {
        setConfirmPasswordErrorMessage(null);
    }
};

const onInputChange = (inputType, input, setInput, setInputErrorMessage) => {
    setInput(input);
    if (isEmpty(input)) {
        setInputErrorMessage(MANDATORY_TITLE);
    } else if (!isPatternValid(input, inputType)) {
        setInputErrorMessage(getErrorMessage(inputType, input));
    } else {
        setInputErrorMessage(null);
    }
};

export const onPasswordChange = (pass, confirmPass, setPass, setPassErrorMessage, setConfirmPasswordErrorMessage) => {
    handlePasswordsMatchMessage(pass, confirmPass, setConfirmPasswordErrorMessage);
    onInputChange(VALIDATOR_TYPES.PASSWORD, pass, setPass, setPassErrorMessage);
};

export const onConfirmPasswordChange = (confirmPass, pass, setConfirmPass, setConfirmPasswordErrorMessage) => {
    setConfirmPass(confirmPass);
    handlePasswordsMatchMessage(pass, confirmPass, setConfirmPasswordErrorMessage);
    if (isEmpty(confirmPass)) {
        setConfirmPass(MANDATORY_TITLE);
    }
};

export const onEmailChange = (email, setEmail, setEmailErrorMessage) =>
    onInputChange(VALIDATOR_TYPES.EMAIL, email, setEmail, setEmailErrorMessage);

export const onPhoneChange = (phone, setPhone, setPhoneErrorMessage) =>
    onInputChange(VALIDATOR_TYPES.PHONE, phone, setPhone, setPhoneErrorMessage);
