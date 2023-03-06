import config from '../config/config.js';
import Sequelize from 'sequelize';
import Movie from '../models/Movies'
import Users from '../models/Users';

const connection = new Sequelize(config);

const models = [Users,Movie]; 
Movie.init(connection)
Users.init(connection); 

models.forEach(model => model.init(connection))
export default connection
