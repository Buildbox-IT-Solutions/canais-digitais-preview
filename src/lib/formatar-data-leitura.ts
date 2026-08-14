import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

/**
 * Distância entre `readAt` e `referenceDate` em texto (pt-BR), com verbo customizável
 * (default "Lido", preserva todas as chamadas existentes de Últimas leituras; Favoritos
 * chama com `verbo="Salvo"`):
 * <24h "<Verbo> hoje" · 1 dia "<Verbo> ontem" · 2-6 dias "<Verbo> há N dias" ·
 * 7-29 dias "<Verbo> há N semanas" · 30+ dias "<Verbo> em dd/MM" (dd/MM/yyyy se ano diferente).
 */
export function formatarDataLeitura(
	readAt: string | Date,
	referenceDate: Date = new Date(),
	verbo: string = 'Lido',
): string {
	const date = typeof readAt === 'string' ? new Date(readAt) : readAt
	const diffMs = referenceDate.getTime() - date.getTime()
	const diffDays = Math.floor(diffMs / DAY_MS)

	if (diffMs < DAY_MS) return `${verbo} hoje`
	if (diffDays === 1) return `${verbo} ontem`
	if (diffDays <= 6) return `${verbo} há ${diffDays} dias`
	if (diffDays <= 29) {
		const semanas = Math.round(diffDays / 7)
		return `${verbo} há ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`
	}

	const mesmoAno = date.getFullYear() === referenceDate.getFullYear()
	return `${verbo} em ${format(date, mesmoAno ? 'dd/MM' : 'dd/MM/yyyy', { locale: ptBR })}`
}
