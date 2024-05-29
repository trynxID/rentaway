const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      street: {
        type: String,
        required: true,
      },
      village: {
        type: String,
      },
      district: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: ["apartment", "house", "kost"],
      required: true,
    },
    details: {
      size: {
        type: Number,
      },
      bedrooms: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      facilities: [
        {
          type: String,
        },
      ],
    },
    capacity: {
      type: Number,
      required: true,
    },
    availability: {
      availableFrom: {
        type: Date,
        required: true,
      },
      availableUntil: {
        type: Date,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "under_maintenance"],
      default: "available",
      required: true,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "properties" }
);

propertySchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
