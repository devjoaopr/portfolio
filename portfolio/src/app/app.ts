import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub, simpleLinkerd } from '@ng-icons/simple-icons';
import { lucideExternalLink, lucideMapPin, lucideDownload, lucideMail } from '@ng-icons/lucide';

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
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({
      simpleGithub,
      simpleLinkerd,
      lucideExternalLink,
      lucideMapPin,
      lucideDownload,
      lucideMail
    })
  ],
  templateUrl: './app.html'
})
export class AppComponent {
  isScrolled = false;
  isMenuOpen = false;
  year = new Date().getFullYear();

  skills = [
    'Angular', 'TypeScript', 'JavaScript', 'RxJS', 'Node.js',
    'HTML5', 'CSS/SCSS', 'Git', 'REST APIs', 'SQL', 'Docker', 'NgRx'
  ];

  projects: Project[] = [
    {
      title: 'Projeto Um',
      description: 'Descrição curta do projeto explicando o problema resolvido e as tecnologias usadas.',
      tags: ['Angular', 'TypeScript', 'Tailwind'],
      repoUrl: 'https://github.com/your-user/project-one',
      demoUrl: 'https://your-demo-link.com'
    },
    {
      title: 'Projeto Dois',
      description: 'Descrição curta do projeto explicando o problema resolvido e as tecnologias usadas.',
      tags: ['Node.js', 'Express', 'MongoDB'],
      repoUrl: 'https://github.com/your-user/project-two'
    },
    {
      title: 'Projeto Três',
      description: 'Descrição curta do projeto explicando o problema resolvido e as tecnologias usadas.',
      tags: ['Angular', 'NgRx', 'RxJS'],
      repoUrl: 'https://github.com/your-user/project-three',
      demoUrl: 'https://your-demo-link.com'
    }
  ];

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
}
