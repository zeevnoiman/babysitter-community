const bcrypt = require('bcryptjs');
const db = require('../database/connection')


const User = {
  create : async function ({name, email, password, role}) {
    password = await hashText(password);

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
  },

  addLikedBabysitter : async function(user_id, babysitter_id){
    try{
      await db('liked_babysitters')
      .insert({
        user_id,
        babysitter_id
      })
      return true
    } catch(err){
      return false
    }
  },

  showAllLikedBabysitters : async function(user_id){
    try{
      const likedBabysitters = 
        await db('liked_babysitters')
        .select('babysitter.*')
        .innerJoin('babysitter', 'liked_babysitter.babysitter_id', '=', 'babysitter.id')
        .where('liked_babysitters.user_id', '=', user_id);
      return likedBabysitters;
    } catch(err){
        return false;
    }
  },

  deleteLikedBabysitter : async function(user_id, babysitter_id){
    try{
      await db('liked_babysitters')
      .where('user_id', '=', user_id)
      .andWhere('babysitter_id', '=', babysitter_id)
      .del();

      return true;
    } catch(err){
      return false;
    }
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