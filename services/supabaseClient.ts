
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dnnrxbahljljwiofncgv.supabase.co';
const supabaseAnonKey = 'sb_publishable_P27XyNLk4o2tVihZN7uuBw_Be_LECyD';

/**
 * Supabase Client for Autonexgen
 * 
 * Required tables in Supabase:
 * 
 * 1. inquiries:
 *    - id (int8, primary key, auto-inc)
 *    - created_at (timestamptz, default: now())
 *    - name (text) -> Full Name
 *    - email (text) -> Work Email
 *    - phone (text) -> Phone Number
 *    - message (text) -> Project Details
 * 
 * 2. reviews:
 *    - id (int8, primary key, auto-inc)
 *    - created_at (timestamptz, default: now())
 *    - name (text)
 *    - role (text)
 *    - content (text)
 *    - rating (int2)
 *    - is_verified (bool, default: false)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
