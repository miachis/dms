import type { Request, Response } from "express";
import supabase from "../../../../config/supabase.js";
import { prisma } from "../../../../lib/prisma.js";

export async function upload(req: Request, res: Response) {
  const id = Number(req.params.id);
  const file = req.file!;
  const fileName = `${Date.now()}-${file.originalname}`;
  const path = `files/${fileName}`;

  const { data, error } = await supabase.storage
    .from("DMs-profile-pictures")
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    return res.status(500).json({
      success: false,
      error: `Server error: ${error}`,
      response: { email: "", id: "", profilePicture: "", username: "" },
    });
  }

  const url = await getPublicURl(path);
  const user = await prisma.users.update({
    where: {
      id: id,
    },
    data: { profilePicture: url },
  });
  return res.status(200).json({
    success: true,
    response: user,
  });
}

function getPublicURl(filePath: string): string {
  const { data } = supabase.storage
    .from("DMs-profile-pictures")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
