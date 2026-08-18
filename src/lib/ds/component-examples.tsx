import type { ReactElement } from 'react'
import { Categoria } from '~/components/categoria'

/**
 * Uma instância representativa por componente documentado — não catálogo de
 * variantes (isso é papel do Storybook). Cresce junto com docs/componentes/.
 */
export const COMPONENT_EXAMPLES: Record<string, () => ReactElement> = {
	categoria: () => <Categoria color="saffron" label="Tecnologia" href="/categoria" />,
}
