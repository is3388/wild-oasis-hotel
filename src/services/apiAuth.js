import supabase, { supabaseUrl } from './supabase';

// after user submit the form and supabase successfully authenticates the user
// supabase redirects the user to supabase auth callback URL  which is /dashboard or /.
// By defaults to the SITE_URL. modify the SITE_URL or add additional redirect URLs
// It is the policy which marks the user to be authenticated.
// The authenticated role is special in Supabase, it tells the API that this is an authenticated user
// and will know to compare the JWT against any policies you've added to the requested resource.

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // anything about the user
        fullName,
        avatar: '',
      },
    },
  });
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

  /*const { data, error } = await supabase
  .from('users')
  .select('id, email, fullName, avatar') // Include fullName and any other custom fields
  .eq('id', session.user.id)
  .single(); */
  
  if (error) throw new Error(error.message);
  return data?.user; // data contains user and session info  
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // update either password or fullName not both because they come from different forms
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData); // update the authenticated user
  if (error) throw new Error(error.message);
  if (!avatar) return data; // no avatar image to upload

  // upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // supabase has storage bucket and bucket name called avatars
  // use upload method to pass in filename and the image
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  // update the avatar in the user by adding the URL to the avatar image
  const { data: updatedUser, error:updateImgError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }
  })

  if (updateImgError) throw new Error(updateImgError.message);
  return updatedUser;
}
