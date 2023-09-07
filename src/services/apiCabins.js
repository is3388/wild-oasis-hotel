import supabase from './supabase';

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

const { error } = await supabase
.from('cabin')
.delete()
.eq('id', id)

if (error) {
  console.error(error);
  throw new Error('Cabins could not be deleted');
}
return null;
}