// const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const findProcessedFood = async (req, res) => {
   try {
      let foodNm = req.query.foodNm;
      const apiUrl = `http://api.data.go.kr/openapi/tn_pubr_public_nutri_process_info_api?serviceKey=${
         process.env.SERVICE_KEY_PROCESSED_FOOD
      }&pageNo=1&numOfRows=100&type=json&foodNm=${encodeURIComponent(foodNm)}`;

      const response = await axios.get(apiUrl);

      let foodData = response.data.response.body.items;

      if (!foodData || foodData.length === 0) {
         return res.status(StatusCodes.NOT_FOUND).json({
            message: '해당 음식에 대한 데이터를 찾을 수 없습니다.',
         });
      }

      const fieldsToExclude = [
         'foodOriginCd',
         'dataCd',
         'nat',
         'vitaRae',
         'retol',
         'cartb',
         'thia',
         'ribf',
         'nia',
         'vitc',
         'vitd',
         'chole',
         'fasat',
         'fatrn',
         'srcCd',
         'srcNm',
         'servSize',
         'foodSize',
         'itemMnftrRptNo',
         'mfrNm',
         'imptNm',
         'distNm',
         'imptYn',
         'cooCd',
         'cooNm',
         'dataProdCd',
         'dataProdNm',
         'crtYmd',
         'crtrYmd',
         'insttCode',
         'foodLv3Cd',
         'foodLv3Nm',
         'foodLv4Cd',
         'foodLv4Nm',
         'foodLv5Cd',
         'foodLv5Nm',
         'foodLv6Cd',
         'foodLv6Nm',
         'foodLv7Cd',
         'foodLv7Nm',
      ];

      foodData = foodData.map((item) => {
         const filteredItem = Object.fromEntries(
            Object.entries(item).filter(([key]) => !fieldsToExclude.includes(key)),
         );
         return filteredItem;
      });

      return res.status(StatusCodes.OK).json(foodData);
   } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         message: '서버 에러가 발생했습니다.',
         error: error.message,
      });
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
