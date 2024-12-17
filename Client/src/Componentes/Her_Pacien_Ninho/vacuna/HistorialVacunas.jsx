import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import styles from './HistorialVacunas.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';
import OpcionesI from '../OpcionesI';
import { RiPlayReverseLargeFill } from "react-icons/ri";

const HistorialVacunas = ({ responsable = "Dr. Miquias Alejandro Ursua Paima" }) => {

    const location = useLocation();
    const { paciente } = location.state || {}; // Evita errores si no hay datos

    const [data, setData] = useState([
        {
            id: 1,
            fecha: '10/12/2024',
            edad: '2a 07m 05d',
            codigo: '90633.01',
            vacuna: 'Vacuna HVA (Hep.A)',
            dx2: '',
            lab2: '',
        },
        {
            id: 2,
            fecha: '10/12/2024',
            edad: '2a 07m 05d',
            codigo: '90657',
            vacuna: 'Influenza con Comorbilidad',
            dx2: '1',
            lab2: '',
        }, {
            id: 3,
            fecha: '10/12/2024',
            edad: '2a 07m 05d',
            codigo: '90633.01',
            vacuna: 'Vacuna HVA (Hep.A)',
            dx2: '',
            lab2: '',
        },
        // {
        //     id: 1,
        //     fecha: '10/12/2024',
        //     edad: '2a 07m 05d',
        //     codigo: '90633.01',
        //     vacuna: 'Vacuna HVA (Hep.A)',
        //     dx2: '',
        //     lab2: '',
        // }, 
    ]);

    const columns = useMemo(
        () => [
            { Header: 'Fec. Atenc.', accessor: 'fecha' },
            { Header: 'Edad', accessor: 'edad' },
            { Header: 'Código', accessor: 'codigo' },
            { Header: 'Vacuna', accessor: 'vacuna' },
            { Header: 'Dx2', accessor: 'dx2' },
            { Header: 'Lab2', accessor: 'lab2' },
            {
                Header: 'Acciones',
                Cell: ({ row }) => (
                    <div className={styles.actionButtons}>
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(row.original.id)}
                        >
                            Eliminar
                        </button>
                        <div className={styles.tooltipWrapper}>
                            <button className={styles.responsableButton}><FaUsers /></button>
                            <span className={styles.tooltip}>{responsable}</span>
                        </div>
                    </div>
                ),
            },
        ],
        [responsable]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        rows,
        state: { globalFilter },
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        pageOptions,
        state: { pageIndex },
    } = useTable({ columns, data }, useGlobalFilter, usePagination);

    const handleDelete = (id) => {
        setData(data.filter((record) => record.id !== id));
    };

    return (
        <div className={styles.container}>
            <NavLogin />

            <Link to={`/panel/${paciente?.hist_clinico || ''}`} className={styles.volver_link}>
                <RiPlayReverseLargeFill /> VOLVER
            </Link>

            <div className={styles.mainContent}>
                {paciente ? (
                    <>

                        <OpcionesI paciente={paciente} />
                        <div className={styles.contentWrapper}>
                            <h3>Listado de Vacunas - {paciente.nombres} ({paciente.hist_clinico})</h3>
                            <div className={styles.header}>
                                <label htmlFor="searchInput" className={styles.searchLabel}>Buscar:</label>
                                <input
                                    id="searchInput"
                                    className={styles.searchInput}
                                    value={globalFilter || ''}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    placeholder="Buscar registro..."
                                    aria-label="Buscar en registros"
                                />
                            </div>
                            <div className={styles.tableWrapper}>
                                <table {...getTableProps()} className={styles.table}>
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column) => (
                                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {page.map((row) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell) => (
                                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.pagination}>
                                <button onClick={previousPage} disabled={!canPreviousPage} aria-label="Página anterior">
                                    {'<'}
                                </button>
                                <span>
                                    Página {pageIndex + 1} de {pageOptions.length}
                                </span>
                                <button onClick={nextPage} disabled={!canNextPage} aria-label="Página siguiente">
                                    {'>'}
                                </button>
                            </div>
                            <div className={styles.recordCount}>
                                Mostrando {page.length} de {rows.length} registros
                            </div>
                        </div>
                    </>) : (
                    <p>No hay datos xd...</p>
                )}

            </div>
            <NavPie />
        </div>
    );
};

export default HistorialVacunas;