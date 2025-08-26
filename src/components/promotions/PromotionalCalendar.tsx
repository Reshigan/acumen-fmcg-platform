import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, Download } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  customer: string;
  brand: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'pending' | 'approved' | 'active' | 'completed';
  investment: number;
  expectedUplift: number;
  color: string;
}

interface CalendarProps {
  promotions?: Promotion[];
  onPromotionMove?: (promotion: Promotion, newDate: Date) => void;
  onPromotionClick?: (promotion: Promotion) => void;
}

const CalendarContainer = styled.div`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xxl};
  padding: ${theme.spacing.xl};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.glass.border};
`;

const CalendarTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const MonthDisplay = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.light} 0%, 
    ${theme.colors.secondary.light} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const NavButton = styled(motion.button)`
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: white;
    transform: scale(1.05);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ActionButtons = styled.div`
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
  font-weight: ${theme.typography.fontWeight.medium};
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

const CalendarGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

const WeekdayHeader = styled.div`
  background: ${theme.colors.background.secondary};
  padding: ${theme.spacing.md};
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DayCell = styled.div<{ isToday?: boolean; isOtherMonth?: boolean; isWeekend?: boolean }>`
  background: ${props => props.isToday 
    ? `${theme.colors.primary.main}10` 
    : props.isWeekend 
    ? theme.colors.glass.background 
    : theme.colors.background.primary};
  padding: ${theme.spacing.sm};
  min-height: 120px;
  position: relative;
  opacity: ${props => props.isOtherMonth ? 0.5 : 1};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${props => !props.isOtherMonth && theme.colors.glass.background};
  }
`;

const DayNumber = styled.div<{ isToday?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${props => props.isToday ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
  color: ${props => props.isToday ? theme.colors.primary.main : theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs};
`;

const PromotionItem = styled(motion.div)<{ color: string }>`
  background: ${props => props.color};
  color: white;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  margin-bottom: ${theme.spacing.xs};
  cursor: move;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${theme.shadows.md};
  }
`;

const FilterPanel = styled(motion.div)`
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const FilterOptions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterChip = styled(motion.button)<{ active?: boolean }>`
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
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    border-color: ${theme.colors.primary.main};
  }
`;

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

export const PromotionalCalendar: React.FC<CalendarProps> = ({
  promotions = [],
  onPromotionMove,
  onPromotionClick
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [draggedPromotion, setDraggedPromotion] = useState<Promotion | null>(null);
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isOtherMonth: true
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isOtherMonth: false
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isOtherMonth: true
      });
    }
    
    return days;
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  
  const getPromotionsForDay = (date: Date) => {
    return promotions.filter(promo => {
      const promoStart = new Date(promo.startDate);
      const promoEnd = new Date(promo.endDate);
      return date >= promoStart && date <= promoEnd;
    });
  };
  
  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };
  
  const handleDragStart = (e: React.DragEvent, promotion: Promotion) => {
    setDraggedPromotion(promotion);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    if (draggedPromotion && onPromotionMove) {
      onPromotionMove(draggedPromotion, date);
    }
    setDraggedPromotion(null);
  };
  
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const days = getDaysInMonth(currentMonth);
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          <Calendar size={24} color={theme.colors.primary.main} />
          <MonthDisplay>
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </MonthDisplay>
        </CalendarTitle>
        
        <NavigationButtons>
          <NavButton
            onClick={() => navigateMonth(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft />
          </NavButton>
          <NavButton
            onClick={() => setCurrentMonth(new Date())}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Today
          </NavButton>
          <NavButton
            onClick={() => navigateMonth(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight />
          </NavButton>
        </NavigationButtons>
        
        <ActionButtons>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus />
            Add Promotion
          </ActionButton>
          <ActionButton
            onClick={() => setShowFilters(!showFilters)}
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
        </ActionButtons>
      </CalendarHeader>
      
      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FilterOptions>
              {['draft', 'pending', 'approved', 'active', 'completed'].map(status => (
                <FilterChip 
                  key={status}
                  active={activeFilters.includes(status)}
                  onClick={() => toggleFilter(status)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </FilterChip>
              ))}
            </FilterOptions>
          </FilterPanel>
        )}
      </AnimatePresence>
      
      <CalendarGrid>
        {weekdays.map(day => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}
        
        {days.map((day, index) => {
          const dayPromotions = getPromotionsForDay(day.date);
          const filteredPromotions = activeFilters.length > 0 
            ? dayPromotions.filter(p => activeFilters.includes(p.status))
            : dayPromotions;
          
          return (
            <DayCell
              key={index}
              isToday={isToday(day.date)}
              isOtherMonth={day.isOtherMonth}
              isWeekend={isWeekend(day.date)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day.date)}
            >
              <DayNumber isToday={isToday(day.date)}>
                {day.date.getDate()}
              </DayNumber>
              
              {filteredPromotions.map((promotion) => (
                <PromotionItem
                  key={promotion.id}
                  color={promotion.color}
                  draggable
                  onDragStart={(e) => handleDragStart(e, promotion)}
                  onClick={() => onPromotionClick?.(promotion)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {promotion.title}
                </PromotionItem>
              ))}
            </DayCell>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};