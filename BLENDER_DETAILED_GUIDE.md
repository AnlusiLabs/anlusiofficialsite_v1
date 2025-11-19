# 🎯 Step-by-Step Blender Cube Creation

## **Part 1: Setting Up Blender**

### 1. **Open Blender & Clean Scene**
```
1. Open Blender (2.8+ recommended)
2. Delete default cube: Select cube → Press X → Delete → Confirm
3. Delete default light: Select light → X → Delete
4. Keep default camera for now
```

### 2. **Add Enhanced Cube**
```
1. Shift + A → Mesh → Cube
2. Press Tab to enter Edit Mode
3. Press A to select all faces
4. Right-click → Subdivide (do this 2 times for more geometry)
5. Press Tab to exit Edit Mode
```

## **Part 2: Create Beveled Edges**

### 1. **Add Bevel Modifier**
```
1. Select your cube
2. Go to Properties Panel (right side) → Modifier Properties (wrench icon)
3. Add Modifier → Bevel
4. Set Amount: 0.05
5. Set Segments: 3
6. Check "Limit Method" → Angle
7. Set Angle: 30 degrees
```

### 2. **Apply Modifier**
```
1. In the Bevel modifier, click the dropdown arrow
2. Click "Apply" to make the bevel permanent
```

## **Part 3: Materials & Textures**

### 1. **Switch to Shading Workspace**
```
1. Click "Shading" tab at the top of Blender
2. Make sure your cube is selected
3. Click "New" in the material properties to create a new material
```

### 2. **Set Base Material**
```
1. In the Shader Editor (bottom panel), you'll see a Principled BSDF node
2. Set Base Color: Click the color square → RGB: R:0.992, G:0.443, B:0.227 (#fd713a)
3. Set Metallic: 0.3
4. Set Roughness: 0.5
5. Set Specular: 0.8
```

### 3. **Add Texture (cube.jpg)**
```
1. Shift + A in Shader Editor → Texture → Image Texture
2. Click "Open" in the Image Texture node
3. Navigate to your cube.jpg file and select it
4. Connect Image Texture "Color" output to Principled BSDF "Base Color" input
5. Add UV Mapping: Shift + A → Vector → Mapping
6. Add Texture Coordinate: Shift + A → Input → Texture Coordinate
7. Connect: Texture Coordinate "UV" → Mapping "Vector" → Image Texture "Vector"
```

### 4. **Enhanced Material Settings**
```
1. Set Mapping node:
   - Scale X: 1.0, Y: 1.0, Z: 1.0
2. In Principled BSDF:
   - Transmission: 0.0
   - IOR: 1.45
   - Alpha: 1.0
   - Emission Strength: 0.1 (subtle glow)
```

## **Part 4: Create Animations**

### 1. **Switch to Animation Workspace**
```
1. Click "Animation" tab at the top
2. Set timeline to frame 1 (bottom of screen)
3. Make sure your cube is selected
```

### 2. **Rotation Animation**
```
1. Frame 1:
   - Press I → Rotation (to insert rotation keyframe)
   
2. Frame 120:
   - Press R → Y → 360 → Enter (rotate 360° on Y-axis)
   - Press I → Rotation (insert keyframe)
   
3. Make it loop smoothly:
   - In Graph Editor (top panel), select all keyframes (A)
   - Go to Key → Interpolation Mode → Linear
   - Set Extrapolation: Channel → Extrapolation Mode → Linear
```

### 3. **Floating Animation**
```
1. Frame 1:
   - Make sure Z location is 0
   - Press I → Location (insert location keyframe)
   
2. Frame 60:
   - Press G → Z → 0.2 → Enter (move up 0.2 units)
   - Press I → Location
   
3. Frame 120:
   - Press G → Z → -0.2 → Enter (back to 0)
   - Press I → Location
   
4. In Graph Editor:
   - Select Z Location curve
   - Key → Interpolation Mode → Bezier
   - Adjust handles for smooth sine wave motion
```

### 4. **Timeline Settings**
```
1. Set End Frame to 120 (in timeline)
2. Test animation: Press Spacebar to play
3. Adjust timing if needed
```

## **Part 5: Lighting Setup**

### 1. **Add Better Lighting**
```
1. Shift + A → Light → Sun
2. Position above and to the side of cube
3. Set Energy: 5.0
4. Set Angle: 0.5

5. Add Fill Light:
   - Shift + A → Light → Area
   - Position opposite side
   - Set Energy: 2.0
   - Scale up (S → 3)
```

### 2. **Environment Lighting**
```
1. Go to World Properties (globe icon)
2. Surface → Environment Texture
3. Use HDRI if you have one, or set Color to light blue
4. Set Strength: 0.3
```

## **Part 6: Export Settings**

### 1. **Prepare for Export**
```
1. Select your cube
2. File → Export → glTF 2.0 (.glb)
```

### 2. **Export Configuration**
```
Transform:
- ✓ +Y Up

Geometry:
- ✓ Apply Modifiers
- ✓ UVs
- ✓ Normals
- ✓ Tangents
- Vertices: Color Attributes

Materials:
- ✓ Export
- Images: Automatic

Animation:
- ✓ Export
- ✓ Shape Keys
- ✓ Skinning
- ✓ Bake Skins
- Animation Mode: "Actions"

Optimize:
- ✓ Optimize for Size
```

### 3. **Save File**
```
1. Navigate to: your-project/public/models/
2. Filename: cube.glb
3. Click "Export glTF 2.0"
```

## **Part 7: Test in Browser**

### 1. **Verify Files**
```
Check that you have:
- /public/models/cube.glb
- /public/cube.jpg (texture)
```

### 2. **Test Loading**
```
1. Open your React app
2. Check browser console for messages:
   - "Blender model loaded successfully"
   - "Loaded X animations from Blender"
```

## **🎨 Advanced Enhancements** (Optional)

### **Particle Effects**
```
1. Add Empty object at cube center
2. Add Particle System
3. Set Type: Hair → Emitter
4. Emission: Start: 1, End: 120, Number: 100
5. Physics: Gravity: -0.1
```

### **Multiple Materials**
```
1. Enter Edit Mode (Tab)
2. Select faces for different materials
3. Create new material slots
4. Assign different colors/textures per face
```

### **Shape Key Animation**
```
1. Add Shape Key (Object Data Properties)
2. Add Key → Basis
3. Add Key → Key 1
4. Edit shape in Edit Mode
5. Animate the Value slider
```

## **🔧 Troubleshooting**

### **Common Issues:**
- **Model too big/small**: Scale in Blender before export
- **Animation not playing**: Check timeline settings and keyframes
- **Texture not loading**: Ensure cube.jpg is in /public/ folder
- **Model not appearing**: Check browser console for errors

### **Performance Tips:**
- Keep polygon count under 5,000 triangles
- Use 512x512 or 1024x1024 textures max
- Limit to 2-3 material slots
- Keep animation under 120 frames

Ready to create your enhanced cube? Let me know if you need clarification on any of these steps!