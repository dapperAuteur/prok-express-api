const db = require("./../models");
const Tag = db.Tag;

exports.getTags = function(req, res) {
  Tag.find()
    .then(function(tags) {
      res.json(tags);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.createTag = function(req, res) {
  Tag.create(req.body)
    .then(function(newTag) {
      res.status(201).json(newTag);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getTag = function(req, res) {
  Tag.findById(req.params.tagId)
    .then(function(foundTag) {
      res.json(foundTag);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateTag = function(req, res) {
  Tag.findOneAndUpdate({ _id: req.params.tagId }, req.body, {
    new: true
  })
    .then(function(updatedTag) {
      res.json(updatedTag);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteTag = function(req, res) {
  Tag.remove({ _id: req.params.tagId })
    .then(function() {
      res.json({
        message: `Tag ${req.params.tagId} deleted`,
        tagId: req.params.tagId
      });
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports = exports;
