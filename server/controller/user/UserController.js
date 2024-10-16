const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const login = async (req, res) => {
   try {
      let { user_name, password } = req.body;

      const { data: user, error } = await supabase
         .from('users')
         .select('*')
         .eq('user_name', user_name)
         .single();

      if (error || !user) {
         console.log('사용자를 찾을 수 없습니다.');
         return res.status(StatusCodes.NOT_FOUND).json({ message: '일치하는 계정 정보를 찾을 수 없습니다.' });
      }

      const hashPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');

      if (user.password !== hashPassword) {
         console.log('비밀번호가 일치하지 않습니다.');
         return res.status(StatusCodes.UNAUTHORIZED).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      const token = jwt.sign(
         {
            user_name: user.user_name,
         },
         process.env.PRIVATE_KEY,
         {
            expiresIn: '30m',
            issuer: user_name,
         },
      );

      res.cookie('token', token, { httpOnly: true });

      res.status(StatusCodes.OK).json({ message: '로그인 성공', user });
   } catch (error) {
      console.error('로그인 오류:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         error: '로그인 시도 중 오류가 발견되었습니다.',
         details: error.message,
      });
   }
};

const register = async (req, res) => {
   try {
      const { user_name, password } = req.body;

      const salt = crypto.randomBytes(64).toString('base64');
      const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

      const { data: existingUser, error: findError } = await supabase
         .from('users')
         .select('*')
         .eq('user_name', user_name);

      if (findError) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: findError.message });
      }
      if (existingUser.length > 0) {
         return res.status(StatusCodes.CONFLICT).json({ message: '이미 존재하는 아이디입니다.' });
      }

      const { data: newUser, error: insertError } = await supabase
         .from('users')
         .insert([{ user_name: user_name, password: hashPassword, salt: salt }]);

      if (insertError) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: insertError.message });
      }

      res.status(StatusCodes.CREATED).json({ message: '회원가입이 완료되었습니다.', user: newUser });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         error: '회원가입 중 오류가 발생했습니다.',
         details: error.message,
      });
   }
};


const getCalories = async(req,res)=>{
   try{
      let {user_id ,average_calorie }= req.query
      const {data , error} = await supabase.from('users').select('average_calorie').eq('id', user_id)
      if(error){ res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message});}
      else res.status(StatusCodes.OK).json(data[0]);
   }
   catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message, message:err});
   }
}

const setCalories = async (req,res)=>{
   try{
      let {user_id ,average_calorie }= req.body
      const {data , error} = await supabase.from('users').update({average_calorie:average_calorie}).eq('id', user_id)
      if(error){ res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message});}
      else res.status(StatusCodes.OK).json({message:"Successfully Changed"});
   }
   catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message, message:err});
   }
}


module.exports = {
   login,
   register,
   getCalories,
   setCalories
};
