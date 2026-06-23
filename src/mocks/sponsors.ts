export interface ISponsor {
  id: string
  name: string
  logoSrc: string // path de imagem ou URL placeholder
  description: string // descrição institucional completa
  tagline: string // frase curta (exibida no card)
  href: string // URL externa do patrocinador
  category?: string // ex: "Tecnologia", "Embalagem"
}

export const sponsors: ISponsor[] = [
  {
    id: 'tetrapak',
    name: 'Tetra Pak',
    logoSrc: 'https://placehold.co/200x80/e2e8f0/475569?text=Tetra+Pak',
    tagline: 'Protecting what\'s good',
    description:
      'A Tetra Pak é líder global em soluções de processamento e envase de alimentos líquidos. Com décadas de experiência no setor de alimentos e bebidas, a empresa oferece tecnologia de ponta para garantir segurança alimentar, sustentabilidade e eficiência operacional em toda a cadeia produtiva.',
    href: 'https://www.tetrapak.com/pt-br',
    category: 'Embalagem',
  },
  {
    id: 'ifood',
    name: 'iFood',
    logoSrc: 'https://placehold.co/200x80/e2e8f0/475569?text=iFood',
    tagline: 'Entregar felicidade é o que nos move',
    description:
      'O iFood é a maior plataforma de delivery de alimentos da América Latina, conectando milhões de consumidores a restaurantes e estabelecimentos. A empresa investe continuamente em inovação tecnológica para o mercado de food service.',
    href: 'https://institucional.ifood.com.br',
    category: 'Food Service',
  },
  {
    id: 'brf',
    name: 'BRF',
    logoSrc: 'https://placehold.co/200x80/e2e8f0/475569?text=BRF',
    tagline: 'Conectando o mundo por meio da alimentação',
    description:
      'A BRF é uma das maiores produtoras e exportadoras de alimentos do mundo, com portfólio de marcas como Sadia e Perdigão. Presente em mais de 140 países, a empresa combina tradição e inovação para atender às demandas de consumidores globais.',
    href: 'https://www.brf-global.com/brasil',
    category: 'Proteína Animal',
  },
  {
    id: 'ambev',
    name: 'Ambev',
    logoSrc: 'https://placehold.co/200x80/e2e8f0/475569?text=Ambev',
    tagline: 'Sonhamos grande, vivemos nossos valores',
    description:
      'A Ambev é uma das maiores empresas de bebidas do mundo, produtora de marcas icônicas como Brahma, Skol e Antarctica. A empresa aposta em sustentabilidade e inovação para criar o futuro das bebidas no Brasil e no mundo.',
    href: 'https://www.ambev.com.br',
    category: 'Bebidas',
  },
]
