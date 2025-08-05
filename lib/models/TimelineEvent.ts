import mongoose, { Document, Schema } from 'mongoose';

export interface ITimelineEvent extends Document {
  year: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  order: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TimelineEventSchema: Schema = new Schema(
  {
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['personal', 'family', 'church', 'business'],
    },
    image: {
      type: String, // URL to associated image
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
TimelineEventSchema.index({ year: 1, order: 1 });
TimelineEventSchema.index({ category: 1, isPublic: 1 });

export default mongoose.models.TimelineEvent || mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema);
