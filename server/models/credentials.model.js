const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredentialSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    refreshTokensUsed: [{ type: String }],
    emailVerificationCode: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCodeExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("credientials", CredentialSchema);
