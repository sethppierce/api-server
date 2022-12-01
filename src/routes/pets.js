'use strict';

const express = require('express');

const { petInterface , gameInterface} = require('../models');

const router = express.Router();

router.get('/pets/:id', async (req,res,next) => {
  try {
    const pet = await petInterface.read(req.params.id);
    res.status(200).send(pet);
  } catch (error) {
    next(error);
  }
});

router.get('/pets', async (req,res,next) => {
  try {
    const pets = await petInterface.read();
    res.status(200).send(pets);
  } catch (error) {
    next(error);
  }
});

// interfacing demo
// router.get('./petWithGames/:id', async (req, res, next) => {
//   try {
//     const petWithGames = await petInterface.readManyToOne(req.params.id, gameInterface.model);
//     res.status(200).send(petWithGames);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/pets', async ( req, res, next) =>{
  try {
    const newPet = await petInterface.create(req.body);
    res.status(200).send(newPet);
  } catch (error) {
    next(error);
  }
});

router.put('/pets/:id', async (req,res,next) => {
  try {
    let newPet = await petInterface.update(req.body , req.params.id);
    res.status(200).send(newPet);
  } catch (error) {
    next(error);
  }
});

router.delete('/pets/:id', async (req,res,next) => {
  try {
    await petInterface.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
