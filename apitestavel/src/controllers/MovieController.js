const defaultResponse = (data,statusCode = 200) => ({
    data,
    statusCode
})

const errorResponse = (message,statusCode = 400) => defaultResponse({
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
        return this.Movie.create(body).then(data => defaultResponse(data,201)).catch(err => errorResponse(err.message,422));
    }

    update(body,params){
        return this.Movie.update(body,{where: params}).then(data => defaultResponse(data,201)).catch(err => errorResponse(err.message,422));
    }
    delete(params){
        return this.Movie.destroy({where: params}).then(data => defaultResponse(data,204)).catch(err => errorResponse(err.message,422));
    }
}

export default MovieController

// OR
/* module.exports = {
    getAll(req,res){

    }
}*/
