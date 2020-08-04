module.exports = {
    users: {
        login: {
            uname: {
                required: true,
                type: 'text',
                message: 'Invalid username'
            },
            pass: {
                required: true,
                message: 'Password cannot be empty'
            }
        }
    }
};