import config from '../config/config.js';
import Sequelize from 'sequelize';
import Movies from '../models/Movies'

const connection = new Sequelize(config);

const models = [Movies];

models.forEach(model => model.init(connection))
