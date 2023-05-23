/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../shared/components/Sidebar/sidebar";
import Navbarlog from "../../shared/components/NavbarLogada/navbarLogada";
import DataTable from "../../shared/components/TablePagination/tablePagination";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { CursosListarDTO } from "./dtos/CursosListar.dto";
import { CursosCadastrarDTO } from "./dtos/CursosCadastrar.dto";
import { GridActionsCellItem, GridRowId, DataGrid } from "@mui/x-data-grid";
import {
  BsFillTrashFill,
  BsFillPersonPlusFill,
  BsFillPersonDashFill,
} from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { queryClient } from "../../services/queryClient";
import { cadastrarCurso } from '../../services/cursos';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.grey};
  display: inline-flex;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DivButtons = styled.div`
  width: 85%;
  display: inline-flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 0 auto;
  padding-top: 30px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const FormText = styled.h1`
  color: #525252;
  font-size: 18px;
  font-weight: 400;
  text-align: left;
  padding-bottom: 25px;
`;

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  padding: "50px",
  height: "85%",
  overflow: "hidden",
  overflowY: "scroll",
};

export function Curso(this: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataTable, setDataTable] = useState(Array<Object>);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const registerCurso = async (data: any) => {
    const curso = {
      codigo: data.codigo,
      nomeCurso: data.nomeCurso,
      descricao: data.descricao,
      duracao: data.duracao,
    } as CursosCadastrarDTO;

    const response = await cadastrarCurso(curso);

    if (response.status === 201) {
      setOpen(false);
      queryClient.invalidateQueries("listar_curso");
      toast.success("Curso cadastrado com sucesso!");
    }
  };

  const columnsTableCursos = [
    { field: "codigo", headerName: "Codigo da turma", flex: 1 },
    { field: "nomeCurso", headerName: "Nome do curso", flex: 1 },
    { field: "decricao", headerName: "Descrição", flex: 1 },
    { field: "duracao", headerName: "Duração", flex: 1 },
  ];

  return (
    <Container>
      {" "}
      <Sidebar />
      <Content>
        <Navbarlog text={"Cursos"} />
        <DivButtons>
          <PrimaryButton text={"Cadastrar"} handleClick={handleOpen} />
          <PrimaryButton text={"Exportar"} handleClick={handleClose} />
        </DivButtons>
        <DataTable data={dataTable} columns={columnsTableCursos} />
      </Content>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormText>Preencha corretamente os dados cadastrais.</FormText>
          <Form onSubmit={handleSubmit(registerCurso)}>
            <TextField
              id="outlined-codigo"
              label="Codigo"
              required={true}
              inputProps={{ maxLength: 11 }}
              {...register("codigo")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-nomCurso"
              label="Nome do Curso"
              required={true}
              inputProps={{ maxLength: 70 }}
              {...register("nomeCurso")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-descricao"
              label="Descrição"
              required={true}
              inputProps={{ maxLength: 300 }}
              {...register("descricao")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-duracao"
              label="Duração em horas"
              {...register("duracao")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <PrimaryButton text={"Cadastrar"} />
          </Form>
        </Box>
      </Modal>
    </Container>
  );
}
