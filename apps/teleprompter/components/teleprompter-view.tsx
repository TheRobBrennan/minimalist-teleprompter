"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Moon, Sun, AlignCenter, AlignLeft, Play, Pause, X, Type, Maximize2, GaugeCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        togglePlay()
      }
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [togglePlay])

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      if (isPlaying) {
        setScrollPosition((prevPosition) => prevPosition + speed / 60)
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isPlaying, speed])

  return (
    <TooltipProvider>
      <div className="fixed inset-0 bg-background text-foreground">
        <div
          className="h-full overflow-hidden"
          style={{
            paddingLeft: `${margin}%`,
            paddingRight: `${margin}%`,
          }}
        >
          <div
            style={{
              transform: `translateY(-${scrollPosition}px)`,
            }}
          >
            <p
              className={`py-[50vh] whitespace-pre-wrap transition-all ${
                alignment === "center" ? "text-center" : "text-left"
              }`}
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
            >
              {script}
            </p>
          </div>
        </div>

        {/* Controls overlay */}
        <Card className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-background/80 backdrop-blur-sm border-primary/20">
          <CardContent className="p-4 space-y-6">
            {/* Primary controls */}
            <div className="flex items-center justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-20 h-20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? 
                      <Pause className="h-8 w-8" /> : 
                      <Play className="h-8 w-8" />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Space bar to play/pause</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex gap-2">
                <Toggle
                  pressed={theme === "dark"}
                  onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
                  size="lg"
                >
                  {theme === "light" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Toggle>
                <Button variant="outline" size="lg" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Sliders and toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Type className="h-4 w-4" />
                  Font Size
                </div>
                <Slider
                  min={12}
                  max={72}
                  step={1}
                  value={[fontSize]}
                  onValueChange={([value]) => setFontSize(value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Maximize2 className="h-4 w-4" />
                  Margin
                </div>
                <Slider
                  min={0}
                  max={40}
                  step={1}
                  value={[margin]}
                  onValueChange={([value]) => setMargin(value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <GaugeCircle className="h-4 w-4" />
                  Speed
                </div>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[speed]}
                  onValueChange={([value]) => setSpeed(value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Alignment toggle */}
            <div className="flex justify-center gap-2">
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
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

