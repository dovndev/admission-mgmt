"use server";
import { Storage } from "@google-cloud/storage";

export async function uploadFile(formData: FormData) {
    const storage = new Storage({
        credentials: {
            client_email: process.env.GCP_CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY,
        },
    });

    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    await storage.bucket(process.env.GCS_BUCKET!)
        .file(fileName)
        .save(buffer);
    await storage.bucket(process.env.GCS_BUCKET!)
        .file(fileName)
        .makePublic();
    const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${fileName}`;
    return { success: true, url: publicUrl };
}
