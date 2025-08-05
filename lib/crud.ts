import dbConnect from './mongodb';
import {
  Tribute,
  GalleryImage,
  TimelineEvent,
  Charity,
  ContactMessage,
  ITribute,
  IGalleryImage,
  ITimelineEvent,
  ICharity,
  IContactMessage,
} from './models';

// Generic CRUD operations
export class CRUDService<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    await dbConnect();
    const document = new this.model(data);
    return await document.save();
  }

  async findById(id: string): Promise<T | null> {
    await dbConnect();
    return await this.model.findById(id);
  }

  async findAll(filter: any = {}, options: any = {}): Promise<T[]> {
    await dbConnect();
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;
    
    return await this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await dbConnect();
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    await dbConnect();
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }

  async count(filter: any = {}): Promise<number> {
    await dbConnect();
    return await this.model.countDocuments(filter);
  }
}

// Specific service instances
export const tributeService = new CRUDService<ITribute>(Tribute);
export const galleryService = new CRUDService<IGalleryImage>(GalleryImage);
export const timelineService = new CRUDService<ITimelineEvent>(TimelineEvent);
export const charityService = new CRUDService<ICharity>(Charity);
export const contactService = new CRUDService<IContactMessage>(ContactMessage);

// Specialized methods for specific models
export const TributeAPI = {
  // Inherit all CRUD methods
  create: tributeService.create.bind(tributeService),
  findById: tributeService.findById.bind(tributeService),
  findAll: tributeService.findAll.bind(tributeService),
  update: tributeService.update.bind(tributeService),
  delete: tributeService.delete.bind(tributeService),
  count: tributeService.count.bind(tributeService),
  
  async getApprovedTributes(page = 1, limit = 10) {
    await dbConnect();
    const skip = (page - 1) * limit;
    return await Tribute
      .find({ isApproved: true, isPrivate: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },

  async getFeaturedTributes(limit = 5) {
    await dbConnect();
    return await Tribute
      .find({ isApproved: true, isFeatured: true, isPrivate: false })
      .sort({ createdAt: -1 })
      .limit(limit);
  },

  async getPendingTributes() {
    await dbConnect();
    return await Tribute
      .find({ isApproved: false })
      .sort({ createdAt: -1 });
  },

  async approveTribute(id: string) {
    await dbConnect();
    return await Tribute.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
  },
};

export const GalleryAPI = {
  // Inherit all CRUD methods
  create: galleryService.create.bind(galleryService),
  findById: galleryService.findById.bind(galleryService),
  findAll: galleryService.findAll.bind(galleryService),
  update: galleryService.update.bind(galleryService),
  delete: galleryService.delete.bind(galleryService),
  count: galleryService.count.bind(galleryService),
  
  async getImagesByCategory(category: string, page = 1, limit = 20) {
    await dbConnect();
    const skip = (page - 1) * limit;
    
    const filter = {
      ...(category !== 'All Photos' && { category }),
      isApproved: true,
    };
    
    return await GalleryImage
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },

  async getFeaturedImages(limit = 6) {
    await dbConnect();
    return await GalleryImage
      .find({ isApproved: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(limit);
  },

  async searchImages(tags: string[]) {
    await dbConnect();
    return await GalleryImage
      .find({ 
        tags: { $in: tags },
        isPublic: true 
      })
      .sort({ createdAt: -1 });
  },
};

export const TimelineAPI = {
  // Inherit all CRUD methods
  create: timelineService.create.bind(timelineService),
  findById: timelineService.findById.bind(timelineService),
  findAll: timelineService.findAll.bind(timelineService),
  update: timelineService.update.bind(timelineService),
  delete: timelineService.delete.bind(timelineService),
  count: timelineService.count.bind(timelineService),
  
  async getTimelineByCategory(category?: string) {
    await dbConnect();
    const filter = category ? { category, isPublic: true } : { isPublic: true };
    
    return await TimelineEvent
      .find(filter)
      .sort({ year: 1, order: 1 });
  },
};

export const CharityAPI = {
  // Inherit all CRUD methods
  create: charityService.create.bind(charityService),
  findById: charityService.findById.bind(charityService),
  findAll: charityService.findAll.bind(charityService),
  update: charityService.update.bind(charityService),
  delete: charityService.delete.bind(charityService),
  count: charityService.count.bind(charityService),
  
  async getActiveCharities() {
    await dbConnect();
    return await Charity
      .find({ isActive: true })
      .sort({ order: 1, name: 1 });
  },

  async getCharitiesByCategory(category: string) {
    await dbConnect();
    return await Charity
      .find({ category, isActive: true })
      .sort({ order: 1, name: 1 });
  },
};

export const ContactAPI = {
  // Inherit all CRUD methods
  create: contactService.create.bind(contactService),
  findById: contactService.findById.bind(contactService),
  findAll: contactService.findAll.bind(contactService),
  update: contactService.update.bind(contactService),
  delete: contactService.delete.bind(contactService),
  count: contactService.count.bind(contactService),
  
  async getUnreadMessages() {
    await dbConnect();
    return await ContactMessage
      .find({ isRead: false })
      .sort({ createdAt: -1 });
  },

  async markAsRead(id: string) {
    await dbConnect();
    return await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
  },

  async markAsReplied(id: string) {
    await dbConnect();
    return await ContactMessage.findByIdAndUpdate(
      id,
      { isReplied: true },
      { new: true }
    );
  },
};
