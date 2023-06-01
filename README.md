# Virtual Camera

The project is my implementation of virtual camera as Computer Graphics project.

Project except virtual camera also includes implementation of Painter's Algorithm which is a solution to the visibility problem.

Virtual camera has implemented translations, rotations, zoom in and zoom out operations assigned to the fixed keyboard keys.

Objects in the scene are specified in the input file, where the coordinates of points in 3D space, lines and polygons are given.

## Demo

![virtualcamera1](https://github.com/WojK/VirtualCamera/assets/106305960/f8b3daed-d535-4ea9-922b-45bbb75acc7c)
![virtualcamera2](https://github.com/WojK/VirtualCamera/assets/106305960/ced6238c-6e0d-415d-b180-32ad7ae362b3)

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
