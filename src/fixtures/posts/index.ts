import type { Post } from '~/types/post'
import { POST_AUTOR_UNICO } from './post-autor-unico'
import { POST_COMPLETO } from './post-completo'
import { POST_DOWNLOAD } from './post-download'
import { POST_LONGO_TOC } from './post-longo-toc'
import { POST_MULTIPLOS_AUTORES } from './post-multiplos-autores'
import { POST_PODCAST } from './post-podcast'
import { POST_VIDEO } from './post-video'

export const POSTS_BY_SCENARIO: Record<string, Post> = {
	'post-autor-unico': POST_AUTOR_UNICO,
	'post-multiplos-autores': POST_MULTIPLOS_AUTORES,
	'post-video': POST_VIDEO,
	'post-podcast': POST_PODCAST,
	'post-download': POST_DOWNLOAD,
	'post-longo-toc': POST_LONGO_TOC,
	'post-completo': POST_COMPLETO,
}

export const DEFAULT_SCENARIO = 'post-completo'

export function getPostByScenario(scenario: string | null): Post {
	if (scenario && scenario in POSTS_BY_SCENARIO) {
		return POSTS_BY_SCENARIO[scenario]
	}
	return POSTS_BY_SCENARIO[DEFAULT_SCENARIO]
}

export {
	POST_AUTOR_UNICO,
	POST_COMPLETO,
	POST_DOWNLOAD,
	POST_LONGO_TOC,
	POST_MULTIPLOS_AUTORES,
	POST_PODCAST,
	POST_VIDEO,
}
