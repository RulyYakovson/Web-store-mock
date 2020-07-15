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

    const defaultValidate = () => {
        return !isEmpty(exp) && !isEmpty(exp.trim());
    };

    switch (type) {
        case VALIDATOR_TYPES.EMAIL: {
            return validate(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        }
        case VALIDATOR_TYPES.PHONE: {
            return validate(/^[^a-zA-Z]*$/);
        }
        case VALIDATOR_TYPES.PASSWORD: {
            return defaultValidate() && exp.length > 3 && exp.length < 9;
        }
        default: {
            return defaultValidate();
        }
    }
};
