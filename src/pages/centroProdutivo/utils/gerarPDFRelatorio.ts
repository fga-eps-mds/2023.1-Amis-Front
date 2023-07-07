import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, DynamicContent, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

interface IAlunos {
  id: number;
  centroId: number;
  comentario: string;
  confirmado: true
  login: string;
  nome_aluno: string;
  nota: string;
  quantidade_desejada: string;
  quantidade_produzida: string;
  status: string;
}

export function gerarPDFRelatorio(alunos: IAlunos[]) {
  // Carrega as fontes necessárias
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const alunosFormatados = alunos.map(aluno => 
    [
      aluno.nome_aluno ?? "",
      aluno.comentario ?? "",
      aluno.status ?? "",
      aluno.nota ?? "",
      aluno.quantidade_produzida ?? "",
      aluno.quantidade_desejada ?? "",
    ]
  )

  // Dados de exemplo
  const dados = [
    ['Nome da Aluna', 'Comentário', 'Frequência', 'Nota', 'Qtd Produzida', 'Qtd Desejada'],
    ...alunosFormatados,
  ];

  // Definição do estilo do relatório
  const estiloRelatorio: StyleDictionary = {
    header: {
      fillColor: '#CCCCCC',
      color: '#000000',
      bold: true,
      alignment: 'center',
      fontSize: 24,
      margin: [0, 10, 0, 50],
    },
    cell: {
      fillColor: '#F8F8F8',
      color: '#000000',
      fontSize: 10,
      margin: [0, 50, 0, 50],
    },
  };

  // Cria o conteúdo do relatório
  const conteudoRelatorio = [
    {
      table: {
        headerRows: 1,
        widths: ['auto', 90, 70, 'auto', 'auto', 'auto'],
        body: dados,
      },
      layout: 'lightHorizontalLines',
    },
  ];

  // Cria o documento PDF
  const documento: TDocumentDefinitions = {
    header: { text: 'Relatório da Produção', style: 'header' },
    content: conteudoRelatorio,
    styles: estiloRelatorio,
  };

  // Gera o PDF e abre em uma nova janela do navegador
  pdfMake.createPdf(documento).open();
}

export function gerarPDFRelatorio1(alunos: IAlunos[]) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle: Content = [
    {
      text: 'Clientes',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    }
  ];

  const details: Content = [];

  const Rodape: DynamicContent = (currentPage, pageCount) => {
    return [
      {
        text: `${currentPage.toString()}/${pageCount}`,
        fontSize: 15,
        bold: true,
        margin: [0, 10, 20, 0],
      }
    ]
  }

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: details,
    footer: Rodape,
  }

  pdfMake.createPdf(docDefinition).download();
}
