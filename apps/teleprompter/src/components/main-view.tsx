"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TeleprompterView } from "./teleprompter-view"

export function MainView() {
  const [script, setScript] = useState("")
  const [isStarted, setIsStarted] = useState(false)

  if (isStarted) {
    return <TeleprompterView script={script} onClose={() => setIsStarted(false)} />
  }

  return (
    <div className="w-full max-w-4xl space-y-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Teleprompter</h1>
      <Textarea
        placeholder="Type or paste your script here..."
        className="min-h-[50vh] text-lg p-6 resize-none"
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <Button
        className="w-full max-w-md mx-auto block"
        size="lg"
        onClick={() => setIsStarted(true)}
        disabled={!script.trim()}
      >
        Start the teleprompter
      </Button>
    </div>
  )
}

