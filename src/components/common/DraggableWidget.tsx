import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Settings, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Widget {
  id: string;
  title: string;
  content: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
}

interface DraggableWidgetProps {
  widget: Widget;
  onRemove?: (id: string) => void;
  onSettings?: (id: string) => void;
  onResize?: (id: string) => void;
  isFullscreen?: boolean;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  widget,
  onRemove,
  onSettings,
  onResize,
  isFullscreen = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2',
    full: 'col-span-4 row-span-2',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
        sizeClasses[widget.size || 'medium'],
        isDragging && 'opacity-50 shadow-lg z-50',
        'transition-all duration-200'
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <button
            className="cursor-move text-gray-400 hover:text-gray-600"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-medium text-gray-900">{widget.title}</h3>
        </div>
        
        <div className="flex items-center gap-1">
          {onResize && (
            <button
              onClick={() => onResize(widget.id)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          )}
          {onSettings && (
            <button
              onClick={() => onSettings(widget.id)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(widget.id)}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 h-full overflow-auto">
        {widget.content}
      </div>
    </div>
  );
};

interface DraggableDashboardProps {
  widgets: Widget[];
  onReorder: (widgets: Widget[]) => void;
  onRemoveWidget?: (id: string) => void;
  onSettingsWidget?: (id: string) => void;
  onResizeWidget?: (id: string) => void;
}

export const DraggableDashboard: React.FC<DraggableDashboardProps> = ({
  widgets,
  onReorder,
  onRemoveWidget,
  onSettingsWidget,
  onResizeWidget,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);
      const newWidgets = arrayMove(widgets, oldIndex, newIndex);
      onReorder(newWidgets);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={widgets.map((w) => w.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
          {widgets.map((widget) => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              onRemove={onRemoveWidget}
              onSettings={onSettingsWidget}
              onResize={onResizeWidget}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};