import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class StringBuilderPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'String Builder Pro',
		name: 'stringBuilderPro',
		icon: 'file:StringBuilderPro.svg',
		group: ['transform'],
		version: 1,
		description: 'Acumula strings entre execuções ou loops de forma persistente.',
		defaults: {
			name: 'String Builder Pro',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Append',
						value: 'append',
						description: 'Adiciona o valor ao buffer existente',
						action: 'Adiciona o valor ao buffer existente',
					},
					{
						name: 'Reset and Append',
						value: 'reset',
						description: 'Limpa o buffer antes de adicionar o novo valor',
						action: 'Limpa o buffer antes de adicionar o novo valor',
					},
				],
				default: 'append',
				noDataExpression: true,
			},
			{
				displayName: 'Value to Append',
				name: 'valueToAppend',
				type: 'string',
				default: '',
				placeholder: 'Texto para adicionar...',
				description: 'O valor que será concatenado ao acumulador',
			},
			{
				displayName: 'Separator',
				name: 'separator',
				type: 'options',
				options: [
					{ name: 'None', value: '' },
					{ name: 'New Line', value: '\\n' },
					{ name: 'Comma', value: ',' },
					{ name: 'Space', value: ' ' },
				],
				default: '\\n',
				description: 'Caractere colocado entre os valores acumulados',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const staticData = this.getWorkflowStaticData('node');

		// Lógica de Reset: Se a operação for 'reset', limpamos o buffer antes de começar
		const operation = this.getNodeParameter('operation', 0) as string;
		if (operation === 'reset') {
			staticData.accumulatedString = '';
		}

		let currentString = (staticData.accumulatedString as string) || '';

		for (let i = 0; i < items.length; i++) {
			let val = '';
			try {
				val = this.getNodeParameter('valueToAppend', i) as string;
			} catch {
				// Ignora itens vazios ou erros de parâmetro
				continue;
			}

			const separator = this.getNodeParameter('separator', i) as string;
			const realSeparator = separator === '\\n' ? '\n' : separator;

			// Adiciona o separador apenas se já houver conteúdo e se o novo valor não for vazio
			if (currentString.length > 0 && val.length > 0) {
				currentString += realSeparator;
			}
			currentString += val;
		}

		// Persiste o resultado no staticData para a próxima execução ou loop
		staticData.accumulatedString = currentString;
		
		// Retorna um único item com o resultado consolidado
		returnData.push({ json: { result: currentString } });

		return [returnData];
	}
}