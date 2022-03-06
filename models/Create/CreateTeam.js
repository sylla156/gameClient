
const connection = require('../connection')



class createTeam {

   static create (file, name, about,description,game,skill,playerID) {
           connection.query('INSERT INTO createTeam SET file=?, name=?, about=?, description=?, game=?, skill=?, playerID=?', [file, name, about, description, game, skill,playerID], (error,resultat) => {
               if (error)  throw error
      
           } )
           return true;

    }
   
}

module.exports = createTeam;