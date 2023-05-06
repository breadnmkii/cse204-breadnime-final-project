"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ES6 imports
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const extensions_1 = require("@consumet/extensions");
const API_ENDPOINT = new extensions_1.ANIME.Gogoanime();
const results = API_ENDPOINT.search("One Piece").then(data => {
    // print results
    console.log(data);
});
// App setup
const app = (0, express_1.default)();
const port = 3000;
const filestore = (0, session_file_store_1.default)(express_session_1.default);
// Session setup
app.use((0, express_session_1.default)({
    name: 'session-id',
    secret: 'kXp2r5u8x/A?D(G+',
    saveUninitialized: false,
    resave: false,
    store: new filestore()
}));
// Note: session declarations in node_modules/@types/express-session/index.d.ts:222
app.get('/session.html', (req, res) => {
    console.log(req.session);
    if (!req.session.user) {
        console.log("no user");
        req.session.user = "your new name!";
    }
    console.log(req.session.user);
    res.send(req.session.user);
});
// Middlewares
app.use(express_1.default.static('public'));
app.use(express_1.default.static('views'));
// Listen for connections
app.listen(port, () => {
    console.log("Server listening on port 3000");
});