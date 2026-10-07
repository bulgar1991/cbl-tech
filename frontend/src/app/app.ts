import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorGlowComponent } from '@components/cursor-glow/cursor-glow.component';
import { MatrixRainComponent } from '@components/matrix-rain/matrix-rain.component';
import { PageLoaderComponent } from '@components/page-loader/page-loader.component';
import { RainComponent } from '@components/rain/rain.component';

@Component({
  imports: [
    CursorGlowComponent,
    MatrixRainComponent,
    PageLoaderComponent,
    RainComponent,
    RouterOutlet,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
