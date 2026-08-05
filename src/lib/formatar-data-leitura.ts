import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

/**
 * Distância entre `readAt` e `referenceDate` em texto (pt-BR):
 * <24h "Lido hoje" · 1 dia "Lido ontem" · 2-6 dias "Lido há N dias" ·
 * 7-29 dias "Lido há N semanas" · 30+ dias "Lido em dd/MM" (dd/MM/yyyy se ano diferente).
 */
export function formatarDataLeitura(readAt: string | Date, referenceDate: Date = new Date()): string {
	const date = typeof readAt === 'string' ? new Date(readAt) : readAt
	const diffMs = referenceDate.getTime() - date.getTime()
	const diffDays = Math.floor(diffMs / DAY_MS)

	if (diffMs < DAY_MS) return 'Lido hoje'
	if (diffDays === 1) return 'Lido ontem'
	if (diffDays <= 6) return `Lido há ${diffDays} dias`
	if (diffDays <= 29) {
		const semanas = Math.round(diffDays / 7)
		return `Lido há ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`
	}

	const mesmoAno = date.getFullYear() === referenceDate.getFullYear()
	return `Lido em ${format(date, mesmoAno ? 'dd/MM' : 'dd/MM/yyyy', { locale: ptBR })}`
}
