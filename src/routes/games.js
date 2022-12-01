'use strict';

const express = require('express');

const { gameInterface } = require('../models');

const router = express.Router();

router.get('/games/:id', async (req,res,next) => {
  try {
    const game = await gameInterface.read(req.params.id);
    res.status(200).send(game);
  } catch (error) {
    next(error);
  }
});

router.get('/games', async (req,res,next) => {
  try {
    const games = await gameInterface.read();
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
});

router.post('/games', async ( req, res, next) =>{
  try {
    const newGame = await gameInterface.create(req.body);
    res.status(200).send(newGame);
  } catch (error) {
    next(error);
  }
});

router.put('/games/:id', async (req,res,next) => {
  try {
    let newGame = await gameInterface.update(req.body , req.params.id);
    res.status(200).send(newGame);
  } catch (error) {
    next(error);
  }
});

router.delete('/games/:id', async (req,res,next) => {
  try {
    await gameInterface.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
