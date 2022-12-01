'use strict';

class ModelInterface {
  constructor(model){
    this.model = model;
  }

  async create(json){
    try {
      let record = await this.model.create(json);
      return record;
    } catch (error) {
      console.error('ModelInterface create Error!', error);
      return error;
    }
  }

  async read(id = null){
    try {
      let record;
      if(id){
        record = await this.model.findOne({ where: {id: id}});
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch (error) {
      console.error('ModelInterface read Error!', error);
      return error;
    }
  }

  // interfacing demo
  // async readManyToOne(id, model){
  //   try {
  //     let record = await this.model.findOne({where: {id: id}, include: model});
  //     return record;
  //   } catch (error) {
  //     console.error('ModelInterface readManyToOne Error!', error);
  //     return error;
  //   }
  // }

  async update(body, id){
    try {
      await this.model.update(body , { where: {id: id}});
      let record = await this.model.findOne({ where: {id: id}});
      return record;
    } catch (error) {
      console.error('ModelInterface update Error!', error);
      return error;
    }
  }

  async delete(id){
    try {
      await this.model.destroy({ where: {id: id}});
    } catch (error) {
      console.error('ModelInterface delete Error!', error);
      return error;
    }
  }
}

module.exports = ModelInterface;
