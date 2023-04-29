import { Handle, Position } from "reactflow";
import { Popover } from "@headlessui/react";

function PopoverNode({
  data,
  isConnectable,
}: {
  data: { label: string; text: string, link: string };
  isConnectable: boolean;
}) {
  return (
    <Popover className="relative">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Popover.Button>{data.label}</Popover.Button>
      <Popover.Panel>
        <div className="">{data.text}</div>
        <a href={data.link} target="_blank" rel="noreferrer">
          {data.link}
        </a>
      </Popover.Panel>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </Popover>
  );
}

export default PopoverNode;
