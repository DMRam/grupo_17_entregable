import axios from "axios"
import { useEffect } from "react"
import { Details } from "../components/details/Details"

export const tenantHeader = [
    {
        header: "Nombre",
        key: "name",
    },
    {
        header: "Apellido",
        key: "email",
    },
    {
        header: "Status",
        key: "status",
    },
    {
        header: "Corredores asociados a este Arrendatario",
        key: "brokerIdAssociated",
    },
]

// export const tenantRows = [
//     {
//         id: "a",
//         name: "",
//         apellido: '',
//         email: "",
//         asociados: "",
//         status: false,
//         content: <Details name='Test 1' description="Repetición. Esta semana tres registros inflacionarios removerán a los activos financieros en Chile y el mundo. Vea, además, una entrevista a Guillermo Tagle, director en Credicorp Capital, en torno a los desafíos que enfrenta el mercado local." imageUrl="" />
//     },
// ]
