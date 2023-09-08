import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
  // the code coming from supabase API Docs -> Tables & Views -> cabins and look for all rows
  const { data, error } = await supabase.from('cabin').select('*'); // return a promise

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabin').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
  return null;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // name of the UI form fields match up with the column names in Supabase
  const { data, error } = await supabase
    .from('cabin')
    .insert([{...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // if new cabin created successful, upload image to supabase bucket by specifying the path and cabin-images is bucket name
  const {error: storageError} = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)
 
  // delete the new cabin if something goes wrong with the image upload
  if(storageError) {
    await supabase.from('cabin').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Image upload failed and new cabin can not be created');
  }
  
  return data;
}
