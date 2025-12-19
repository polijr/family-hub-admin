import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FilterBar } from "@/components/admin/FilterBar";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: users } = useQuery(['users'], () => fetch('/api/users').then(res => res.json()))

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  status: "ativo" | "inativo" | "suspeito";
}

const mockUsers: User[] = [
  { id: "1", name: "Maria Silva", email: "maria@email.com", registrationDate: "2024-01-15", status: "ativo" },
  { id: "2", name: "João Santos", email: "joao@email.com", registrationDate: "2024-01-14", status: "ativo" },
  { id: "3", name: "Ana Oliveira", email: "ana@email.com", registrationDate: "2024-01-13", status: "suspeito" },
];

type FilterType = "todos" | "recentes" | "suspeitos";

const Usuarios = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");

  const filteredUsers = useMemo(() => {
    let result = mockUsers;

    // Filtro por busca
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por tipo
    if (activeFilter === "recentes") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      result = result.filter(user => new Date(user.registrationDate) >= sevenDaysAgo);
    } else if (activeFilter === "suspeitos") {
      result = result.filter(user => user.status === "suspeito");
    }

    return result;
  }, [search, activeFilter]);

  const columns = [
    { key: "name", header: "Nome" },
    { key: "email", header: "Email" },
    { 
      key: "registrationDate", 
      header: "Data de Cadastro",
      render: (user: User) => new Date(user.registrationDate).toLocaleDateString('pt-BR')
    },
    { 
      key: "status", 
      header: "Status",
      render: (user: User) => <StatusBadge status={user.status} />
    },
  ];

  const filters = [
    { label: "Recém cadastrados", active: activeFilter === "recentes", onClick: () => setActiveFilter(activeFilter === "recentes" ? "todos" : "recentes") },
    { label: "Suspeitos", active: activeFilter === "suspeitos", onClick: () => setActiveFilter(activeFilter === "suspeitos" ? "todos" : "suspeitos") },
  ];

  return (
    <div className="content-section">
      <h1 className="page-header">Gerenciar Usuários</h1>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nome ou email..."
        filters={filters}
      />

      <DataTable
        columns={columns}
        data={filteredUsers}
        onRowClick={(user) => navigate(`/usuarios/${user.id}`)}
        emptyMessage="Nenhum usuário encontrado"
      />
    </div>
  );
};

export default Usuarios;
