import { Details } from "../components/details/Details";

export const rentHeaderData = [
    {
        header: "Identificador",
        key: "name",
    },
    {
        header: "Fecha inicio",
        key: "protocol",
    },
    {
        header: "Fecha término",
        key: "port",
    },
    {
        header: "Arrendatario",
        key: "rule",
    },
    {
        header: "Dueño de la Propiedad",
        key: "attached_groups",
    },
    {
        header: "Status",
        key: "status",
    },
    {
        header: "Content",
        key: "content",
    }
];

export const rentRowData = [
    {
        attached_groups: "Kevin’s VM Groups",
        id: "a",
        name: "Load Balancer 3",
        port: 3000,
        protocol: "HTTP",
        rule: "Round robin",
        status: 'Vigente',
        content: <Details name='Test 1' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
    },
    {
        attached_groups: "Maureen’s VM Groups",
        id: "b",
        name: "Load Balancer 1",
        port: 443,
        protocol: "HTTP",
        rule: "Round robin",
        status: 'Vigente',
        content: <Details name='Test 2' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
    },
    {
        attached_groups: "Andrew’s VM Groups",
        id: "c",
        name: "Load Balancer 2",
        port: 80,
        protocol: "HTTP",
        rule: "DNS delegation",
        status: 'Vigente',
        content: <Details name='Test 3' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
    },
    {
        attached_groups: "Marc’s VM Groups",
        id: "d",
        name: "Load Balancer 6",
        port: 3000,
        protocol: "HTTP",
        rule: "Round robin",
        status: 'Vigente',
        content: <Details name='Test 4' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
    },
    {
        attached_groups: "Mel’s VM Groups",
        id: "e",
        name: "Load Balancer 4",
        port: 443,
        protocol: "HTTP",
        rule: "Round robin",
        status: 'Vigente',
        content: <Details name='Test 5' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local.Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
    },
    {
        attached_groups: "Ronja’s VM Groups",
        id: "f",
        name: "Load Balancer 5",
        port: 80,
        protocol: "HTTP",
        rule: "DNS delegation",
        status: 'Vigente',
        content: <Details name='Test 6' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
    },
];