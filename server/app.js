const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT, () => {
   console.log(`Server on port number : ${process.env.PORT}.`);
});

const processedFood = require('./route/processedFood/processedFood');

app.use('/processedFood', processedFood);

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/test', async (req, res) => {
   const { data: users, error: err1 } = await supabase.from('users').select('*');
   const { data: meal_log, error: err2 } = await supabase.from('meal_log').select('*');
   if (err1) {
      return res.status(500).json({ error: error.message });
   }
   res.json({ users, meal_log });
});
