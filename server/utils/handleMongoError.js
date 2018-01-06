

module.exports = (error) => {
    if (error.code === 11000) {
        return error;
    };
}