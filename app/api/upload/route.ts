import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Support both 'file' (single) and 'files' (multiple)
    const files = formData.getAll("files").length > 0 
      ? (formData.getAll("files") as File[])
      : (formData.getAll("file") as File[]);
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded" }, 
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Create uploads folder if not exists
    await mkdir(uploadDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Unique filename
      const uniqueName = `${Date.now()}-${Math.random()
        .toString(36).substring(2, 7)}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, uniqueName);
      
      await writeFile(filePath, buffer);
      uploadedUrls.push(`/uploads/${uniqueName}`);
    }

    return NextResponse.json({ 
      success: true, 
      urls: uploadedUrls,
      url: uploadedUrls[0] // Return single url for compatibility
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: String(error) }, 
      { status: 500 }
    );
  }
}

// Next.js App Router config for body parser is handled differently, 
// but we'll include it if the user wants it (though for App Router it's mostly for pages)
export const config = {
  api: {
    bodyParser: false,
  },
};
