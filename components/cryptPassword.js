const bcrypt = require('bcrypt');
// создаем соль
const salt = bcrypt.genSaltSync(10);

// шифруем пароль
module.exports = passwordToSave = bcrypt.hashSync('sd', salt);

