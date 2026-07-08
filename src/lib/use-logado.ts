import { useSearchParams } from 'react-router'

/** Lê o estado de login mockado do protótipo a partir de `?logado=true` na URL atual. */
export function useLogado(): boolean {
	const [params] = useSearchParams()
	return params.get('logado') === 'true'
}
