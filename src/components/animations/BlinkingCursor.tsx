interface BlinkingCursorProps {
  color?: string
  width?: string
  height?: string
  speed?: number
  style?: React.CSSProperties
  className?: string
}

export default function BlinkingCursor({ 
  color = '#fa6836',
  width = '10px',
  height = '1.2rem',
  speed = 0.7,
  style = {},
  className = ''
}: BlinkingCursorProps) {
  return (
    <span 
      className={`blinking-cursor ${className}`}
      style={{
        display: 'inline-block',
        width,
        height,
        backgroundColor: color,
        marginLeft: '2px',
        verticalAlign: 'bottom',
        animation: `blink ${speed}s steps(1) infinite`,
        ...style
      }}
    />
  )
}
