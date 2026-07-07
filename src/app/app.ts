import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { AfterViewInit } from '@angular/core';
import { LanguageService } from './services/language-service';
import {
  lucideExternalLink,
  lucideMapPin,
  lucideDownload,
  lucideMail,
  lucideLinkedin,
} from '@ng-icons/lucide';
import { flagBr, flagUs } from '@ng-icons/flag-icons';
import { TranslocoModule } from '@ngneat/transloco';


interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIcon, TranslocoModule],
  providers: [
    provideIcons({
      simpleGithub,
      lucideLinkedin,
      lucideExternalLink,
      lucideMapPin,
      lucideDownload,
      lucideMail,
      flagBr,
      flagUs
    }),
  ],
  templateUrl: './app.html',
})
export class AppComponent implements AfterViewInit {
  private languageService = inject(LanguageService);
  isScrolled = false;
  isMenuOpen = false;
  year = new Date().getFullYear();
  frases = [
    'desenvolvedor web',
    'TypeScript',
    'Angular',
    'Java',
    'Spring Boot',
    'Docker',
    'REST APIs',
  ];
  fraseIndex = 0;
  charIndex = 0;
  deleting = false;

  skills = [
    'Angular',
    'TypeScript',
    'HTML5',
    'CSS/SCSS',
    'Git',
    'REST APIs',
    'SQL',
    'Docker',
    'Java',
    'Spring Boot',
    'Python',
    'Flask',
  ];



  @ViewChild('texto') textoRef!: ElementRef<HTMLSpanElement>;

  ngAfterViewInit() {
    this.writing();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMenuOpen = false;
  }

  writing() {
    const currentPhrase = this.frases[this.fraseIndex];
    const element = this.textoRef.nativeElement;

    if (!this.deleting) {
      element.textContent = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === currentPhrase.length) {
        this.deleting = true;
        setTimeout(() => this.writing(), 1000);
        return;
      }
    } else {
      element.textContent = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.deleting = false;
        this.fraseIndex = (this.fraseIndex + 1) % this.frases.length;
      }
    }

    const speed = this.deleting ? 50 : 100;
    setTimeout(() => this.writing(), speed);
  }

  switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
