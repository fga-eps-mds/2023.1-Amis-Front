/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AiOutlineHome, AiOutlineAudit } from "react-icons/ai";
import {
  BiBook,
  BiBookAdd,
  BiBookAlt,
  BiBookBookmark,
  BiBookHeart,
  BiBookOpen,
  BiBookmarkAltPlus,
  BiLogOut,
  BiUser,
  BiBuilding,
} from "react-icons/bi";
import { MdSchool } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import {
  FaChalkboardTeacher,
  FaUserShield,
  FaIndustry,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { AuthContext, Roles } from "../../../context/AuthProvider";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { getUserLocalStorage } from "../../../services/auth";

const Container = styled.div`
  width: 200px;
  border: none;
  background: white;
  position: sticky;
`;

const SidebarItem = styled(({ active, ...props }) => <Link {...props} />)`
  width: 200px;
  height: 60px;
  border: none;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
  text-decoration: none;
  padding-left: ${(props) => props.active && "13px"};
  background: ${(props) => (props.active ? grey : "white")};
  color: ${(props) => (props.active ? "#da4d3d" : "#525252")};
  border-left: ${(props) => props.active && "7px solid" + "#da4d3d"};
`;

const ItemText = styled.h1`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  padding-left: 10px;
`;

const Logo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: "#da4d3d";
  font-weight: 600;
`;

interface SideBarItemProps {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
  allowedRoles: Roles[];
  handleClick?: () => void;
}

export function Sidebar() {
  const [pathname] = useState(window.location.pathname);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const sidebarData: SideBarItemProps[] = [
    {
      id: 1,
      name: "Tela Inicial",
      path: "/",
      icon: (
        <AiOutlineHome
          color={pathname === "/" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["socialWorker", "student", "supervisor", "teacher"],
    },
    {
      id: 8,
      name: "Área Aluna",
      path: "/instrucoes",
      icon: (
        <BiBookHeart
          color={pathname === "/instrucoes" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["teacher", "socialWorker", "student", "supervisor"],
    },
    {
      id: 2,
      name: "Alunas",
      path: "/alunas",
      icon: (
        <MdSchool
          color={pathname === "/alunas" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["teacher", "socialWorker", "supervisor"],
    },
    {
      id: 4,
      name: "Professores",
      path: "/professores",
      icon: (
        <FaChalkboardTeacher
          color={pathname === "/professores" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["socialWorker"],
    },
    {
      id: 9,
      name: "Supervisores",
      path: "/supervisor",
      icon: (
        <BiUser
          color={pathname === "/supervisor" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["socialWorker", "supervisor"],
    },
    {
      id: 3,
      name: "Assistentes",
      path: "/assistentes",
      icon: (
        <FaUserShield
          color={pathname === "/assistentes" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["socialWorker"],
    },
    {
      id: 6,
      name: "Turmas",
      path: "/turmas",
      icon: (
        <AiOutlineAudit
          color={pathname === "/turmas" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["teacher", "socialWorker", "student"],
    },
    {
      id: 7,
      name: "Cursos",
      path: "/curso",
      icon: (
        <BiBook
          color={pathname === "/curso" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["socialWorker", "student", "teacher"],
    },

    {
      id: 10,
      name: "Centros Produtivos",
      path: "/centroProdutivo",
      icon: (
        <FaIndustry
          color={pathname === "/centroProdutivo" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      allowedRoles: ["socialWorker", "student", "supervisor", "teacher"],
    },
    {
      id: 9,
      name: "Sair",
      path: `/login/${auth.role as string}/logout`,
      icon: (
        <BiLogOut
          color={pathname === "/login/logout" ? "#da4d3d" : "#525252"}
          size={22}
        />
      ),
      handleClick: () => {
        auth.logout();
        navigate(`/login/${auth.role}/logout`);
      },
      allowedRoles: ["socialWorker", "student", "supervisor", "teacher"],
    },
  ];

  return (
    <Container>
      <Logo>AMIS</Logo>
      {sidebarData.map((itemData, index) => {
        if (auth.role && itemData.allowedRoles.includes(auth.role)) {
          return (
            <SidebarItem
              key={index}
              active={pathname === itemData.path}
              to={itemData.path}
              onClick={itemData.handleClick}
            >
              {itemData.icon}
              <ItemText>{itemData.name}</ItemText>
            </SidebarItem>
          );
        } else {
          return <></>;
        }
      })}
    </Container>
  );
}

export default Sidebar;
