const {userRoutes} = require('./userRoute');

exports.routeLoader = (app) => {
    userRoutes(app);
}