"use client";

// In a real app, this would include more sophisticated token generation
// with proper encryption and security measures
export function generateQRToken(memberId: string): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 8);
  
  // In a real application, you would include a proper digital signature
  // or encrypt this token with a server-side secret
  return `LEBARPRIV:${memberId}:${timestamp}:${randomPart}`;
}

// Function to validate a QR token (would be used on the scanning side)
export function validateQRToken(token: string): { 
  valid: boolean, 
  memberId?: string, 
  timestamp?: number 
} {
  try {
    const parts = token.split(':');
    
    if (parts.length !== 4 || parts[0] !== 'LEBARPRIV') {
      return { valid: false };
    }
    
    const memberId = parts[1];
    const timestamp = parseInt(parts[2]);
    
    // Check if the token is expired (30 seconds validity)
    const now = Date.now();
    if (now - timestamp > 30 * 1000) {
      return { valid: false };
    }
    
    return {
      valid: true,
      memberId,
      timestamp
    };
  } catch (error) {
    return { valid: false };
  }
}