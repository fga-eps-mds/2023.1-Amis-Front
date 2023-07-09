import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; // Importando o ícone de lupa
import { ProfessoresListarDTO } from '../professores/dtos/ProfessoresListar.dto';

interface Styles {
  container: React.CSSProperties;
  select: React.CSSProperties;
  searchIcon: React.CSSProperties; // Adicionando estilo para o ícone de lupa
}

const styles: Styles = {
  container: {
    position: 'relative',
    marginLeft: '0px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    width: '100%'
  },
  select: {
    backgroundColor: "#F5F4FF",
    border: '1px solid #cccccc',
    borderRadius: '4px',
    color: '#555555',
    padding: '8px',
    flex: 1,
    fontSize: '15px',
    paddingRight: '30px' // Aumentando o padding à direita para acomodar o ícone de lupa
  },
  searchIcon: {
    position: 'absolute',
    right: '20px',
    color: '#555555', // Definindo a cor do ícone como a cor do texto
  },
};

interface ProfessoresSelectProps {
  professores: ProfessoresListarDTO[];
  selectedOption: any;
  onSelectProfessores: (professores: any) => void; // Função para manipular a seleção do professor
}

const ProfessoresSelect: React.FC<ProfessoresSelectProps> = (props) => {
  const handleProfessoresChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfessoresLogin = event.target.value === "" ? null : parseInt(event.target.value);
    props.onSelectProfessores(selectedProfessoresLogin);
  };

  return (
    <div style={styles.container}>
      <select value={props?.selectedOption} style={styles.select} onChange={handleProfessoresChange}>
        <option>Selecione um professor</option> {/* Adicionando a primeira opção */}
        {props?.professores?.map((professor: ProfessoresListarDTO) => (
          <option key={professor.login} value={professor.login.toString()}>{professor.nome}</option>
        ))}
      </select>
      <AiOutlineSearch style={styles.searchIcon} /> {/* Ícone de lupa */}
    </div>
  );
};

export default ProfessoresSelect;
