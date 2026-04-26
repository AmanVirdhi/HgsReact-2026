import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from '../Header/Header';
import { typesService } from '../../services/typesService';
import { HgsTypes } from '../../models/types';
import { useAuth } from '../../hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Styled Components
const PageWrapper = styled.div`
  height: calc(100vh - 60px);
  margin-top: 60px;
  background: #f5f7fa;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100vh - 60px);
    overflow: auto;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
    height: auto;
    min-height: calc(100vh - 60px);
  }
`;

const Header2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TotalCount = styled.span`
  background: #3498db;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.3rem 0.75rem;
    font-size: 0.8rem;
  }
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  background: ${props => props.error ? '#fee2e2' : '#d1fae5'};
  color: ${props => props.error ? '#dc2626' : '#059669'};
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
`;

const StyledTableHead = styled(TableHead)`
  th {
    font-weight: 600;
    color: #475569;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #f8fafc;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 0.7rem;
      padding: 8px 6px;
    }
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background: #f8fafc;
  }
  
  td {
    color: #334155;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 8px 6px;
    }
  }
`;

const ActionButton = styled(IconButton)`
  color: #64748b;
  
  &:hover {
    background: #e2e8f0;
    color: #334155;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const MenuIcon = styled.span`
  margin-right: 8px;
  font-size: 0.9rem;
`;

const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid #ccc;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const PaginationWrapper = styled.div`
  background: white;
  border-radius: 0 0 12px 12px;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    .MuiTablePagination-toolbar {
      padding: 0 8px;
      min-height: 48px;
    }
    .MuiTablePagination-selectLabel,
    .MuiTablePagination-displayedRows {
      font-size: 0.75rem;
    }
    .MuiTablePagination-select {
      font-size: 0.75rem;
    }
    .MuiTablePagination-actions {
      margin-left: 8px;
    }
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 15px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ModalText = styled.p`
  color: #64748b;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const ModalButton = styled.button<{ danger?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${props => props.danger ? '#ef4444' : '#e2e8f0'};
  color: ${props => props.danger ? 'white' : '#475569'};
  
  &:hover {
    background: ${props => props.danger ? '#dc2626' : '#cbd5e1'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

type Order = 'asc' | 'desc';

export const GrievanceList: React.FC = () => {
  const [grievanceList, setGrievanceList] = useState<HgsTypes[]>([]);
  const [grievanceMessage, setGrievanceMessage] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<HgsTypes | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof HgsTypes>('id');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchGrievanceList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, user?.email]);

  const fetchGrievanceList = async () => {
    try {
      const result = await typesService.getGrievanceList();
      if (isAdmin) {
        setGrievanceList(result);
      } else {
        // User sirf apni grievances dekhe
        setGrievanceList(result.filter(g => g.userEmail === user?.email));
      }
    } catch (error) {
      console.error('Error fetching grievance list:', error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: HgsTypes) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    if (selectedRow) {
      navigate(`/updateList/${selectedRow.id}`);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      setIsDeleting(true);
      try {
        await typesService.deleteGrievance(selectedRow.id);
        setGrievanceMessage('Resident is deleted');
        fetchGrievanceList();
        setTimeout(() => setGrievanceMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting grievance:', error);
        setGrievanceMessage('Failed to delete grievance');
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setSelectedRow(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof HgsTypes) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...grievanceList].sort((a, b) => {
    const aValue = a[orderBy] ?? '';
    const bValue = b[orderBy] ?? '';
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <Header2>
            <Title>📋 Grievance List</Title>
            <TotalCount>{grievanceList.length} Total</TotalCount>
          </Header2>
          
          {grievanceMessage && <Message>{grievanceMessage}</Message>}
          
          <TableWrapper>
            <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
              <Table stickyHeader>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'id'}
                        direction={orderBy === 'id' ? order : 'asc'}
                        onClick={() => handleRequestSort('id')}
                      >
                        ID
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'grievancetypes'}
                        direction={orderBy === 'grievancetypes' ? order : 'asc'}
                        onClick={() => handleRequestSort('grievancetypes')}
                      >
                        Type
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'room'}
                        direction={orderBy === 'room' ? order : 'asc'}
                        onClick={() => handleRequestSort('room')}
                      >
                        Room
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'course'}
                        direction={orderBy === 'course' ? order : 'asc'}
                        onClick={() => handleRequestSort('course')}
                      >
                        Course
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'mobile'}
                        direction={orderBy === 'mobile' ? order : 'asc'}
                        onClick={() => handleRequestSort('mobile')}
                      >
                        Mobile
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {paginatedData.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.grievancetypes}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.course}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="center">
                        <ActionButton onClick={(e) => handleMenuOpen(e, row)}>
                          <MoreVertIcon />
                        </ActionButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && selectedRow?.id === row.id}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleEdit} disabled={isDeleting}>
                            <MenuIcon>✏️</MenuIcon> Edit
                          </MenuItem>
                          <MenuItem onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? <><Spinner /> Deleting...</> : <><MenuIcon>🗑️</MenuIcon> Delete</>}
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <PaginationWrapper>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={grievanceList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </PaginationWrapper>
          </TableWrapper>
        </Container>
      </PageWrapper>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay onClick={cancelDelete}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Are you sure?</ModalTitle>
            <ModalText>
              Do you want to delete <strong>{selectedRow?.name}</strong>? This action cannot be undone.
            </ModalText>
            <ModalButtons>
              <ModalButton onClick={cancelDelete} disabled={isDeleting}>
                Cancel
              </ModalButton>
              <ModalButton danger onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
