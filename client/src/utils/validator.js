import {isEmpty} from 'lodash';

export const VALIDATOR_TYPES = {
    EMAIL: 'EMAIL',
    PHONE: 'PHONE',
    PASSWORD: 'PASSWORD'
};

export const isPatternValid = (exp, type) => {
    const validate = pattern => {
        const regExp = new RegExp(pattern);
        return !isEmpty(exp) && !isEmpty(exp.trim()) && regExp.test(exp);
    };

    const defaultValidate = exp => {
        return !isEmpty(exp) && !isEmpty(exp.trim());
    };

    switch (type) {
        case VALIDATOR_TYPES.EMAIL: {
            return validate(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        }
        case VALIDATOR_TYPES.PHONE: {
            return validate(/^[^a-zA-Z]*$/); // TODO: validate number length
        }
        // case VALIDATOR_TYPES.PASSWORD: { TODO: find regex for password
        //     return validate()
        // }
        default: {
            return defaultValidate();
        }
    }
};
