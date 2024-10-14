import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';
import './Transaction.css'

const TransactionCenterComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer les transactions depuis le backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/transactions`);
        setTransactions(response.data.transactions);
        setFilteredTransactions(response.data.transactions);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
      }
    };
    
    fetchTransactions();
  }, []);

  // Filtrer les transactions en fonction du terme de recherche
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = transactions.filter(transaction =>
      transaction.id.toLowerCase().includes(term.toLowerCase()) ||
      transaction.status.toLowerCase().includes(term.toLowerCase()) ||
      transaction.amount.toString().includes(term) ||
      transaction.date.includes(term)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div style={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Centre de Transactions
      </Typography>

      {/* Champ de recherche */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Rechercher une transaction"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Recherche par ID, statut, montant ou date"
          />
        </Grid>
      </Grid>

      {/* Tableau des transactions */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount} €</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => alert(`Détails de la transaction ${transaction.id}`)}>
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Message si aucune transaction trouvée */}
      {filteredTransactions.length === 0 && (
        <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>
          Aucune transaction trouvée.
        </Typography>
      )}
    </div>
  );
};

export default TransactionCenterComponent;
