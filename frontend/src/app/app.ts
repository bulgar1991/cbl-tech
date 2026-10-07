import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorGlowComponent } from '@components/cursor-glow/cursor-glow.component';
import { HeaderComponent } from '@components/header/header.component';
import { RainComponent } from '@components/rain/rain.component';

@Component({
  imports: [CursorGlowComponent, HeaderComponent, RainComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
