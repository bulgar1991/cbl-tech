import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorGlowComponent } from '@components/cursor-glow/cursor-glow.component';
import { PageLoaderComponent } from '@components/page-loader/page-loader.component';
import { BubblesComponent } from '@components/bubbles/bubbles.component';

@Component({
  imports: [CursorGlowComponent, PageLoaderComponent, BubblesComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
