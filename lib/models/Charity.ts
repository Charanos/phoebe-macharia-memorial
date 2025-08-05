import mongoose, { Document, Schema } from 'mongoose';

export interface ICharity extends Document {
  name: string;
  description: string;
  website: string;
  logo: string;
  category: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CharitySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Charity name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    website: {
      type: String,
      required: [true, 'Website URL is required'],
      match: [
        /^https?:\/\/.+/,
        'Please enter a valid website URL',
      ],
    },
    logo: {
      type: String,
      required: [true, 'Logo URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Religious',
        'Education',
        'Healthcare',
        'Community Development',
        'Children & Youth',
        'Women Empowerment',
        'Other',
      ],
    },
    isActive: {
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
CharitySchema.index({ isActive: 1, order: 1 });
CharitySchema.index({ category: 1 });

export default mongoose.models.Charity || mongoose.model<ICharity>('Charity', CharitySchema);
