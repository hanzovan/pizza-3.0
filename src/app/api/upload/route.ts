import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import uniqid from "uniqid";

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const fileEntry = data.get('file');
    if (fileEntry && fileEntry instanceof File) {
        const file = data.get('file');
        const s3Client = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY ?? "AWS_ACCESS_KEY not found",
                secretAccessKey: process.env.AWS_SECRET_KEY ?? "AWS_SECRET_KEY not found"
            }
        });

        const ext = fileEntry.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;

        const reader = fileEntry.stream().getReader();

        const chunks: Uint8Array[] = [];
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        const buffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
        const bucket = 'pizza-3.0';

        // send the image to aws and store there
        await s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: 'public-read',
            ContentType: fileEntry.type,
            Body: buffer
        }))

        // send the link from aws to client site, may need to try one upload, go to aws website to get the correct url
        const link = 'https://s3.us-east-1.amazonaws.com/' + bucket + '/' + newFileName
        return Response.json(link)
    }
    return Response.json(true);
}