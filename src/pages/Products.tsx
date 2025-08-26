import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { Button } from '../components/common/Button';
import { Package, Plus, Search, Filter, Grid3x3, List, Tag, BarChart3 } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
`;

const PageContent = styled.div`
  margin-left: 280px;
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.light} 0%, 
    ${theme.colors.secondary.light} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  margin-top: ${theme.spacing.sm};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 40px;
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  
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

const CategoryTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.glass.border};
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.borderRadius.full};
  }
`;

const CategoryTab = styled(motion.button)<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${props => props.active 
    ? `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})` 
    : theme.colors.glass.background};
  color: ${props => props.active ? 'white' : theme.colors.text.secondary};
  border: 1px solid ${props => props.active 
    ? 'transparent' 
    : theme.colors.glass.border};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.md};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ProductCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.main};
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.main}20, 
    ${theme.colors.secondary.main}20);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProductBadge = styled.span<{ type?: 'new' | 'sale' | 'featured' }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${props => {
    switch (props.type) {
      case 'new': return theme.colors.success;
      case 'sale': return theme.colors.error;
      case 'featured': return theme.colors.warning;
      default: return theme.colors.primary.main;
    }
  }};
  color: white;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.lg};
`;

const ProductName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const ProductSKU = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.md};
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const ProductPrice = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.main};
`;

const ProductStock = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const ProductMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.glass.border};
`;

const Metric = styled.div`
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const MetricLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
`;

const categories = ['All Products', 'Beverages', 'Snacks', 'Dairy', 'Personal Care', 'Home Care', 'Fresh Food'];

const mockProducts = [
  {
    id: '1',
    name: 'Premium Coffee Blend',
    sku: 'BEV-COF-001',
    category: 'Beverages',
    price: 12.99,
    stock: 1250,
    sales: '2.5K',
    growth: '+15%',
    badge: 'featured' as const
  },
  {
    id: '2',
    name: 'Organic Green Tea',
    sku: 'BEV-TEA-002',
    category: 'Beverages',
    price: 8.49,
    stock: 850,
    sales: '1.8K',
    growth: '+22%',
    badge: 'new' as const
  },
  {
    id: '3',
    name: 'Chocolate Chip Cookies',
    sku: 'SNK-COO-001',
    category: 'Snacks',
    price: 4.99,
    stock: 2100,
    sales: '5.2K',
    growth: '+8%',
    badge: 'sale' as const
  },
  {
    id: '4',
    name: 'Natural Yogurt',
    sku: 'DAI-YOG-001',
    category: 'Dairy',
    price: 3.49,
    stock: 450,
    sales: '3.1K',
    growth: '+12%'
  },
  {
    id: '5',
    name: 'Shampoo Pro Care',
    sku: 'PER-SHA-001',
    category: 'Personal Care',
    price: 7.99,
    stock: 1800,
    sales: '2.9K',
    growth: '+18%',
    badge: 'featured' as const
  },
  {
    id: '6',
    name: 'All-Purpose Cleaner',
    sku: 'HOM-CLE-001',
    category: 'Home Care',
    price: 5.49,
    stock: 950,
    sales: '1.5K',
    growth: '+10%'
  }
];

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <HeaderTop>
            <div>
              <PageTitle>Products</PageTitle>
              <PageDescription>
                Manage your product catalog and inventory
              </PageDescription>
            </div>
            <HeaderActions>
              <SearchBar>
                <SearchIcon />
                <SearchInput 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchBar>
              <Button variant="outline" size="sm">
                <Filter size={16} />
                Filter
              </Button>
              <Button variant="primary" size="sm">
                <Plus size={16} />
                Add Product
              </Button>
            </HeaderActions>
          </HeaderTop>
        </PageHeader>

        <CategoryTabs>
          {categories.map(category => (
            <CategoryTab
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <ProductGrid>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <ProductImage>
                <Package size={48} color={theme.colors.text.tertiary} />
                {product.badge && (
                  <ProductBadge type={product.badge}>
                    {product.badge}
                  </ProductBadge>
                )}
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductSKU>SKU: {product.sku}</ProductSKU>
                
                <ProductDetails>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductStock>{product.stock} units</ProductStock>
                </ProductDetails>
                
                <ProductMetrics>
                  <Metric>
                    <MetricValue>{product.sales}</MetricValue>
                    <MetricLabel>Sales</MetricLabel>
                  </Metric>
                  <Metric>
                    <MetricValue>{product.growth}</MetricValue>
                    <MetricLabel>Growth</MetricLabel>
                  </Metric>
                </ProductMetrics>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </PageContent>
    </PageContainer>
  );
};