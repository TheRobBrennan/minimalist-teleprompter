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
    <div className="fixed inset-0 flex flex-col bg-background">
      <div
        className="flex-grow overflow-hidden relative"
        style={{
          paddingLeft: `${margin}%`,
          paddingRight: `${margin}%`,
        }}
      >
        <div
          className="absolute w-full transition-transform duration-100"
          style={{
            transform: `translateY(-${scrollPosition}px)`,
          }}
        >
          <p
            className={`whitespace-pre-wrap py-[50vh] ${
              alignment === "center" ? "text-center" : "text-left"
            }`}
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.4' }}
          >
            {script}
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="flex items-center gap-2">
                <Toggle
                  pressed={alignment === "left"}
                  onPressedChange={() => setAlignment("left")}
                  variant="outline"
                >
                  <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle
                  pressed={alignment === "center"}
                  onPressedChange={() => setAlignment("center")}
                  variant="outline"
                >
                  <AlignCenter className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Toggle
                pressed={theme === "dark"}
                onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
                variant="outline"
              >
                {theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Toggle>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Font Size
                <span>{fontSize}px</span>
              </label>
              <Slider
                min={12}
                max={72}
                step={1}
                value={[fontSize]}
                onValueChange={([value]) => setFontSize(value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Margin
                <span>{margin}%</span>
              </label>
              <Slider
                min={0}
                max={40}
                step={1}
                value={[margin]}
                onValueChange={([value]) => setMargin(value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Speed
                <span>{speed}</span>
              </label>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[speed]}
                onValueChange={([value]) => setSpeed(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

