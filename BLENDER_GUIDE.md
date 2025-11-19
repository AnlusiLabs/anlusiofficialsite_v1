# Blender Cube Creation Guide

## 🎯 **Goal**
Create an enhanced animated cube in Blender to replace the basic Three.js cube with more sophisticated geometry, materials, and animations.

## 📋 **Blender Setup Steps**

### 1. **Create Enhanced Cube Geometry**
```
1. Delete default cube (Select cube → Delete)
2. Add Cube (Shift+A → Mesh → Cube)
3. Enter Edit Mode (Tab)
4. Add Loop Cuts (Ctrl+R) - 2-3 cuts on each axis for more geometry
5. Add Bevel Modifier for rounded edges:
   - Properties Panel → Modifier Properties → Add Modifier → Bevel
   - Amount: 0.05
   - Segments: 3
```

### 2. **Enhanced Materials**
```
1. Switch to Shading workspace
2. Select cube → New Material
3. Set up Principled BSDF:
   - Base Color: #fd713a (orange)
   - Metallic: 0.3
   - Roughness: 0.5
   - Add your cube.jpg texture to Base Color
4. Add additional material nodes:
   - Normal Map for surface detail
   - Emission for glowing edges
```

### 3. **Animation Keyframes**
```
1. Go to Animation workspace
2. Set frame 1, insert keyframe for rotation (I → Rotation)
3. Go to frame 120
4. Rotate cube 360° on Y-axis (R → Y → 360)
5. Insert keyframe (I → Rotation)
6. In Graph Editor, set interpolation to Linear
7. Add floating animation:
   - Frame 1: Z location = 0
   - Frame 60: Z location = 0.2
   - Frame 120: Z location = 0
   - Set interpolation to Sine for smooth bounce
```

### 4. **Advanced Features** (Optional)
```
- Add Subdivision Surface modifier for smoother geometry
- Create particle systems for magical effects
- Add multiple materials for different faces
- Create morphing animations using shape keys
- Add environmental reflections
```

## 📤 **Export Settings**

### **GLTF 2.0 Export (.glb)**
```
1. File → Export → glTF 2.0
2. Settings:
   - Format: glTF Binary (.glb)
   - Include: Selected Objects (or Visible Objects)
   - Transform: +Y Up
   - Geometry: Apply Modifiers ✓
   - Materials: Export ✓
   - Animations: Export ✓
   - Optimize: Optimize for Size ✓
3. Save as: cube.glb
4. Place in: /public/models/cube.glb
```

## 🎨 **Creative Ideas for Enhancement**

### **Geometry Variations**
- Beveled edges for modern look
- Wireframe overlay effect
- Subdivided surface for organic feel
- Multiple cubes in formation

### **Material Effects**
- Holographic/iridescent materials
- Glowing edges with emission
- Animated UV scrolling textures
- Environment reflection mapping

### **Animation Concepts**
- Slow rotation with gentle bounce
- Morphing between different shapes
- Pulsing scale with heartbeat rhythm
- Particle trails following movement
- Exploding/reassembling animation

### **Interactive Elements**
- Different animations triggered by user interaction
- Color changes based on audio
- Speed variations based on scroll position
- Multiple animation states (idle, hover, active)

## 🔧 **Technical Notes**

- Keep polygon count reasonable (< 10k triangles) for web performance
- Use power-of-2 texture sizes (512x512, 1024x1024)
- Bake complex materials into textures if needed
- Test animations loop seamlessly
- Export separate files for different animation states if needed

## 📁 **File Organization**
```
/public/models/
├── cube.glb (main model)
├── cube-hover.glb (hover state)
├── cube-idle.glb (idle state)
└── textures/
    ├── cube_diffuse.jpg
    ├── cube_normal.jpg
    └── cube_roughness.jpg
```

## 🚀 **Integration**
Once you export your Blender model as `cube.glb` and place it in `/public/models/`, the React component will automatically:
1. Try to load your Blender model first
2. Fall back to the basic cube if model not found
3. Play any animations you created in Blender
4. Apply enhanced lighting and materials

The system supports multiple models, so you can create variations for different states or interactions!