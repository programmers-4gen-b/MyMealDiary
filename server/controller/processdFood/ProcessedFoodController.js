// const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const findProcessedFood = async (req, res) => {
   try {
      let foodnm = req.query.foodNm;
      const { data: processedfood, error } = await supabase
         .from('processedfood')
         .select('*')
         .like('foodnm', `%${foodnm}%`); // foodnm에 포함된 문자열 검색

      if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });

      res.status(StatusCodes.OK).json({ processedfood });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '가공식품 조회 에러 ', error });
   }
};

const saveProcessedFood = async (req, res) => {
   let { user_id, food_name, calories, protein, fat, carbohydrates, sugar, fiber } = req.body;

   const { data, error } = await supabase
      .from('meal_log') // 테이블 이름을 'foods'로 가정
      .insert([
         {
            user_id,
            food_name,
            calories,
            protein,
            fat,
            carbohydrates,
            sugar,
            fiber,
            meal_date: new Date().toISOString().split('T')[0],
            meal_time: new Date().toTimeString().split(' ')[0],
            meal_type: 'dinner',
         },
      ]);
   if (error) {
      return res.status(500).json({ error: error.message });
   }
   res.status(201).json({ message: 'Food saved successfully', data });
};

module.exports = {
   findProcessedFood,
   saveProcessedFood,
};
