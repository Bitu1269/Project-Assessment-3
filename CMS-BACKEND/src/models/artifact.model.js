// const mongoose = require("mongoose");

// const artifactSchema = new mongoose.Schema(
//     {
//         title: String,
//         description: String,
//         createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
//     },
//     { timestamps: true},
// );


// module.exports = mongoose.model("Artifact", artifactSchema);

const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // Likes
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    // Comments
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{ timestamps: true }
);

module.exports = mongoose.model("Artifact", artifactSchema);
