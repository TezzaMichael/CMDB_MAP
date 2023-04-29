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
    <Popover className="relative border-black border-1 radius-5 p-4">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Popover.Button>{data.label}</Popover.Button>
      <Popover.Panel>
        <div>{data.text}</div>
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
