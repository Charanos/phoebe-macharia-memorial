import mongoose, { Document, Schema } from 'mongoose';

export interface ITribute extends Document {
  name: string;
  relationship: string;
  email?: string;
  message: string;
  isPrivate: boolean;
  photo?: string;
  isApproved: boolean;
  familyResponse?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TributeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      enum: [
        'Family',
        'Friend',
        'Church Member',
        'Colleague',
        'Neighbor',
        'Student',
        'Other',
      ],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String, // URL to uploaded photo
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    familyResponse: {
      type: String,
      maxlength: [1000, 'Family response cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
TributeSchema.index({ createdAt: -1 });
TributeSchema.index({ isApproved: 1, isPrivate: 1 });

export default mongoose.models.Tribute || mongoose.model<ITribute>('Tribute', TributeSchema);
