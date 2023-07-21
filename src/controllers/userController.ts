import User from '../models/userModel';
import Books from '../models/books';
import {Request, Response, NextFunction} from 'express';
import { SaltGenerator, hashPassword, passwordGenerator, tokenGenerator } from '../utilities/utility';
import { hash } from 'bcryptjs';
import {emailHtml, sendmail} from '../utilities/notification';
import bcrypt from 'bcryptjs';

export const createUser = async(req:Request, res:Response, next:NextFunction)=>{

    try {
        
        const { firstName, lastName, email} = req.body
        const findUser = await User.findOne({email});

        if(findUser){
            return res.status(400).json({
                message: `User already exists`
            });
        };
        
        const salt = await SaltGenerator();
        const password = await passwordGenerator(lastName)
        const hashedPassword = await hashPassword(password, salt)

        if(!findUser){
          let newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'Autor',
            books: []
          });

          const mainUser = await User.findOne({email});

          if(mainUser){
            const html = emailHtml(email, password)
            await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html);

            return res.status(200).json({
                message: `Account created successfully`, 
                role: mainUser.role
            })
          }
          return res.status(401).json({
            message: `unable to create user`
          });
        }
    } catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/createUser`
        });
    }
}

export const loginUser = async(req:Request, res:Response, next:NextFunction)=>{
  try {
     const {email, password} = req.body;
     const user = await User.findOne({email});

     if(!user){
      return res.status(400).json({
        message: `User does not exists, Kindly sign up`
    });
     }

     if(user){
       const validate = await bcrypt.compare(password, user.password);
       if(!validate){
        return res.status(400).json({
          message: `Invalid Password`
        });
       }
       if(validate){
        const token = await tokenGenerator(`${user._id}`)
        res.cookie(`token`, token)
        return res.status(200).json({
          message: `login successful`,
          email: user.email
        })
       }
     }
  } catch (error) {
    return res.status(500).json({
      message: `internal server error`,
      Error: `users/loginUser`
  });
  }
}

export const getAll =async (req:Request, res:Response, next:NextFunction) => {
     try {
       const allUsers = await User.find({});

       if(!allUsers){
        return res.status(404).json({
          message: `Users not fetched`
        })
       }

       return res.status(200).json({
         message: `All users fetched successfully`,
         allUsers
       })
     } catch (error) {
      return res.status(500).json({
        message: `internal server error`,
        Error: `users/getAll`
     });
    }
}

export const updateUser = async (req:Request, res:Response, next:NextFunction)=>{
  try {
    const {email, firstName, lastName} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({
        message: `User does not exist `
      });
    }
   const updatedUser = await User.findOneAndUpdate({email}, {firstName, lastName});

   if(updatedUser){
      return res.status(200).json({
        message:`User updated successfully`,
        updatedUser
      })
   }
   return res.status(401).json({
    message:`user update failed`
   })
  } catch (error) {
    return res.status(500).json({
      message: `internal server error`,
      Error: `users/updateUser`
  });
}
}

export const deleteUser = async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {email} = req.body;
    const userToDelete = await User.findOneAndDelete({email})

    if(!userToDelete){
      return res.status(500).json({
        message: `User not deleted`
      });
    }
    
    const users = await User.find({})
    return res.status(200).json({
       message:`Deleted successfully`,
       users
    })
  } catch (error) {
    return res.status(500).json({
      message: `internal server error`,
      Error: `users/updateUser`
  });
  }
}