import httpStatus from 'http-status'

const defaultResponse = (data,statusCode = httpStatus.OK) => ({
    data,
    statusCode
})

const errorResponse = (message,statusCode = httpStatus.BAD_REQUEST) => defaultResponse({
    error: message
},statusCode)
        // Fazendo o teste passar enquanto isolado

class MovieController{
    constructor(Movie){
        this.Movie = Movie;
    }

    getAll(){    
       return this.Movie.findAll({}).then(data => defaultResponse(data)).catch(err => errorResponse(err.message));
    }

    getById(params){
        return this.Movie.findOne({where: params}).then(data => defaultResponse(data)).catch(err => errorResponse(err.message));
    }

    create(body){
        return this.Movie.create(body).then(data => defaultResponse(data,httpStatus.CREATED)).catch(err => errorResponse(err.message,httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(body,params){
        return this.Movie.update(body,{where: params}).then(data => defaultResponse(data,httpStatus.CREATED)).catch(err => errorResponse(err.message,httpStatus.UNPROCESSABLE_ENTITY));
    }
    delete(params){
        return this.Movie.destroy({where: params}).then(data => defaultResponse(data,httpStatus.NO_CONTENT)).catch(err => errorResponse(err.message,httpStatus.UNPROCESSABLE_ENTITY));
    }
}

export default MovieController

// OR
/* module.exports = {
    getAll(req,res){

    }
}*/
