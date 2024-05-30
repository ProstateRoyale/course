const bcrypt = require('bcryptjs');

const password = 'qwerty';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log(hashedPassword);
