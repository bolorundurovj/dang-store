const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render("index", { title: "Home" });
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: " Add Store" });
};

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save();
  // store
  //   .save()
  //   .then(store => {
  //     return Store.find()
  //   })
  //   .then(stores => {
  //     res.render('storeList', {stores: stores})
  //   })
  //   .catch(err => {
  //     throw Error(err)
  //   })
  console.log('Store Saved!');
};