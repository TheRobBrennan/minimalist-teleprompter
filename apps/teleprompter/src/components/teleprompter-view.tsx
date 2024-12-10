"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "next-themes"
import { Moon, Sun, AlignCenter, AlignLeft, Play, Pause } from 'lucide-react'

interface TeleprompterViewProps {
  script: string
  onClose: () => void
}

export function TeleprompterView({ script, onClose }: TeleprompterViewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [fontSize, setFontSize] = useState(36)
  const [margin, setMargin] = useState(20)
  const [speed, setSpeed] = useState(50)
  const [alignment, setAlignment] = useState<"center" | "left">("center")
  const { theme, setTheme } = useTheme()

  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (isPlaying) {
        setScrollPosition((prevPosition) => prevPosition + speed / 60)
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, speed])

  return (
    <div className="fixed inset-0 flex flex-col">
      <div
        className="flex-grow overflow-hidden"
        style={{
          paddingLeft: `${margin}%`,
          paddingRight: `${margin}%`,
        }}
      >
        <div
          className="h-full overflow-hidden"
          style={{
            transform: `translateY(-${scrollPosition}px)`,
          }}
        >
          <p
            className={`whitespace-pre-wrap ${
              alignment === "center" ? "text-center" : "text-left"
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {script}
          </p>
        </div>
      </div>
      <div className="bg-background/80 backdrop-blur-sm p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Font Size</label>
            <Slider
              min={12}
              max={72}
              step={1}
              value={[fontSize]}
              onValueChange={([value]) => setFontSize(value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Margin</label>
            <Slider
              min={0}
              max={40}
              step={1}
              value={[margin]}
              onValueChange={([value]) => setMargin(value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Speed</label>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[speed]}
              onValueChange={([value]) => setSpeed(value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Alignment</label>
            <div className="flex space-x-2">
              <Toggle
                pressed={alignment === "left"}
                onPressedChange={() => setAlignment("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={alignment === "center"}
                onPressedChange={() => setAlignment("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Toggle
            pressed={theme === "dark"}
            onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Toggle>
        </div>
      </div>
    </div>
  )
}

