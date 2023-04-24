import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import serverSvg from './server.svg';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1', text: 'Testo del primo nodo' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2', text: 'Testo del secondo nodo' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addServerNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: 200, y: 100 },
      data: {
        label: (nodes.length + 1).toString(),
        image: serverSvg,
        text: 'Testo del nuovo nodo',
      },
      style: {
        background: `url(${serverSvg}) center center / contain no-repeat`,
        width: '100px',
        height: '100px',
      },
    };
    setNodes((nodes) => nodes.concat(newNode));
  }, [nodes, setNodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const renderNode = useCallback(
    (node) => {
      return (
        <>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {node.data.label}
          </div>
          {selectedNode === node && (
            <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', padding: '10px', background: 'white', zIndex: 10 }}>
              {node.data.text}
            </div>
          )}
        </>
      );
    },
    [selectedNode]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={addServerNode}>Aggiungi Server</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeRenderer={renderNode}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}