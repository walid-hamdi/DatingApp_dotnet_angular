import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '../../model/member';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css',
})
export class PhotoEditorComponent {
  @Input() member?: Member;

  deletePhoto(i: number) {}
}
