// import { NodeExecuteFunctions } from 'n8n-core';
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
		icon: 'file:stringBuilder.svg',
		group: ['transform'],
		version: 1,
		description: 'Acumula strings entre itens e execuções',
		defaults: { name: 'String Builder' },
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Value to Append',
				name: 'valueToAppend',
				type: 'string',
				default: '',
				placeholder: 'Ex: {{ $json.nome }}',
				required: true,
			},
			{
				displayName: 'Separator',
				name: 'separator',
				type: 'options',
				options: [
					{ name: 'New Line', value: '\\n' },
					{ name: 'Comma', value: ', ' },
					{ name: 'Space', value: ' ' },
					{ name: 'None', value: '' },
				],
				default: '\\n',
			},
		],
	};

async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const staticData = this.getWorkflowStaticData('global');

		if (staticData.sbContent === undefined || staticData.sbContent === null) {
			staticData.sbContent = '';
		}

		const separator = this.getNodeParameter('separator', 0) as string;

				let currentContent = staticData.sbContent as string;

		for (let i = 0; i < items.length; i++) {
			
			let val = '';
			try {
				val = this.getNodeParameter('valueToAppend', i) as string;
			} catch (error) {
				continue;
			}

			val = val || '';

			if (currentContent.length > 0 && val.length > 0) {
				const finalSeparator = separator === '\\n' ? '\n' : separator;
				currentContent += finalSeparator;
			}

			currentContent += val;
		}

		staticData.sbContent = currentContent;

		return [this.helpers.returnJsonArray({ result: staticData.sbContent })];
	}
}