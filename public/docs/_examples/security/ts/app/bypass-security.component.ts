// #docplaster
// #docregion
import { Component } from '@angular/core';
import { DomSanitizationService, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'bypass-security',
  templateUrl: 'app/bypass-security.component.html',
})
export class BypassSecurityComponent {
  urlDangereuse: string;
  UrlDeConfiance: SafeUrl;
  urlDangereuseDeVideo: string;
  urlDeVideo: SafeResourceUrl;

  // #docregion trust-url
  constructor(private sanitizer: DomSanitizationService) {
    // javascript : les URLs sont dangeureuses si elles sont contrôllées
    // par un attaquant.
    // Angular les sécurise lorsque les données sont liées mais il est possible
    // de dire explicitement à Angular de faire confiance à ces données :
    this.urlDangereuse = 'javascript:alert("Hi there")';
    this.UrlDeConfiance = sanitizer.bypassSecurityTrustUrl(this.urlDangereuse);
    // #enddocregion trust-url
    this.updateVideoUrl('PUBnlbjZFAI');
  }

  // #docregion trust-video-url
  updateVideoUrl(id: string) {
    // Ajouter un ID à une URL YouTuve n'est pas risqué.
    // Veillez à toujours construire des objets SafeValue aussi fidèles
    // que possible aux données entrées afin de faciliter
    // leur vérification.
    this.urlDangereuseDeVideo = 'https://www.youtube.com/embed/' + id;
    this.urlDeVideo =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDangereuseDeVideo);
  }
  // #enddocregion trust-video-url
}
