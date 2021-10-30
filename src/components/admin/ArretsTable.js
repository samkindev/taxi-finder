import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fade, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ConfirmDeleteItineraire from './ConfirmDeleteItineraire';
import AddArret from './AddArret';

export default function ArretTable({ rows }) {
    const [update, setUpdate] = React.useState(null);
    const [del, setDel] = React.useState(null);

    const toggleUpdate = (arret) => {
        setUpdate(arret);
    };

    const handleCloseUpdate = () => setUpdate(null);

    const toggleDelete = (arr) => {
        setDel(arr);
    };
    return (
        <Fade in>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">N°</TableCell>
                            <TableCell align="left">Nom</TableCell>
                            <TableCell align="left">Position</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{i + 1}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize' }} align="left">{row.nom}</TableCell>
                                <TableCell align="left">{row.position ? `${row.position[0]}, ${row.position[1]}` : "ND"}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        variant="contained"
                                        size="small"
                                        onClick={() => toggleUpdate(row)}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        variant="contained"
                                        size="small"
                                        onClick={() => toggleDelete(row)}
                                        sx={{ marginLeft: 1 }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {update && <AddArret open={update ? true : false} onClose={handleCloseUpdate} arret={update} itineraireId={update.itineraire} />}
                {del && <ConfirmDeleteItineraire message={`Voulez-vous vraiment supprimer l'itineraire ${del.nom}`} open={del ? true : false} arret={del} onClose={() => setDel(null)} />}
            </TableContainer>
        </Fade>
    );
}