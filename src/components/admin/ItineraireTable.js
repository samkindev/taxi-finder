import * as React from 'react';
import clsx from 'clsx';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fade, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import AddItineraire from './AddItineraire';
import ConfirmDeleteItineraire from './ConfirmDeleteItineraire';

export default function ItineraireTable({ rows }) {
    const [update, setUpdate] = React.useState(null);
    const [del, setDel] = React.useState(null);

    const toggleUpdate = (it) => {
        setUpdate(it);
    };

    const handleCloseUpdate = () => setUpdate(null);

    const { url } = useRouteMatch();
    const history = useHistory();
    const handleGoItineraire = (idItineraire) => {
        history.push(url + "/" + idItineraire);
    };

    const toggleDelete = (it) => {
        setDel(it);
    };
    const classes = useStyles();
    return (
        <Fade in>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N°</TableCell>
                            <TableCell align="left">Nom</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={clsx(classes.row, "ligne")}
                            >
                                <TableCell onClick={() => handleGoItineraire(row.id)} align="right">{i + 1}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize' }} onClick={() => handleGoItineraire(row.id)} align="left">{row.nom}</TableCell>
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
                {update && <AddItineraire open={update ? true : false} onClose={handleCloseUpdate} itineraire={update} />}
                {del && <ConfirmDeleteItineraire open={del ? true : false} itineraire={del} onClose={() => setDel(null)} />}
            </TableContainer>
        </Fade>
    );
}

const useStyles = makeStyles({
    row: {
        transition: "background .2s",
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#ececec',
        }
    }
});