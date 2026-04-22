// import mongoose from "mongoose";

// const submissionSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     problem: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Problem",
//       required: true,
//     },
//     language: {
//       type: String,
//       required: true,
//     },
//     code: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Accepted", "Wrong Answer", "Runtime Error"],
//       default: "Wrong Answer",
//     },
//     testResults: [
//       {
//         input: String,
//         expected: String,
//         output: String,
//         passed: Boolean,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Submission", submissionSchema);

import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "Runtime Error"],
      default: "Wrong Answer",
    },
   testResults: {
  type: [
    {
      input: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
      },
      expected: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      output: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      passed: {
        type: Boolean,
        required: true,
      },
    }
  ],
  default: []
},

  },
  { timestamps: true }
);
submissionSchema.index(
  { user: 1, problem: 1 },
  { unique: true }
);

export default mongoose.model("Submission", submissionSchema);
