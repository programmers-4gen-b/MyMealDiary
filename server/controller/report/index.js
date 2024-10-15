const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

dotenv.config();


//음식 meal 테이블 저장
const mealStore = async (req, res)=>{
  let { user_id, meal_type} = req.body;
  const {data, error}= await supabase.from('meal').insert([
  {  user_id:user_id,
    meal_date:new Date().toISOString().split('T')[0],
    meal_type}
  ])  
  if (error) {
    return res.status(500).json({ error: error.message });
 }
 res.status(201).json({ message: 'Meal saved successfully', data });
}

//meal_log 테이블 저장
const mealLogStore = async (req, res)=>{
  let {user_id, meal_type, serving_size, foodcd,foodnm} = req.body;
  const { data: food, error:getError } = await supabase
  .from('food')
  .select('*').eq('foodnm', foodnm).eq('foodcd', foodcd)
  const {enerc ,water,prot,fatce,ash,chocdf,sugar,fibtg, nat}= food[0]
  let quantity= parseInt(serving_size)
  if (getError) {
    return res.status(500).json({ error: error.message , message:"Cannot find food"});
  }
  if(quantity <= 0){
    return res.status(500).json({ message:"Inaccurate Serving Size"});
  }
  const nuturients= [enerc ,prot,chocdf,fatce,sugar,nat,fibtg].map((value)=>{
    let total =parseFloat(value) * serving_size
    return Number(total.toFixed(2))
  })
  const {data:meal_log, error:insertError}= await supabase.from('meal_log').insert([
    {
      user_id:user_id,
      meal_type:meal_type,
      meal_date: new Date().toISOString().split('T')[0],
      meal_time: new Date().toTimeString().split(' ')[0],
      food_name:foodnm,
      food_category:"음식",
      serving_size : serving_size,
      calories:nuturients[0],
      protein:nuturients[1],
      carbohydrates:nuturients[2],
      fat:nuturients[3],
      sugar:nuturients[4],
      sodium:nuturients[5],
      fiber:nuturients[6],
    }
  ])
  if (insertError) {
    return res.status(500).json({ error: insertError.message });
 }
 res.status(201).json({ message: 'Meal saved successfully',meal_log });
}


//조회 기간 영양소 조회
const calendarLog = async(req,res)=>{ 
  let { user_id, startDate , endDate}= req.body;
  const { data: foodDetail, error:foodError } = await supabase
  .from('meal_log')
  .select('*')
  .eq('user_id',user_id)
  .gte('meal_date', startDate)
  .lte('meal_date', endDate);

//목표 섭취량
  // const {data:userDetail, error:userError} = await supabase.from('user').select('')
  const totalNutrient = foodDetail.reduce((accumulator, meal) => {
    return {
      calories: accumulator.calories + Number(meal.calories != null ? parseFloat(meal.calories).toFixed(2) || 0 : 0),
      protein: accumulator.protein + Number(meal.protein != null ? parseFloat(meal.protein).toFixed(2) || 0 : 0),
      carbohydrates: accumulator.carbohydrates + Number(meal.carbohydrates != null ? parseFloat(meal.carbohydrates).toFixed(2) || 0 : 0),
      fat: accumulator.fat + Number(meal.fat != null ? parseFloat(meal.fat).toFixed(2) || 0 : 0),
      sugar: accumulator.sugar + Number(meal.sugar != null ? parseFloat(meal.sugar).toFixed(2) || 0 : 0),
      sodium: accumulator.sodium + Number(meal.sodium != null ? parseFloat(meal.sodium).toFixed(2) || 0 : 0),
      fiber: accumulator.fiber + Number(meal.fiber != null ? parseFloat(meal.fiber).toFixed(2) || 0 : 0),
    };
  }, {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    sugar: 0,
    sodium: 0,
    fiber: 0,
  });
  if (foodError) {
    return res.status(500).json({ error: foodError.message });
 }
 res.status(200).json(totalNutrient);
}

//개별 날짜 칼로리 조회
const findLog = async(req,res)=>{
  let {user_id,searchDate}= req.body
  const { data: foodDetail, error:foodError } = await supabase
  .from('meal_log')
  .select('calories')
  .eq('user_id',user_id).eq('meal_date',searchDate)
  const totalCalories = foodDetail.reduce((accumulator, meal) =>
      {
        if (meal.calories != null ) {
          return accumulator + Number(parseFloat(meal.calories).toFixed(2));
        }
        return accumulator;
      }
  , 0);
  if (foodError) {
    return res.status(500).json({ error: foodError.message });
 }
 res.status(200).json({ message: 'Total Calories', totalCalories });
}

module.exports = {
  mealStore,
  mealLogStore,
  calendarLog,
  findLog
};