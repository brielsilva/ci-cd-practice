import {Model,DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'

class Users extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password:{
                type: DataTypes.STRING,
                allowNull:false
            }
        },{
            sequelize
        })
        this.addHook('beforeCreate',(user) =>{
            user.set('password',bcrypt.hashSync(user.password,10))
        })
    }

    static verifyPassword(password,password_hash){
        return bcrypt.compareSync(password,password_hash);
    }
    
    

}

export default Users