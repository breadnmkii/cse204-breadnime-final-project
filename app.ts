import express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static('public'));
app.use(express.static('views'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "views/anime.html"));
// })

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})
