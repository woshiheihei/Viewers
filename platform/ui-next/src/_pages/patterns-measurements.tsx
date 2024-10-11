// src/_pages/patterns.tsx

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../tailwind.css';

import { Button } from '../components/Button';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '../components/Select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '../components/DropdownMenu';
import { Icons } from '../components/Icons/Icons';
import DataRow from '../_prototypes/DataRow/DataRow';
import dataList from '../_prototypes/DataRow/dataList.json';
import actionOptionsMap from '../_prototypes/DataRow/actionOptionsMap';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/Accordion/Accordion';
import { Slider } from '../components/Slider';
import { Switch } from '../components/Switch';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';

import { ChevronDownIcon } from '@radix-ui/react-icons';

interface DataItem {
  id: number;
  title: string;
  description: string;
  optionalField?: string;
  colorHex?: string;
  details?: string;
  series?: string;
}

interface ListGroup {
  type: string;
  items: DataItem[];
}

function Patterns() {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const handleAction = (id: string, action: string) => {
    console.log(`Action "${action}" triggered for item with id: ${id}`);
    // Implement actual action logic here
  };
  const handleRowSelect = (id: string) => {
    setSelectedRowId(prevSelectedId => (prevSelectedId === id ? null : id));
  };

  const organSegmentationGroup = dataList.find(
    (listGroup: ListGroup) => listGroup.type === 'Organ Segmentation'
  );
  const roiToolsGroup = dataList.find((listGroup: ListGroup) => listGroup.type === 'ROI Tools');

  if (!organSegmentationGroup) {
    return <div className="text-red-500">Organ Segmentation data not found.</div>;
  }

  if (!roiToolsGroup) {
    return <div className="text-red-500">ROI Tools data not found.</div>;
  }

  return (
    <div className="my-4 flex max-w-6xl justify-end py-6">
      {/* Simulated Panel List for "Segmentation" */}
      <div className="w-64 space-y-0">
        <Accordion
          type="multiple"
          defaultValue={['measurements-list', 'measurements-additional']}
          collapsible
        >
          {/* Segmentation Tools */}
          <AccordionItem value="measurements-list">
            <AccordionTrigger className="bg-popover hover:bg-accent text-muted-foreground my-0.5 flex h-7 w-full items-center justify-between rounded py-2 pr-1 pl-2 font-normal">
              <span>Measurements</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mx-2 my-0">
                <div className="text-foreground text-sm">2024-Jan-01</div>
                <div className="text-muted-foreground border-input border-b-2 pb-1 text-sm">
                  Study title lorem ipsum
                </div>
              </div>

              <div className="flex h-9 w-full items-center rounded pr-0.5">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="pl-1.5"
                  >
                    <Icons.Download />
                    <span className="pl-1">CSV</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="pl-0.5"
                  >
                    <Icons.Add />
                    Create DICOM SR
                  </Button>
                </div>
              </div>
              <div className="space-y-px">
                {roiToolsGroup.items.map((item, index) => {
                  const compositeId = `${roiToolsGroup.type}-${item.id}-panel`; // Ensure unique composite ID
                  return (
                    <DataRow
                      key={`panel-${compositeId}`} // Prefix to ensure uniqueness
                      number={index + 1}
                      title={item.title}
                      description={item.description}
                      optionalField={item.optionalField}
                      colorHex={item.colorHex}
                      details={item.details}
                      series={item.series} // Pass the new series field
                      actionOptions={actionOptionsMap[roiToolsGroup.type] || ['Action']}
                      onAction={(action: string) => handleAction(compositeId, action)}
                      isSelected={selectedRowId === compositeId}
                      onSelect={() => handleRowSelect(compositeId)}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Additional Findings */}
          <AccordionItem value="measurements-additional">
            <AccordionTrigger className="bg-popover hover:bg-accent text-muted-foreground my-0.5 flex h-7 w-full items-center justify-between rounded py-2 pr-1 pl-2 font-normal">
              <span>Additional Findings</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="bg-muted mb-0.5 h-12 rounded-b pb-3"></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Patterns />);