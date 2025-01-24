"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const moment_1 = __importDefault(require("moment"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
      body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a; /* bg-gray-900 */
        color: #e5e7eb; /* text-gray-200 */
        font-family: 'Nunito', sans-serif;
      }
      .container {
        text-align: center;
      }
      .container h1 {
        font-weight: bold;
      }
    </style>
    <div class="container">
      <h1>Server is Running Smoothly</h1>
      <p>${(0, moment_1.default)(new Date()).format(' Do MMMM YYYY, h:mm:ss a')}</p>
</p>
    </div>
  `);
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
