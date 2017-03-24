if (process.env.NODE_ENV !== 'production') {
    const config = require('./src/config')
    const fs = require('fs')

    if (fs.existsSync('.env')) {

        const dotenv = require('dotenv');
        const vars = dotenv.parse(fs.readFileSync('.env'));
        const result = config.validate(vars);
        if (!result.ok) {
            result.errors.forEach(e => {
                console.error(e);
            });
            console.log('\n');
        }

    } else {
        const text = Object.keys(config.keys).map(key => {
            return `${key}=${config.keys[key]}`;
        }).join('\n');

        fs.writeFileSync('.env', text);
        console.log('Almost ready... Next step: Please update the settings in \'.env\'!\n');
    }
}