
import { Storage } from "@google-cloud/storage";

export async function POST(req: Request) {
    const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: {
            client_email: process.env.GCP_CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY,
        },
    });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());

    await storage.bucket(process.env.GCS_BUCKET!)
        .file(file.name)
        .save(buffer);

    return Response.json({ success: true });
}
