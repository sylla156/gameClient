
const connection = require('../connection')



class createTeam {

   static create (topic, description,topicType,playerID) {
           connection.query('INSERT INTO createForum SET topic=?,description=?, topicType=?, playerID=?', [topic, description,topicType,playerID], (error,resultat) => {
               if (error)  throw error
      
           } )
           return true;

    }
   
}

module.exports = createTeam;