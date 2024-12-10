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
    <div className="w-full max-w-2xl space-y-4">
      <Textarea
        placeholder="Type or paste your script here..."
        className="min-h-[300px]"
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <Button
        className="w-full"
        size="lg"
        onClick={() => setIsStarted(true)}
        disabled={!script.trim()}
      >
        Start the teleprompter
      </Button>
    </div>
  )
}

