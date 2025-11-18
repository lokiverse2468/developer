const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

(async () => {
  try {
    const { error } = await supabase.from('appointments').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      console.error('Database connection failed');
      process.exit(1);
    } else {
      console.log('Database connected successfully');
    }
  } catch (err) {
    console.error('Database connection failed');
    process.exit(1);
  }
})();

module.exports = supabase;

