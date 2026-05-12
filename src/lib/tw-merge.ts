import { extendTailwindMerge } from 'tailwind-merge'

/**
 * `twMerge` configurado para conhecer os tokens custom do `@theme` em
 * `src/index.css`. Sem isso, classes como `text-label-sm`, `text-body-md`
 * ou `text-mint` caem no grupo `text-color` por engano e são removidas
 * quando combinadas com outra `text-*` no mesmo merge — fazendo o
 * elemento herdar o 16px do body.
 *
 * Sempre importar daqui: `import { twMerge } from '~/lib/tw-merge'`.
 */

const FONT_SIZES = [
	'display-lg', 'display-md', 'display-sm',
	'headline-lg', 'headline-md', 'headline-sm',
	'title-xl', 'title-lg', 'title-md', 'title-sm',
	'body-xl', 'body-lg', 'body-md', 'body-sm',
	'label-lg', 'label-md', 'label-sm',
]

const CUSTOM_COLORS = ['coral', 'mint', 'mint-light', 'saffron', 'lavander']

export const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [{ text: FONT_SIZES }],
			'text-color': [{ text: CUSTOM_COLORS }],
			'bg-color': [{ bg: CUSTOM_COLORS }],
			'border-color': [{ border: CUSTOM_COLORS }],
			'fill': [{ fill: CUSTOM_COLORS }],
			'stroke': [{ stroke: CUSTOM_COLORS }],
		},
	},
})
