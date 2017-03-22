const isEmpty = require('lodash/isEmpty');

const keys = {
    AWS_ACCESS_KEY_ID: '<YOUR_AWS_ACCESS_KEY_ID>',
    AWS_SECRET_ACCESS_KEY: '<YOUR_AWS_SECRET_ACCESS_KEY>',
    S3_BUCKET_NAME: '<YOUR_S3_BUCKET_NAME>'
};

const validate = vars => {
    const errors = [];

    Object.keys(keys).forEach(key => {
        let value = vars[key];
        if (isEmpty(value)) {
            errors.push(`Environment variable ${key} is empty`);
        } else if (value === keys[key]) {
            errors.push(`Environment variable ${key} is using default value '${value}'`);
        } 
    });

    return {
        ok: errors.length === 0,
        errors: errors
    };
};

module.exports = {
    keys: keys,
    load: function() {
        require('dotenv').load();
        let result = validate(process.env);
    },
    validate: validate
}
