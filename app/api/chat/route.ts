import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not set')
    }

    console.log('Sending request to Google Gemini API...')
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent(question)
    const response = await result.response
    const answer = response.text()

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('Google Gemini API error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request.', details: error.message }, { status: 500 })
  }
} 