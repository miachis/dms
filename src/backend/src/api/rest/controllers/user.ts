import type { Request, Response } from "express";

export async function PostUser(req: Request, res: Response) {
  console.log("posted");
}

export async function GetUser(req: Request, res: Response) {
  console.log("gotten");
}

export async function UpdateUser(req: Request, res: Response) {
  console.log("updated");
}

export async function DeleteUser(req: Request, res: Response) {
  console.log("deleted");
}
