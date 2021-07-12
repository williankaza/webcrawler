
/**
 * Função para verificar se é nulo ou indefinido
 * @param value variavel que será verificada
 */
export function isNullOrUndefined(value: any): boolean {
	if (value === null || value === undefined ) {
		return true;
	}
	return false;
}

/**
 * Altera o valor `undefined` para vazio
 * @param value - Valor a ser validado
 * @returns O valor passado ou vazio `("")`
 */
export function changeUndefinedToEmpty(value: string | undefined): string {
	if (value == undefined) {
		value = "";
	}
	return value;
}

/**
 * Altera o valor undefined para o valor padrão
 * @param value - Valor recebido
 * @param defaultValue - Valor padrão
 */
export function changeUndefinedToDefault(value: any | undefined, defaultValue: any = "") {
	if (value == undefined) {
		value = defaultValue;
	}
	return value;
}

/**
 * Altera o valor `undefined` para `0`
 * @param value - Valor a ser validado
 * @returns O valor passado ou vazio `(0)`
 */
export function changeUndefinedToZero(value: number | undefined): number {
	if (value == undefined) {
		value = 0;
	}

	if (typeof value == "string") {
		value = parseFloat(value);
	}
	return value;
}


export function errorMsg( error: string){
    return { message: error }
}
