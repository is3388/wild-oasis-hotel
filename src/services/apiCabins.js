import supabase from './supabase';

export async function getCabins() {
  // the code coming from supabase API Docs -> Tables & Views -> cabins and look for all rows
  let { data, error } = await supabase.from('cabin').select('*'); // return a promise

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}
