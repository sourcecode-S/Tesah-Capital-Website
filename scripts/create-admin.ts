import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('Creating admin user...')

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser(
      {
        email: 'admin@tesahcapital.com',
        password: 'Tesah2024Secure!Admin',
        user_metadata: {
          first_name: 'Admin',
          last_name: 'Account',
          role: 'admin',
        },
        email_confirm: true,
      }
    )

    if (authError) {
      // If user already exists, try to get the ID
      if (authError.message.includes('already exists')) {
        console.log('Admin user already exists. Skipping creation.')
        return
      }
      throw authError
    }

    console.log('Admin user created successfully!')
    console.log('Email: admin@tesahcapital.com')
    console.log('Password: Tesah2024Secure!Admin')
    console.log('User ID:', authData.user?.id)
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
