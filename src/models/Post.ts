import { model, Schema } from 'mongoose';

import Paginate from 'mongoose-paginate-v2';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(Paginate);

export const Post = model('posts', PostSchema);
