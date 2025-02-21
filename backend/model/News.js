const mongoose = require("mongoose");

const Newschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Can be a URL or base64
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const News = mongoose.model('news', Newschema);
module.exports = News;
