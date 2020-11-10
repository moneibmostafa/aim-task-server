
module.exports = function logError(err, req, res, next) {
    console.log(err.message, err);

    return res.status(500).send({ message: err.message });
};
