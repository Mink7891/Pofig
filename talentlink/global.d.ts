// global.d.ts
import React from 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    className?: string; // Добавляем опциональное свойство className к ImgHTMLAttributes
  }


}
