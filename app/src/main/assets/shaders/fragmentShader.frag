#version 300 es

// The MIT License (MIT)
//
// Copyright (c) 2013 Dan Ginsburg, Budirijanto Purnomo
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

//
// Book:      OpenGL(R) ES 3.0 Programming Guide, 2nd Edition
// Authors:   Dan Ginsburg, Budirijanto Purnomo, Dave Shreiner, Aaftab Munshi
// ISBN-10:   0-321-93388-5
// ISBN-13:   978-0-321-93388-1
// Publisher: Addison-Wesley Professional
// URLs:      http://www.opengles-book.com
//            http://my.safaribooksonline.com/book/animation-and-3d/9780133440133
//

// Fragment Shader for MultiTexture
//

precision mediump float;                

#define EFFECT_SLOPLINE     0
#define EFFECT_SPLITLINE    1
#define EFFECT_INCRESSLINE  2
#define EFFECT_INCRESSLINE_V  3

in vec2 v_texCoord;                     

layout(location = 0) out vec4 outColor;                     

uniform float u_frameid;
uniform int u_effectid;
uniform sampler2D s_baseMap;            
uniform sampler2D s_lightMap;           

void main()                             
{                                       
	vec4 baseColor;                       
  	vec4 lightColor;                      
                                        
  	baseColor = texture( s_baseMap, v_texCoord ); 
  	lightColor = texture( s_lightMap, v_texCoord );

    if (u_effectid == EFFECT_SLOPLINE) {
        float ratio = (v_texCoord.y + v_texCoord.x) < u_frameid ? 1.0 : 0.0;
        outColor = mix(lightColor, baseColor, ratio);
        return;
    }

    if (u_effectid == EFFECT_SPLITLINE) {
        float ratio = abs(v_texCoord.x - 0.5) < u_frameid ? 0.0 : 1.0;
        outColor = mix(lightColor, baseColor, ratio);
        return;
    }

    if (u_effectid == EFFECT_INCRESSLINE) {
        float ratio = 1.0;
        if (v_texCoord.y < 0.3) {
            ratio = v_texCoord.x < u_frameid ? 0.0 : 1.0;
        } else if (v_texCoord.y > 0.7) {
            ratio = v_texCoord.x > 1.0 - u_frameid ? 0.0 : 1.0;
        }
        outColor = mix(lightColor, baseColor, ratio);
        return;
    }
    if (u_effectid == EFFECT_INCRESSLINE_V) {
        float ratio = 1.0;
        if (v_texCoord.y < 0.3) {
            ratio = 0.0;
        } else if (v_texCoord.y > 0.7) {
            ratio =  0.0;
        } else {
            ratio = v_texCoord.y > u_frameid ? 0.0 : 1.0;
        }
        outColor = mix(lightColor, baseColor, ratio);
        return;
    }
}
