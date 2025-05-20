import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from "crypto";
import fs from "fs";

const saltRounds=10;


  const writePrivatePublic=async()=>{
    try{

      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
      });

      fs.writeFileSync(`./assets/keys/public.pem`, publicKey);
      fs.writeFileSync(`./assets/keys/private.pem`, privateKey);

    } catch(error){
      console.log("Error Writing private and Public Key to File");
      process.exit(1);
    }
  }


  let privateKey;
  let publicKey;


  const loadPersistentKeys=async()=>{
    try{

      privateKey = fs.readFileSync('./assets/keys/private.pem', 'utf8');
      publicKey = fs.readFileSync('./assets/keys/public.pem', 'utf8');

    } catch(error){
      console.log("error loading persistent Keys - ",error);
      process.exit(1);
    }
  }


  const signToken = async (id) => {

    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: id },
        privateKey,
        { algorithm: 'RS256' },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });

  };



const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        publicKey,
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        }
      );
    });
  };



  const passHash=(password)=>{

    try{
  
      const salt = bcrypt.genSaltSync(saltRounds);
    
      const pass_hash = bcrypt.hashSync(password, salt);
    
      return pass_hash;
  
    } catch(error){
  
      console.error("unabe to hash password: ",error.message);
  
    }
  
  };


  export default {
    verifyToken,
    signToken,
    passHash,
    writePrivatePublic,
    loadPersistentKeys
  }