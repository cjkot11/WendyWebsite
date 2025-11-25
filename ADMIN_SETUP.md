# Admin Dashboard Setup Guide

## Step 1: Create Admin User in Supabase Auth

1. Go to your Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: Your admin email (e.g., `wendy@wendytravel.com`)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**

## Step 2: Add User to Users Table

1. Go to Supabase Dashboard → **SQL Editor**
2. Run this SQL (replace with your actual email):

```sql
INSERT INTO users (name, email, role)
VALUES ('Wendy', 'wendy@wendytravel.com', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';
```

**Note**: Make sure the email matches exactly what you used in Step 1.

## Step 3: Test Admin Login

1. Go to your website: `https://your-site.vercel.app/admin`
2. Log in with the email and password from Step 1
3. You should see the admin dashboard with:
   - Pending reviews (to approve)
   - Approved reviews (to manage)
   - Leads (customer inquiries)

## Step 4: Approve Your First Review

1. In the admin dashboard, find a pending review
2. Click **"Approve"** - it will appear on the public `/reviews` page
3. Click **"Delete"** to remove unwanted reviews

## Troubleshooting

**Can't log in?**
- Verify the user exists in Authentication → Users
- Verify the user exists in the `users` table with `role = 'admin'`
- Check that the email matches exactly in both places

**Getting "Forbidden" error?**
- Make sure the `users` table has your email with `role = 'admin'`
- Check Supabase → Table Editor → `users` table

**Reviews not showing?**
- Check that reviews exist in the `reviews` table
- Verify the API routes are working (check browser console)
