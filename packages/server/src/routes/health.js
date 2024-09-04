const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: "OK"
    });
})

module.exports.healthRoute = router;