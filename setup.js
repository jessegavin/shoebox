if (process.env.NODE_ENV !== 'production') {
    const config = require('./config');
    const fs = require('fs');
    const chalk = require('chalk');

    if (fs.existsSync('.env')) {

        const dotenv = require('dotenv');
        const vars = dotenv.parse(fs.readFileSync('.env'));
        const result = config.validate(vars);
        if (!result.ok) {
            result.errors.forEach(e => {
                console.log(chalk.red(e));
            });
            console.log('\n');
        }

    } else {
        const text = Object.keys(config.keys).map(key => {
            return `${key}=${config.keys[key]}`;
        }).join('\n');

        fs.writeFileSync('.env', text);
        console.log(chalk.green('Please update the settings in \'.env\'!\n'));
    }
}