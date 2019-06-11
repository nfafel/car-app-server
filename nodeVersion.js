const express = require('express');
const app = express();

const PORT = 3000;

app.get('/version', (req, res, next) => {
    res.send(process.version + "\n");
})

app.listen(PORT, () => {
    //console.log(`Listening on port ${PORT}`);
});
