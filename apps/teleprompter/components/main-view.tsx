"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { TeleprompterView } from "./teleprompter-view"
import { PlayIcon } from 'lucide-react'

export function MainView() {
  const [script, setScript] = useState("")
  const [isStarted, setIsStarted] = useState(false)

  if (isStarted) {
    return <TeleprompterView script={script} onClose={() => setIsStarted(false)} />
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Professional Teleprompter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Enter or paste your script here..."
              className="min-h-[400px] p-6 text-lg resize-none bg-background/50 backdrop-blur-sm"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
            <div className="absolute inset-0 pointer-events-none border rounded-md border-primary/20 border-dashed" />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full text-lg h-16"
            onClick={() => setIsStarted(true)}
            disabled={!script.trim()}
          >
            <PlayIcon className="mr-2 h-5 w-5" />
            Start Teleprompter
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

