import mongoose, { Schema, model, models } from 'mongoose';

// ─── Compliment ───────────────────────────────────────────────────────────────
export interface ICompliment {
  _id: mongoose.Types.ObjectId;
  text: string;
  order: number;
  category: string;
  createdAt: Date;
}

const ComplimentSchema = new Schema<ICompliment>({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  category: { type: String, default: 'general' },
  createdAt: { type: Date, default: Date.now },
});

export const Compliment = models.Compliment || model<ICompliment>('Compliment', ComplimentSchema);

// ─── GalleryPhoto ─────────────────────────────────────────────────────────────
export interface IGalleryPhoto {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
  caption: string;
  quote: string;
  order: number;
  createdAt: Date;
}

const GalleryPhotoSchema = new Schema<IGalleryPhoto>({
  imageUrl: { type: String, required: true },
  caption: { type: String, default: '' },
  quote: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const GalleryPhoto = models.GalleryPhoto || model<IGalleryPhoto>('GalleryPhoto', GalleryPhotoSchema);

// ─── LoveLetter ───────────────────────────────────────────────────────────────
export interface ILoveLetter {
  _id: mongoose.Types.ObjectId;
  recipientName: string;
  paragraphs: string[];
  signoff: string;
  theme: string;
  createdAt: Date;
}

const LoveLetterSchema = new Schema<ILoveLetter>({
  recipientName: { type: String, default: 'My Queen' },
  paragraphs: [{ type: String }],
  signoff: { type: String, default: 'Forever yours 💕' },
  theme: { type: String, default: 'birthday' },
  createdAt: { type: Date, default: Date.now },
});

export const LoveLetter = models.LoveLetter || model<ILoveLetter>('LoveLetter', LoveLetterSchema);
