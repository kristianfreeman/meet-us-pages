#!/usr/bin/env node

import readline from 'readline';
import { promisify } from 'util';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = promisify(rl.question).bind(rl);

async function createUser() {
  console.log('Create Admin User for Cloudflare Meet Us Pages\n');
  
  try {
    const email = await question('Email: ');
    const name = await question('Name: ');
    const password = await question('Password: ');
    
    if (!email || !name || !password) {
      console.error('\nError: All fields are required');
      process.exit(1);
    }
    
    if (password.length < 8) {
      console.error('\nError: Password must be at least 8 characters');
      process.exit(1);
    }
    
    const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:5173';
    
    console.log('\nCreating user...');
    
    console.log('Note: Public signup is disabled. This script requires an authenticated admin session.');
    console.log('Please ensure you are logged in as an admin, or use SQL to create users directly.');
    console.log('');
    
    const response = await fetch(`${baseUrl}/api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name
      }),
      credentials: 'include'
    });
    
    const responseText = await response.text();
    
    if (response.ok) {
      console.log('\n✅ User created successfully!');
      console.log(`\nYou can now login at ${baseUrl}/login with:`);
      console.log(`Email: ${email}`);
      console.log(`Password: [hidden]`);
    } else {
      let errorMessage = 'Failed to create user';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // Use default error message
      }
      console.error(`\n❌ Error: ${errorMessage}`);
      
      if (errorMessage.includes('already exists')) {
        console.log('\nTip: If you want to update an existing user, use the admin panel.');
      }
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nMake sure the dev server is running with: npm run dev');
  } finally {
    rl.close();
  }
}

// Check if running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  createUser();
}

export { createUser };