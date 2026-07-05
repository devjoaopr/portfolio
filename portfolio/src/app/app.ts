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
  apagando = false;

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

  projects: Project[] = [
    {
      title: 'Projeto Um',
      description:
        'Descrição curta do projeto explicando o problema resolvido e as tecnologias usadas.',
      tags: ['Angular', 'TypeScript', 'Tailwind'],
      repoUrl: 'https://github.com/your-user/project-one',
      demoUrl: 'https://your-demo-link.com',
    },
    {
      title: 'Projeto Dois',
      description:
        'Descrição curta do projeto explicando o problema resolvido e as tecnologias usadas.',
      tags: ['Node.js', 'Express', 'MongoDB'],
      repoUrl: 'https://github.com/your-user/project-two',
    },
    {
      title: 'Projeto Três',
      description:
        'Descrição curta do projeto explicando o problema resolvido e as tecnologias usadas.',
      tags: ['Angular', 'NgRx', 'RxJS'],
      repoUrl: 'https://github.com/your-user/project-three',
      demoUrl: 'https://your-demo-link.com',
    },
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

    if (!this.apagando) {
      element.textContent = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === currentPhrase.length) {
        this.apagando = true;
        setTimeout(() => this.writing(), 1000);
        return;
      }
    } else {
      element.textContent = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.apagando = false;
        this.fraseIndex = (this.fraseIndex + 1) % this.frases.length;
      }
    }

    const velocidade = this.apagando ? 50 : 100;
    setTimeout(() => this.writing(), velocidade);
  }

  switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
