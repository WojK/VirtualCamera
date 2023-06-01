# Virtual Camera

The project is my implementation of virtual camera as Computer Graphics project.

Project except virtual camera also includes implementation of Painter's Algorithm which is a solution to the visibility problem.

Virtual camera has implemented translations, rotations, zoom in and zoom out operations assigned to the fixed keyboard keys.

Objects in the scene are specified in the input file, where the coordinates of points in 3D space, lines and polygons are given.

## Demo

![ALT TEXT](https://github.com/WojK/VirtualCamera/gifs_readme/virtualcamera1.giv)
![ALT TEXT](https://github.com/WojK/VirtualCamera/gifs_readme/virtualcamera2.giv)

## Run Locally

Clone the project

```bash
  git clone https://github.com/WojK/VirtualCamera.git
```

Go to the project directory

```bash
  cd VirtualCamera
```

In project were used ES6 modules so local web server is needed to lunch program properly.
Node live server or Live Server as VS Code extension can be used.
Node live server example:

```bash
  npx live-server
```

After launching the program, you can select the sample input file "shapes1.txt" or "shapes2.txt", which are in the source files, to load the object into the scene.
