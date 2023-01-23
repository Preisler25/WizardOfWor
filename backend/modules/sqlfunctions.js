const db = require('./db');
const argon = require('argon2');

async function login(incom) {
    let user = incom.username;
    let pass = incom.password;
    let result = await db.query("SELECT * FROM profiles WHERE name = ?", [user]).catch((err) => {console.log(err);})
    if (result.length === 0) {
        return false;
    }
    for(let i = 0;i<result.length;i++){
        if(await argon.verify(result[i].pwhash, pass)){
            let toassign = {'id' : result[i].id,name: result[i].name}
            session.userIds.push(toassign);
            return true;
        }else{
            return false;
        }
    }
}

async function register(incom) {
    let crypetdPassword = await argon.hash(incom.password);
    if (incom.password !== incom.password2) {
        res.redirect('/?error=Passwords do not match');
    }
    let sameNames = await db.query("SELECT * FROM profiles WHERE name = ?", [incom.username]).catch((err) => {console.log(err);});
    let sameEmails = await db.query("SELECT * FROM profiles WHERE email = ?", [incom.email]).catch((err) => {console.log(err);})
    if (sameNames.length > 0) {
        return '/?error=Username already exists';
    }
    if (sameEmails.length > 0) {
        return '/?error=Email already exists'
    }
    if(sameEmails.length == 0 && sameNames.length == 0){
        db.query("INSERT INTO profiles (name, pwhash, email) VALUES (?, ?, ?)", [incom.username, crypetdPassword, incom.email]).catch((err) => {
            console.log(err);
        });
        return '/?status=Registration successful';
    }
}



module.exports = {
    login,
    register
}
