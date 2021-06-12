const express = require('express');
const router = express.Router();
const base64Img = require('base64-img');
const isBase64 = require('is-base64');
const fs = require('fs-extra');

const {Media} = require('../models');

router.delete('/:id', async(req, res, next)=>{
  const id = req.params.id;
  const data = await Media.findByPk(id);

  if(!data){
    return res.status(404).json({
      status: "error",
      message: "data not found"
    });
  }

  fs.remove(`./public/images/${data.image.split('/').pop()}`, async(err)=>{
    if(err){
      return res.status(400).json({
        status:"error",
        message: err.message
      });
    }
    await data.destroy();
  });

  return res.json({
    status: "success",
    message: "data deleted"
  });
});

router.get('/', async (req, res, next) => {
  const data = await Media.findAll({attributes: ['id', 'image']});

  dataMap = data.map((d)=>{
    d.image = `${req.get('host')}/${d.image}`;
    return d;
  });

  return res.json({
    status : "success",
    data : dataMap
  });
  
});

router.post('/', (req, res, next) => {
  const image = req.body.image;

  if (!isBase64(image, {
      mimeRequired: true
    })) {
    return res.status(400).json({
      status: "error",
      message: "invalid base64"
    });
  }

  base64Img.img(image, './public/images', new Date().getTime(), async(err, filepath) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: err.message
      });
    }

    const filename = filepath.split('/').pop();

    const data = await Media.create({
      image: `image/${filename}`
    });

    return res.json({
      status: "success",
      data: {
        id: data.id,
        image: `${req.get('host')}/images/${filename}`
      }
    });
  });
});

module.exports = router;