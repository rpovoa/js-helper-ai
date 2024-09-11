import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface AnswerBlockProps {
  answer: string
}

export function AnswerBlock({ answer }: AnswerBlockProps) {
  const renderContent = (text: string) => {
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      const language = match[1] || 'javascript'
      const code = match[2].trim()
      parts.push(
        <SyntaxHighlighter
          key={match.index}
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: '1rem 0',
            borderRadius: '0.5rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      )
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.map((part, index) => 
      typeof part === 'string' ? (
        <p key={index} className="mb-4 text-zinc-200">
          {part.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i !== part.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ) : part
    )
  }

  return (
    <Card className="mb-6 overflow-hidden bg-zinc-800 border-zinc-700">
      <CardHeader className="bg-zinc-900">
        <CardTitle className="text-zinc-100">Resposta</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {renderContent(answer)}
      </CardContent>
    </Card>
  )
}