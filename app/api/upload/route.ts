export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file received' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'wedding-saas', resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as UploadApiResponse)
        }
      )
      uploadStream.end(buffer)
    })

    return NextResponse.json({ 
      success: true, 
      filename: file.name,
      url: uploadResponse.secure_url 
    })
  } catch (error: any) {
    console.error('Upload error (full object):', error)
    return NextResponse.json(
      { error: error.message || error.name || 'Upload failed due to unknown error' },
      { status: 500 }
    )
  }
}
