const express = require('express');
const { error, rules, logger } = require('./middlewares');
const { healthRoute, todoRoute } = require('./routes');

const App = express();

const Routes = () => {
    App.get('/', ( req, res ) => {
        res.status(200).json({
            message: "Home Page"
        })
    })
    
    App.use('/health', healthRoute);
    App.use('/todo', todoRoute);

    App.get('*', ( req , res ) => {
        res.status(404).json({
            message: "Page not found!"
        })
    })    
}

App.use(express.urlencoded({extended: true}));
App.use(express.json());

App.use(logger);
App.use(rules);

Routes();

App.use(error);

const port = 3001;

App.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});