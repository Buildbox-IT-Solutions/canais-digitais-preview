import type { CadastroField } from './cadastro-steps'
import { AuthInput } from './input'
import { AuthSelect } from './select'

interface IAuthFieldListProps {
	fields: CadastroField[]
	/** Marca todos os campos em erro (validação de obrigatórios, mensagem única no topo). */
	invalid?: boolean
	autoFocusFirst?: boolean
}

/**
 * Renderiza uma lista ordenada de campos do cadastro (texto e select misturados na
 * ordem do formulário). Existe para que o modal e a fullpage montem exatamente os
 * mesmos campos, na mesma ordem, a partir de `cadastro-steps`.
 *
 * Campos vizinhos com o mesmo `row` dividem uma linha a partir de `sm`; abaixo disso
 * empilham, porque a coluna do formulário no mobile não comporta duas colunas.
 */
export function AuthFieldList({ fields, invalid = false, autoFocusFirst = false }: IAuthFieldListProps) {
	// Mensagem já aparece uma vez no alerta do topo — aqui só o estado visual de erro.
	const error = invalid ? ' ' : undefined

	const renderField = (f: CadastroField, index: number) =>
		f.kind === 'select' ? (
			<AuthSelect
				key={f.name}
				label={f.label}
				name={f.name}
				options={f.options}
				placeholder={f.placeholder}
				defaultValue={f.defaultValue}
				autoComplete={f.autoComplete}
				required
				error={error}
			/>
		) : (
			<AuthInput
				key={f.name}
				label={f.label}
				name={f.name}
				type={f.type}
				placeholder={f.placeholder}
				autoComplete={f.autoComplete}
				autoFocus={autoFocusFirst && index === 0}
				required
				error={error}
			/>
		)

	// Agrupa campos vizinhos que compartilham `row`; os demais viram grupos de um.
	const rows: Array<{ key: string; fields: Array<{ field: CadastroField; index: number }> }> = []
	fields.forEach((field, index) => {
		const last = rows[rows.length - 1]
		if (field.row && last?.key === field.row) {
			last.fields.push({ field, index })
			return
		}
		rows.push({ key: field.row ?? field.name, fields: [{ field, index }] })
	})

	return (
		<>
			{rows.map((row) =>
				row.fields.length > 1 ? (
					<div key={row.key} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
						{row.fields.map(({ field, index }) => renderField(field, index))}
					</div>
				) : (
					renderField(row.fields[0].field, row.fields[0].index)
				),
			)}
		</>
	)
}
