import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronUp, 
  Filter, 
  Download, 
  Search,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'currency' | 'percentage' | 'date';
  drillDown?: boolean;
}

interface DataRow {
  id: string;
  [key: string]: any;
  children?: DataRow[];
}

interface DrillThroughTableProps {
  columns: Column[];
  data: DataRow[];
  onDrillDown?: (row: DataRow, level: number) => void;
  onRowClick?: (row: DataRow) => void;
  onRowAction?: (action: string, row: DataRow) => void;
  showActions?: boolean;
  expandable?: boolean;
}

const TableContainer = styled.div`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.glass.border};
`;

const TableTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const TableActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: white;
    border-color: ${theme.colors.primary.main};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 36px;
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  width: 250px;
  transition: all ${theme.transitions.normal};
  
  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: ${theme.colors.text.tertiary};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.borderRadius.full};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${theme.colors.background.secondary};
`;

const TableHeadRow = styled.tr`
  border-bottom: 2px solid ${theme.colors.glass.border};
`;

const TableHeadCell = styled.th<{ sortable?: boolean }>`
  padding: ${theme.spacing.md};
  text-align: left;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  user-select: none;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    color: ${props => props.sortable ? theme.colors.primary.main : theme.colors.text.secondary};
  }
`;

const SortIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: ${theme.spacing.xs};
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)<{ level?: number; clickable?: boolean }>`
  border-bottom: 1px solid ${theme.colors.glass.border};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.glass.background};
  }
  
  ${props => props.level && `
    td:first-child {
      padding-left: ${theme.spacing.md + (props.level * 24)}px;
    }
  `}
`;

const TableCell = styled.td`
  padding: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
`;

const ExpandButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  margin-right: ${theme.spacing.sm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.glass.background};
    color: ${theme.colors.primary.main};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const DrillDownLink = styled(motion.span)`
  color: ${theme.colors.primary.main};
  cursor: pointer;
  text-decoration: underline;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primary.light};
  }
`;

const ValueCell = styled.div<{ trend?: 'up' | 'down' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  ${props => props.trend && `
    color: ${props.trend === 'up' 
      ? theme.colors.success 
      : props.trend === 'down' 
      ? theme.colors.error 
      : theme.colors.text.primary};
  `}
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ActionIconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.glass.background};
    color: ${theme.colors.primary.main};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const EmptyState = styled.div`
  padding: ${theme.spacing.xxxl};
  text-align: center;
  color: ${theme.colors.text.tertiary};
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: ${theme.spacing.lg};
    opacity: 0.5;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.glass.border};
`;

const PaginationInfo = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const PaginationControls = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const PaginationButton = styled(motion.button)<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => props.active 
    ? theme.colors.primary.main 
    : theme.colors.glass.background};
  color: ${props => props.active 
    ? 'white' 
    : theme.colors.text.secondary};
  border: 1px solid ${props => props.active 
    ? theme.colors.primary.main 
    : theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover:not(:disabled) {
    background: ${props => !props.active && theme.colors.glass.background};
    border-color: ${theme.colors.primary.main};
    color: ${props => !props.active && theme.colors.primary.main};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DrillThroughTable: React.FC<DrillThroughTableProps> = ({
  columns,
  data,
  onDrillDown,
  onRowClick,
  onRowAction,
  showActions = false,
  expandable = true
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const toggleExpand = (rowId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };
  
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };
  
  const formatValue = (value: any, type?: string) => {
    if (value === null || value === undefined) return '-';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${(value * 100).toFixed(2)}%`;
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      default:
        return value.toString();
    }
  };
  
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row => 
      Object.values(row).some(value => 
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);
  
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);
  
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  
  const renderRow = (row: DataRow, level: number = 0) => {
    const isExpanded = expandedRows.has(row.id);
    const hasChildren = row.children && row.children.length > 0;
    
    return (
      <React.Fragment key={row.id}>
        <TableRow
          level={level}
          clickable={!!onRowClick}
          onClick={() => onRowClick?.(row)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {columns.map((column, index) => (
            <TableCell key={column.key}>
              {index === 0 && hasChildren && expandable && (
                <ExpandButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(row.id);
                  }}
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                >
                  <ChevronRight />
                </ExpandButton>
              )}
              
              {column.drillDown && onDrillDown ? (
                <DrillDownLink
                  onClick={(e) => {
                    e.stopPropagation();
                    onDrillDown(row, level);
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {formatValue(row[column.key], column.type)}
                </DrillDownLink>
              ) : (
                <ValueCell>
                  {formatValue(row[column.key], column.type)}
                </ValueCell>
              )}
            </TableCell>
          ))}
          
          {showActions && (
            <TableCell>
              <ActionsCell>
                <ActionIconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowAction?.('view', row);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye />
                </ActionIconButton>
                <ActionIconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowAction?.('edit', row);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit />
                </ActionIconButton>
                <ActionIconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowAction?.('delete', row);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 />
                </ActionIconButton>
              </ActionsCell>
            </TableCell>
          )}
        </TableRow>
        
        <AnimatePresence>
          {isExpanded && hasChildren && row.children?.map(child => 
            renderRow(child, level + 1)
          )}
        </AnimatePresence>
      </React.Fragment>
    );
  };
  
  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Data Analysis</TableTitle>
        <TableActions>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter />
            Filter
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download />
            Export
          </ActionButton>
        </TableActions>
      </TableHeader>
      
      <TableWrapper>
        <Table>
          <TableHead>
            <TableHeadRow>
              {columns.map(column => (
                <TableHeadCell
                  key={column.key}
                  sortable={column.sortable}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}
                  {column.sortable && sortColumn === column.key && (
                    <SortIndicator>
                      {sortDirection === 'asc' ? <ChevronUp /> : <ChevronDown />}
                    </SortIndicator>
                  )}
                </TableHeadCell>
              ))}
              {showActions && <TableHeadCell>Actions</TableHeadCell>}
            </TableHeadRow>
          </TableHead>
          
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map(row => renderRow(row))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (showActions ? 1 : 0)}>
                  <EmptyState>
                    <Filter />
                    <p>No data available</p>
                  </EmptyState>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableWrapper>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationInfo>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} entries
          </PaginationInfo>
          
          <PaginationControls>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </PaginationButton>
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNum = index + 1;
              return (
                <PaginationButton
                  key={pageNum}
                  active={currentPage === pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {pageNum}
                </PaginationButton>
              );
            })}
            
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </PaginationButton>
          </PaginationControls>
        </Pagination>
      )}
    </TableContainer>
  );
};