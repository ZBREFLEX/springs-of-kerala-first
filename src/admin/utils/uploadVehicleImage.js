import { supabase } from "../../supabase/client";

export const uploadVehicleImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `vehicles/${fileName}`;

  const { error } = await supabase.storage
    .from("vehicle-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("vehicle-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
};
