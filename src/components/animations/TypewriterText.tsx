import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  style?: React.CSSProperties
  className?: string
  preserveHtml?: boolean
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  onComplete,
  style = {},
  className = '',
  preserveHtml = false
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let i = 0
    let buffer = ''
    
    const typeNextChar = () => {
      if (i < text.length) {
        if (preserveHtml && text[i] === '<') {
          // Handle HTML tags - add entire tag at once
          const tagEnd = text.indexOf('>', i)
          if (tagEnd !== -1) {
            buffer += text.substring(i, tagEnd + 1)
            i = tagEnd + 1
          } else {
            buffer += text[i]
            i++
          }
        } else {
          // Add regular character
          buffer += text[i]
          i++
        }
        
        setDisplayText(buffer)
        setTimeout(typeNextChar, speed)
      } else {
        onComplete?.()
      }
    }
    
    // Reset state when text changes
    setDisplayText('')
    
    // Start typing with delay
    const timeout = setTimeout(() => {
      typeNextChar()
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [text, speed, delay, preserveHtml, onComplete])

  if (preserveHtml) {
    return (
      <div 
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
    )
  }

  return (
    <div className={className} style={style}>
      {displayText}
    </div>
  )
}
