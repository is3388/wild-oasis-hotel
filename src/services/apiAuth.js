import supabase from './supabase';

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
  if (!session.session) return null; // no current user

  // more secure to redowload from supabase instead from session
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);
  return data?.user; // data contains user and session info
}
