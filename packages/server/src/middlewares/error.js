
const error = (err, req, res) => {
    console.error(err.stack);
    
    res.status(500).send(err.message);
}

module.exports.error = error;