/**
 * interactions.js — entry point para todos os módulos de comportamento
 *
 * Cada módulo exporta init() e é inicializado no DOMContentLoaded.
 * Módulos usam event delegation — não dependem de timing de render.
 *
 * USO:
 *   <script type="module" src="/src/assets/js/interactions.js"></script>
 *
 * ARQUITETURA:
 *   - Cada módulo é independente (pode ser carregado sozinho)
 *   - Comunicação via data-attributes no HTML (data-component, data-trigger, etc)
 *   - Estado via classes CSS (is-open, is-expanded, is-active)
 *   - Acessibilidade via aria-expanded, aria-hidden, aria-current
 *   - Zero dependências externas
 */

import { init as headerInforma } from './components/header-informa.js';
import { init as searchBar } from './components/search-bar.js';
import { init as dropdownMenu } from './components/dropdown-menu.js';
import { init as sideMenu } from './components/side-menu.js';
import { init as resumoBox } from './components/resumo-box.js';
import { init as bottomSheet } from './components/bottom-sheet.js';
import { init as authorsCarousel } from './components/authors-carousel.js';
import { init as headerAuthor } from './components/header-author.js';
import { init as cadastroFlow } from './components/cadastro-flow.js';
import { init as newsletterBulk } from './components/newsletter-bulk.js';
import { init as headerSticky } from './components/header-sticky.js';
import { init as cepAutofill } from './components/cep-autofill.js';

const modules = [
  headerInforma,
  searchBar,
  dropdownMenu,
  sideMenu,
  resumoBox,
  bottomSheet,
  authorsCarousel,
  headerAuthor,
  cadastroFlow,
  newsletterBulk,
  headerSticky,
  cepAutofill,
];

document.addEventListener('DOMContentLoaded', () => {
  modules.forEach((init) => {
    try {
      init();
    } catch (err) {
      console.error('[interactions]', err);
    }
  });
});
