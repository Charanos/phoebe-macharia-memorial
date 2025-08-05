# 🎯 ADMIN DASHBOARD SPECIFICATIONS - PHOEBE WANGECI MEMORIAL

## 🎯 Dashboard Overview

**Purpose**: Comprehensive content management system for reviewing, curating, and managing all user-submitted content across the memorial website. This is the central hub for maintaining the integrity and quality of Phoebe's digital memorial.

**Access Control**: Secure password-protected admin interface with role-based permissions and activity logging.

## 🔐 Authentication & Security

**Login System:**

- Secure admin login page at `/admin/login`
- Password hashing with bcrypt
- Session management with JWT tokens
- Rate limiting to prevent brute force attacks
- Activity logging for all admin actions

**Security Features:**

- Input validation and sanitization
- XSS protection on all forms
- CSRF token validation
- File upload restrictions (type, size)
- Database query parameterization

## 📋 Content Management Modules

### 1. 📝 TRIBUTES MANAGEMENT

**Features:**

- **Approval Queue**: All submitted tributes require approval before display
- **Tribute Details**: View full tribute with author info, relationship, title, message
- **Quick Actions**:
  - Approve/Reject with custom message
  - Feature special tributes (pin to top)
  - Edit content for typos/inappropriate content
  - Delete spam or inappropriate tributes
- **Bulk Operations**: Approve multiple tributes at once
- **Search & Filter**: By name, relationship, date, approval status
- **Export**: Download tributes as CSV/JSON for backup
- **Statistics**: Total tributes, pending approvals, featured count

**Interface Elements:**

- Data table with sorting and pagination
- Preview modal for full tribute content
- Quick approval toggle switches
- Bulk selection checkboxes
- Search bar with real-time filtering

### 2. 🖼️ GALLERY MANAGEMENT

**Features:**

- **Image Upload**: Drag-and-drop or click-to-upload interface
- **Image Details**: Add/edit captions, categories, dates
- **Approval Workflow**: Review user-submitted images before publishing
- **Organization**: Categorize by event type, date, people
- **Image Processing**: Automatic resizing and optimization
- **Bulk Operations**: Upload multiple images at once
- **Gallery Statistics**: Total images, pending approvals, by category

**Image Categories:**

- Family Moments
- Church Life
- Community Service
- Professional
- Personal
- Celebrations

### 3. 📅 TIMELINE MANAGEMENT

**Features:**

- **Event Creation**: Add new timeline events with rich text descriptions
- **Date Management**: Flexible date input (exact or approximate)
- **Rich Content**: Support for images, videos, and formatted text
- **Categories**: Organize events by life categories
- **Approval System**: Review and approve timeline submissions
- **Media Gallery**: Multiple images per timeline event
- **Location Data**: Add locations with map integration
- **Export**: Download timeline as PDF or JSON

**Event Categories:**

- Birth & Childhood
- Education
- Career
- Marriage & Family
- Church
- Community
- Awards
- Personal

### 4. 📧 CONTACT MANAGEMENT

**Features:**

- **Message Inbox**: View all contact form submissions
- **Message Details**: Full message content with sender info
- **Status Tracking**: Mark as read/unread, replied
- **Reply System**: Send responses directly from dashboard
- **Export**: Download contact messages as CSV
- **Spam Detection**: Basic spam filtering
- **Statistics**: Message volume, response time metrics

## 🎨 Dashboard UI/UX Design

### Design System

**Visual Style:**

- Consistent with memorial website theme
- Glassmorphic design elements
- Warm, respectful color palette
- Professional typography (Nunito for body, Montserrat for headings)

### Page Structure

#### 1. Dashboard Home (`/admin`)

- Overview statistics
- Quick stats cards
- Recent activity feed
- System notifications

#### 2. Tributes Management (`/admin/tributes`)

- Search & filter bar
- Tributes data table with pagination
- Bulk operations
- Approval workflow

#### 3. Gallery Management (`/admin/gallery`)

- Upload zone with drag & drop
- Image grid with thumbnails
- Category filtering
- Image details editing

## 🔧 Technical Implementation

### API Endpoints

```typescript
// Admin Authentication
POST / api / admin / login;
POST / api / admin / logout;
GET / api / admin / session;

// Tributes Management
GET / api / admin / tributes; // All tributes with pagination
PATCH / api / admin / tributes / [id] / approve; // Approve tribute
DELETE / api / admin / tributes / [id]; // Delete tribute
PUT / api / admin / tributes / [id]; // Edit tribute

// Gallery Management
GET / api / admin / gallery; // All images with pagination
POST / api / admin / gallery / upload; // Upload new images
PATCH / api / admin / gallery / [id] / approve; // Approve image
DELETE / api / admin / gallery / [id]; // Delete image
PUT / api / admin / gallery / [id]; // Edit image details

// Timeline Management
GET / api / admin / timeline; // All timeline events
POST / api / admin / timeline; // Create new event
PUT / api / admin / timeline / [id]; // Update event
DELETE / api / admin / timeline / [id]; // Delete event

// Contact Management
GET / api / admin / contact; // All contact messages
PATCH / api / admin / contact / [id] / read; // Mark as read
DELETE / api / admin / contact / [id]; // Delete message
POST / api / admin / contact / [id] / reply; // Send reply

// Analytics
GET / api / admin / analytics; // Dashboard statistics
GET / api / admin / activity; // Recent activity log
```

### Database Schema Extensions

```typescript
// Admin User Model
interface AdminUser {
  email: string;
  password: string; // hashed
  role: "super_admin" | "content_manager";
  lastLogin: Date;
  activityLog: Activity[];
}

// Activity Log
interface Activity {
  adminId: ObjectId;
  action: string;
  resource: string;
  resourceId: ObjectId;
  timestamp: Date;
  ipAddress: string;
}
```

## 🎯 NEXT STEPS FOR IMPLEMENTATION

### Phase 1: Admin Dashboard (Priority)

1. **Create Admin Authentication**

   - Login page with secure authentication
   - Session management
   - Password hashing and validation

2. **Build Dashboard Layout**

   - Sidebar navigation
   - Top bar with user info
   - Responsive grid system

3. **Implement Tributes Management**

   - Approval queue interface
   - Tribute details modal
   - Bulk operations
   - Search and filtering

4. **Create Gallery Management**

   - Upload interface
   - Image grid with thumbnails
   - Category management
   - Approval workflow

5. **Build Timeline Management**

   - Event creation/editing forms
   - Rich text editor
   - Media upload
   - Date picker with validation

6. **Contact Management**

   - Message inbox
   - Reply system
   - Status tracking

7. **Analytics Dashboard**
   - Statistics overview
   - Activity logs
   - Performance metrics

### Phase 2: Enhanced Features

- **Image optimization pipeline**
- **Email notifications for new submissions**
- **Advanced search and filtering**
- **Export functionality**
- **Bulk operations**
- **User role management**

### Phase 3: Polish & Security

- **Security audit**
- **Performance optimization**
- **Mobile responsiveness**
- **Accessibility improvements**
- **Testing and QA**

## 📊 Current Status Summary

### ✅ COMPLETED

- MongoDB integration with all models
- Frontend-backend integration for all pages
- Toast notification system
- Contact information updates
- Bug fixes for tribute submission

### 🔄 NEXT PRIORITY

- **Admin Dashboard Implementation** - This is the critical next step to enable content curation and approval of user submissions

### 📞 Contact Information

- **Primary Contact**: 0725834099 - Eunice Njoki
- **Mpesa Contributions**: Send Money to 0725834099
- **All Inquiries**: Direct to Eunice Njoki
