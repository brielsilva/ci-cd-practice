
import {Model,DataTypes} from 'sequelize';

class Movie extends Model {
    static init(sequelize){
       super.init({
           name: DataTypes.STRING
       },{
           sequelize
       })
    }
}


export default Movie
