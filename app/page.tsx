'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AnswerBlock } from '@/components/AnswerBlock'

export default function GeminiApp() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setAnswer('')
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.details || 'Failed to get answer')
      }
      if (data.error) {
        throw new Error(data.error)
      }
      setAnswer(data.answer)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`)
      } else {
        setError('An unknown error occurred')
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const usefulLinks = [
    { title: 'Apresentação', url: 'https://ai.google/' },
    { title: 'Top 12 JavaScript Concepts to Know Before Learning React', url: 'https://www.geeksforgeeks.org/top-javascript-concepts-to-know-before-learning-react/' },
    { title: 'Github @rpovoa', url: 'https://github.com/rpovoa' },
    { title: 'Modern JavaScript tutorial', url: 'https://www.modernjs.com' },
  
  ]

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Dia do programador 2024 - Fidelidade</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Qual a sua dúvida ?</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pode me perguntar sobre qualquer tópico da apresentação..."
              className="w-full"
            />
            <Button type="submit" disabled={isLoading || !question}>
              {isLoading ? 'Pensando...' : 'Perguntar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {answer && <AnswerBlock answer={answer} />}

      <Card>
        <CardHeader>
          <CardTitle>Links úteis</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {usefulLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}