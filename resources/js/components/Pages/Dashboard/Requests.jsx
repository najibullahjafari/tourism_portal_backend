import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate tourists Data

function createData(id, date, name, country, visitedPlace, amount) {
  return { id, date, name, country, visitedPlace, amount };
}

// the dome data for the table

const tourists = [
  createData(
    0,
    '16 Mar, 2023',
    'Banana Joe',
    'Canada',
    ['Kabul', 'Herat', 'Bamyan'],
    312.44
  ),
  createData(
    1,
    '16 Mar, 2023',
    'Banana Joe',
    'Canada',
    ['Kabul', 'Herat', 'Bamyan'],
    312.44
  ),
  createData(
    2,
    '16 Mar, 2023',
    'Banana Joe',
    'Canada',
    ['Kabul', 'Herat', 'Bamyan'],
    312.44
  ),
  createData(
    3,
    '16 Mar, 2023',
    'Banana Joe',
    'Canada',
    ['Kabul', 'Herat', 'Bamyan'],
    312.44
  ),
  createData(
    4,
    '16 Mar, 2023',
    'Banana Joe',
    'Canada',
    ['Kabul', 'Herat', 'Bamyan'],
    312.44
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

// the visited tourists table

export default function Visiteds() {
  return (
    <React.Fragment>
      <Title>Recent Tourists who visited Afghanistan</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Visited places</TableCell>
            <TableCell align="right">Paied</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tourists.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.visitedPlace.join(' ')}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more tourists
      </Link>
    </React.Fragment>
  );
}
