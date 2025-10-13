# Animation Components

This folder contains reusable animation components that can be used across the entire application without conflicts.

## Components

### `TypewriterText`
- **Purpose**: Creates a typewriter effect for any text
- **Props**: 
  - `text`: String to be typed out
  - `speed`: Typing speed in milliseconds (default: 50)
  - `delay`: Initial delay before starting (default: 0)
  - `preserveHtml`: Whether to handle HTML tags (default: false)
  - `onComplete`: Callback when typing is finished
  - `style`, `className`: Styling options

### `ScannerAnimation`
- **Purpose**: Creates a scanning effect with scrolling lines and highlight bar
- **Props**:
  - `messages`: Array of strings to scroll through
  - `speed`: Scan speed in milliseconds (default: 600)
  - `totalScans`: Total number of scans before completion
  - `onScanComplete`: Callback on each scan with scan count
  - `style`, `className`: Styling options

### `BlinkingCursor`
- **Purpose**: Creates a blinking cursor effect
- **Props**:
  - `color`: Cursor color (default: '#fa6836')
  - `width`, `height`: Cursor dimensions
  - `speed`: Blink speed in seconds (default: 0.7)
  - `style`, `className`: Styling options

## Usage

```tsx
import { TypewriterText, ScannerAnimation, BlinkingCursor } from '../animations'

// Typewriter example
<TypewriterText 
  text="Hello World" 
  speed={50} 
  delay={100}
  onComplete={() => console.log('Done!')}
/>

// Scanner example
<ScannerAnimation 
  messages={['Line 1', 'Line 2', 'Line 3']}
  speed={600}
  onScanComplete={(count) => console.log(`Scan ${count} complete`)}
/>

// Blinking cursor example
<BlinkingCursor color="#fa6836" />
```

## Benefits

1. **Reusability**: Use same animations across different sections
2. **Consistency**: Uniform animation behavior throughout the app
3. **Maintainability**: Central location for animation logic
4. **No Conflicts**: Each component is self-contained
5. **Customizable**: Flexible props for different use cases

## Future Enhancements

- Add custom hooks for animation state management
- Create animation presets/configurations
- Add more complex animations (fade, slide, etc.)
- Performance optimizations with React.memo