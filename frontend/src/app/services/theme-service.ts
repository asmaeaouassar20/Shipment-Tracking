import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  initTheme() {
    const savedTheme = localStorage.getItem('theme');

    const theme = savedTheme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      );
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const current = document.documentElement.dataset['theme'];
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

}
