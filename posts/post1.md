# How to Compile OpenEB v5.0.0 on M1 mac envirionment
2024-10-03

In October 2024, PROPHESEE published an updated version of the Metavision SDK with Open Modules. Here, I outline the steps to compile OpenEB v5.0.0 in an M1 MacBook Air environment.

1. Install dependencies
With Homebrew, you need to install the dependencies as normal installation on the different environment.

2. <GL/gl.h> to <OpenGL/gl.h>
To compile OpenEB v5.0.0 on my M1 MacBook Air, I needed to replace #include <GL/gl.h> with #include <OpenGL/gl.h> in all .cpp and .h files to ensure compatibility with macOS’s OpenGL library structure. I used the following command to make the change across all files:


```bash
find ./ -type f \( -name ".cpp" -o -name ".h" \) -exec sed -i '' 's/#include <GL\/gl\.h>/#include <OpenGL\/gl.h>/g' {} +
```

3. 画像表示テスト
![me](items/yasuhito_pic.jpeg "me")