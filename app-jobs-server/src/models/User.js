const bcrypt = require('bcryptjs');
const db = require('../database/connection')


const User = {
  create : async function ({name, email, password, role}) {
    password = await hashText(password);

    console.log(name, email, password, role);
    const insertedUsers = await db('user').insert({
      name,
      email,
      password,
      role
    }, ['id'])
   
    const insertedUserId = insertedUsers[0];

    return insertedUserId;
  },

  findOne : async function ({email}) {
    const users = 
      await db('user')
        .select('*')
        .where('email', '=', email);
    if(users.length > 0){
      return users[0];            
    }
    return false
  },

  findById : async function({id}){
    const users = 
      await db('user')
        .select('*')
        .where('id', '=', id);
    if(users.length > 0){
      return users[0];            
    }
    return false
  }
}

async function hashText(password) {
  if(password){
    const hash = await bcrypt.hash(password, 10);
    const newPassword = hash;
    return newPassword
  }
  return null;
};

module.exports = User;