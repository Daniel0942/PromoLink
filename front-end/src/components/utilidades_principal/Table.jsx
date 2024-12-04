function Table({gerenciadorHistorico}) {
    return (
        <>
            {/* Usando table pronta do Bootstrap */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />

            <div class="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Sites solicitados</th>
                            <th scope="col">Data e hora</th>
                        </tr>
                    </thead>
                    {gerenciadorHistorico ? (gerenciadorHistorico.map((item, index) => (
                        <tbody key={index}>
                            <tr>
                                <th scope="row">{++index}</th>
                                <td>{item.site}</td>
                                <td>{item.data_e_hora}</td>
                            </tr>
                        </tbody>
                        ))
                    ) : (
                        console.log("Sem historico")
                    )}
                </table>
            </div>
        </>
    )
}

export default Table