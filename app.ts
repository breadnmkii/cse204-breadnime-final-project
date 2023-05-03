// ES6 imports
import express from 'express'
import session from 'express-session'
import filestoreImport from 'session-file-store'

// App setup
const app = express();
const port = 3000;
const filestore = filestoreImport(session)

// Session setup
app.use(session({
    name: 'session-id',
    secret: 'kXp2r5u8x/A?D(G+',
    saveUninitialized: false,
    resave: false,
    store: new filestore()
}))

// Note: session declarations in node_modules/@types/express-session/index.d.ts:222
app.get('/session.html', (req, res) => { // TODO: implement sessions in respective pages
    console.log(req.session);
    
    if (!req.session.user) {
        console.log("no user")
        req.session.user = "your new name!";
    }
    console.log(req.session.user);
  
    res.send(req.session.user);
  })


// Middlewares
app.use(express.static('public'));
app.use(express.static('views'));

// Listen for connections
app.listen(port, () => {
    console.log("Server listening on port 3000");
})
