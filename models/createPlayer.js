
const connection = require('./connection')



class createPlayer {

    create (firstName, lastName, username,email,birthdate,password,confirmPassword) {
       const check =  this.check(firstName, lastName, username,email,birthdate,password,confirmPassword)
       if (check === true) {
           connection.query('INSERT INTO player SET firstName=?, lastName=?, username=?, email=?, birthdate=?, password=?', [firstName, lastName, username, email, birthdate, password], (error,resultat) => {
               if (error)  throw error
      
           } )
           return true;
       }else if(check) {
           const message = check;
           return message;
       }

    }


    check(firstName, lastName, username,email,birthdate,password,confirmPassword){
    const verificationPassword = password.length >= 8 && password === confirmPassword ? true : false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const verificationEmail = email.match(regexEmail) ?  true : false;  
     
    if ((verificationEmail && verificationPassword) === true){
        return true
    }else {
        return {email: verificationEmail, password: verificationPassword}
    }

    }

   
}

module.exports = createPlayer;