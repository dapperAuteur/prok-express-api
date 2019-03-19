const express = require("express");
const router = express.Router();
const db = require("./../models");
const helpersTags = require("./../helpers/helpers_tags");

router
  .route("/")
  .get(helpersTags.getTags)
  .post(helpersTags.createTag);

router
  .route("/:tagId")
  .get(helpersTags.getTag)
  .put(helpersTags.updateTag)
  .patch(helpersTags.updateTag)
  .delete(helpersTags.deleteTag);

module.exports = router;
