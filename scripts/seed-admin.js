const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Admin user configuration
const ADMIN_USER = {
  email: 'dennismunge960@gmail.com',
  username: 'admin',
  password: 'admin123', // Change this to a secure password
  role: 'admin',
  name: 'Dennis Munge',
};

// Admin schema (simple version for seeding)
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [
        { email: ADMIN_USER.email },
        { username: ADMIN_USER.username }
      ]
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Username: ${existingAdmin.username}`);
      console.log('   Skipping creation...');
      return;
    }

    // Hash the password
    console.log('🔐 Hashing password...');
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(ADMIN_USER.password, saltRounds);

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = new Admin({
      email: ADMIN_USER.email,
      username: ADMIN_USER.username,
      passwordHash: passwordHash,
      role: ADMIN_USER.role,
      name: ADMIN_USER.name,
    });

    await admin.save();

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email:', ADMIN_USER.email);
    console.log('👤 Username:', ADMIN_USER.username);
    console.log('🔑 Password:', ADMIN_USER.password);
    console.log('');
    console.log('🚀 You can now login to the admin dashboard at /admin/login');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');

    // Update the auth route to use the new admin model
    console.log('');
    console.log('📝 Note: Make sure to update the admin auth route to use the database instead of hardcoded credentials.');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    
    if (error.code === 11000) {
      console.log('💡 This error usually means the admin user already exists.');
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding script
if (require.main === module) {
  seedAdmin().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
}

module.exports = { seedAdmin, Admin };
