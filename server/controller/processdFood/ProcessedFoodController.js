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
         .select('foodnm, foodcd')
         .like('foodnm', `%${foodnm}%`);

      if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      if (processedfood.length === 0) {
         return res.status(StatusCodes.NOT_FOUND).json({ message: '일치하는 데이터가 없습니다.' });
      }

      res.status(StatusCodes.OK).json({ processedfood });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '가공식품 조회 에러 ', error });
   }
};

const findProcessedFoodDetail = async (req, res) => {
   try {
      let foodnm = req.query.foodNm;
      let foodcd = req.query.foodcd;
      const { data: processedfood, error } = await supabase
         .from('processedfood')
         .select('*')
         .eq('foodnm', foodnm)
         .eq('foodcd', foodcd);

      if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      if (processedfood.length === 0) {
         return res.status(StatusCodes.NOT_FOUND).json({ message: '일치하는 데이터가 없습니다.' });
      }

      res.status(StatusCodes.OK).json({ processedfood });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '가공식품 상세 조회 에러 ', error });
   }
};

const saveProcessedFood = async (req, res) => {
   let {
      user_id,
      food_name,
      food_category,
      serving_size,
      calories,
      protein,
      fat,
      carbohydrates,
      sugar,
      fiber,
      meal_type,
      foodcd,
   } = req.body;

   const { data, error } = await supabase.from('meal_log').insert([
      {
         user_id,
         food_name,
         food_category,
         serving_size,
         calories,
         protein,
         fat,
         carbohydrates,
         sugar,
         fiber,
         meal_type,
         meal_date: new Date().toISOString().split('T')[0],
         meal_time: new Date().toTimeString().split(' ')[0],
         foodcd,
      },
   ]);
   if (error) {
      return res.status(500).json({ error: error.message });
   }
   res.status(201).json({ message: 'Food saved successfully' });
};

const deleteProcessedFood = async (req, res) => {
   const { user_id, id } = req.body;

   try {
      const { data, error } = await supabase.from('meal_log').delete().eq('user_id', user_id).eq('id', id);

      if (error) {
         console.error('Error deleting data:', error);
         return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ message: 'Data deleted successfully' });
   } catch (error) {
      console.error('Unexpected error:', err);
      res.status(500).json({ error: 'Internal server error', message: 'Data deleted failed' });
   }
};

const updateProcessedFood = async (req, res) => {
   const { id } = req.params;

   const {
      food_name,
      food_category,
      serving_size,
      calories,
      protein,
      carbohydrates,
      fat,
      sugar,
      sodium,
      fiber,
   } = req.body;

   const updated_at = new Date().toISOString(); // 업데이트된 시간 (ISO 포맷)
   const meal_date = new Date().toISOString().split('T')[0]; // 현재 날짜만 (YYYY-MM-DD 포맷)
   const meal_time = new Date().toTimeString().split(' ')[0]; // HH:mm:ss 포맷으로 변환

   try {
      const { data, error } = await supabase
         .from('meal_log')
         .update({
            meal_date,
            meal_time,
            food_name,
            food_category,
            serving_size,
            calories,
            protein,
            carbohydrates,
            fat,
            sugar,
            sodium,
            fiber,
            updated_at,
         })
         .eq('id', id);

      if (error) {
         console.error('Error updating data:', error);
         return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ message: 'Data updated successfully' });
   } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal server error', message: 'Data Update failed' });
   }
};

const getAllProcessedFoods = async (req, res) => {
   try {
      let { user_id, meal_date } = req.query;
      const { data: allProcessedfood, error } = await supabase
         .from('meal_log')
         .select('*')
         .eq('user_id', user_id)
         .eq('meal_date', meal_date);
      if (error) {
         console.error('Error retrieve processed foods:', error);
         return res.status(400).json({ error: error.message });
      }

      res.status(StatusCodes.OK).json(allProcessedfood);
   } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal server error', message: 'Failed to retrieve processed foods' });
   }
};

const getProcessedFoodById = async (req, res) => {
   try {
      let { id } = req.params;

      const { data: processedFoodById, error } = await supabase.from('meal_log').select('*').eq('id', id);

      if (error) {
         console.error('Error retrieve processed foods:', error);
         return res.status(400).json({ error: error.message });
      }

      res.status(StatusCodes.OK).json(processedFoodById[0]);
   } catch (error) {}
};

module.exports = {
   findProcessedFood,
   saveProcessedFood,
   findProcessedFoodDetail,
   deleteProcessedFood,
   updateProcessedFood,
   getAllProcessedFoods,
   getProcessedFoodById,
};
