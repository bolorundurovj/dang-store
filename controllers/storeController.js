const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const multer = require("multer");
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
  }
}

exports.homePage = (req, res) => {
  res.render("index", { title: "Home" });
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: " Add Store" });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();
  req.flash(
    "success",
    `Successfully created ${store.name}. Care to leave a review?`
  );
  res.redirect(`/stores/${store.slug}`);
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
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render("stores", { title: "Stores", stores });
};

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });
  res.render("editStore", { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  //set location data to type of point
  req.body.location.type = 'Point';

  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  req.flash(
    "success",
    `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store &rarr; </a>`
  );
  res.redirect(`/stores/${store._id}/edit`);
};
