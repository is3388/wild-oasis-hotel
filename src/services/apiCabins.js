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

// create and edit cabin in one function
export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  // image already uploaded
  const hasImagePath = newCabin.image.startsWith?.(supabaseUrl); // whether use the existing image for edit

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // name of the UI form fields match up with the column names in Supabase

  let query = supabase.from('cabin'); //break up the query into two parts
  // create cabin
  // redefine query
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // by default insert fn will not return a row immediately if you add .select().single() // take that element out of an array
  // edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  if (hasImagePath) return data;

  // if new cabin created successful, upload image to supabase bucket by specifying the path and cabin-images is bucket name
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // delete the new cabin if something goes wrong with the image upload
  if (storageError) {
    await supabase.from('cabin').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Image upload failed and new cabin can not be created');
  }

  return data;
}
