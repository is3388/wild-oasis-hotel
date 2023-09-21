import supabase from './supabase';

// after user submit the form and supabase successfully authenticates the user
// supabase redirects the user to supabase auth callback URL. 
// By defaults to the SITE_URL. modify the SITE_URL or add additional redirect URLs
// It is the policy which marks the user to be authenticated.
// The authenticated role is special in Supabase, it tells the API that this is an authenticated user 
// and will know to compare the JWT against any policies you've added to the requested resource.

export async function signup({fullName, email, password}) {
  const { data, error } = await supabase.auth.signUp({
    email, password, options: {
      data: { // anything about the user
        fullName,
        avatar: ''
      }
    }
  })
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // supabase stores JWT token in local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; // no session meaning no current user

  // more secure to redowload from supabase instead from session
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);
  return data?.user; // data contains user and session info
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
