import bcrypt from 'bcryptjs';

// Helper to generate bcrypt hashes for testing
// Run this once to generate the correct hashes

async function generateHashes() {
  const password1 = 'Admin@123';
  const password2 = 'lash@123';

  const hash1 = await bcrypt.hash(password1, 10);
  const hash2 = await bcrypt.hash(password2, 10);

  console.log(`Admin@123 hash: ${hash1}`);
  console.log(`lash@123 hash: ${hash2}`);

  // Verify
  const valid1 = await bcrypt.compare(password1, hash1);
  const valid2 = await bcrypt.compare(password2, hash2);

  console.log(`Admin@123 valid: ${valid1}`);
  console.log(`lash@123 valid: ${valid2}`);
}

generateHashes().catch(console.error);
