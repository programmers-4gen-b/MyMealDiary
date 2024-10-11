const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

dotenv.config();

const findFoodList = async (req, res) => {
  try { 
      let foodNm = req.query.foodNm
      const { data: food, error } = await supabase
      .from('food')
      .select('foodnm')
      .like('foodnm', `%${foodNm}%`);
      res.json({food})
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: '서버 에러가 발생했습니다.',
        error: error.message,
      });
  }
};

const findFood= async (req, res) => {
  try { 
      let foodNm = req.query.foodNm
      const { data: food, error } = await supabase
      .from('food')
      .select('*').eq('foodnm', foodNm)
      if(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
      }  
      res.json({food})
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: '서버 에러가 발생했습니다.',
        error: error.message,
      });
  }
};


module.exports = {
  findFoodList,
  findFood
};