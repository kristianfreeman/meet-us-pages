#!/usr/bin/env node

import readline from 'readline';
import { promisify } from 'util';
import { execSync } from 'child_process';
import { hash } from 'bcryptjs';
import { nanoid } from 'nanoid';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = promisify(rl.question).bind(rl);

async function createAdminUser() {
  console.log('Create Admin User - Direct Database Method\n');
  
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
    
    console.log('\nCreating user...');
    
    // Generate IDs and hash password
    const userId = 'admin_' + nanoid(16);
    const accountId = 'acc_' + nanoid(16);
    const hashedPassword = await hash(password, 10);
    const timestamp = Date.now();
    
    // Create SQL commands
    const userSql = `INSERT INTO user (id, email, name, emailVerified, createdAt, updatedAt) VALUES ('${userId}', '${email}', '${name}', 1, ${timestamp}, ${timestamp});`;
    
    const accountSql = `INSERT INTO account (id, accountId, providerId, userId, password, createdAt, updatedAt) VALUES ('${accountId}', '${email}', 'credential', '${userId}', '${hashedPassword}', ${timestamp}, ${timestamp});`;
    
    try {
      // Execute the SQL commands using wrangler
      console.log('Inserting user record...');
      execSync(`wrangler d1 execute meet-us-db --local --command "${userSql}"`, { stdio: 'inherit' });
      
      console.log('Inserting account record...');
      execSync(`wrangler d1 execute meet-us-db --local --command "${accountSql}"`, { stdio: 'inherit' });
      
      console.log('\n✅ Admin user created successfully!');
      console.log(`\nYou can now login at http://localhost:5173/login with:`);
      console.log(`Email: ${email}`);
      console.log(`Password: [hidden]`);
      
    } catch (error) {
      console.error('\n❌ Error executing SQL commands:', error.message);
      console.log('\nTip: Make sure wrangler is installed and the database exists.');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Check if running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  createAdminUser();
}

export { createAdminUser };