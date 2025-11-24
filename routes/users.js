import express from 'express';
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const router = express.Router();

//Регистация
router.post('/register', async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message: 'Заолните все поля'})
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Пользовтель с таким email уже есть'})
        }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      })
      await newUser.save();
      return res.status(201).json({message: 'Пользователь сахранен'})
    }catch(err){
     console.error("Ошибка регистрации:", err);
     res.status(500).json({ message: "Ошибка сервера" });
    }
})

//Логин
router.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Заполните все поля'})
    }
    try{
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({message: 'такой пользователь не найден'})
        }
        
        const checkpass = await bcrypt.compare(password, user.password);
        if(!checkpass){
           return res.status(400).json({message: 'Неверный логин или пароль'})
        }
      const token = jwt.sign(
      { id: user._id, email: user.email, date: user.date },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
    res.json({message: 'Успешно',token})

    }catch(err){
     res.status(500).json({ message: 'Ошибка сервера', error: err.message });     
    }
})


export default router;