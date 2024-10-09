// const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const findFood = async (req, res) => {
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

module.exports = {
   findFood,
};
