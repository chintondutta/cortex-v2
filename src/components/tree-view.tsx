import { TreeItem } from "@/types";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarGroupContent,
    SidebarMenuSub,
    SidebarRail,
} from "@/components/ui/sidebar";
import { FileIcon, ChevronRightIcon, FolderIcon } from "lucide-react";

interface TreeViewProps {
    data: TreeItem[];
    value: string | null;
    onSelect?: (value: string) => void;
};

export const TreeView = ({
    data,
    value,
    onSelect,
}: TreeViewProps) => {
    return (
        <SidebarProvider>
            <Sidebar collapsible="none" className="w-full">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.map((item, index) => (
                                    <Tree key={index} item={item} selectedValue={value} onSelect={onSelect} parentPath="" />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
        </SidebarProvider>
    )
};

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string) => void;
    parentPath: string;
}

const Tree = ({item, selectedValue, onSelect, parentPath}: TreeProps) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if(!items.length) {
        const isSelected = selectedValue === currentPath;

        return (
            <SidebarMenuButton 
                isActive={isSelected}  
                className="data-[active=true]:bg-transparent" 
                onClick={() => onSelect?.(currentPath)}
            >
                <FileIcon />
                <span className="truncate">
                    {name}
                </span>
            </SidebarMenuButton>
        )
    }

    return (
        <SidebarMenuItem>
            <Collapsible className="group/collapsible [&[data-state=open]>svg:first-child]:rotate-90" defaultOpen>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRightIcon className="transition-transform"/>
                        <FolderIcon />
                        <span className="truncate">{name}</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((item, index) => (
                            <Tree key={index} item={item} selectedValue={selectedValue} onSelect={onSelect} parentPath={currentPath} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}
