import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryImage extends Document {
  src: string;
  alt: string;
  caption: string;
  category: string;
  tags: string[];
  uploadedBy: string;
  isPublic: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema: Schema = new Schema(
  {
    src: {
      type: String,
      required: [true, 'Image source URL is required'],
    },
    alt: {
      type: String,
      required: [true, 'Alt text is required for accessibility'],
      maxlength: [200, 'Alt text cannot exceed 200 characters'],
    },
    caption: {
      type: String,
      maxlength: [500, 'Caption cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'All Photos',
        'Family Moments',
        'Church Life',
        'Business Events',
        'Special Occasions',
        'Candid Memories',
      ],
      default: 'All Photos',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    uploadedBy: {
      type: String,
      required: [true, 'Uploader name is required'],
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
GalleryImageSchema.index({ category: 1, isPublic: 1 });
GalleryImageSchema.index({ tags: 1 });
GalleryImageSchema.index({ order: 1, createdAt: -1 });

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
