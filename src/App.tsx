import { useCallback } from "react";
import TurboNode, { TurboNodeData } from "./components/TurboNode";
import TurboEdge from "./components/TurboEdge";
import { TbServerBolt, TbCode, TbCodePlus } from "react-icons/tb";

import './index.css';

import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  OnConnect,
  NodeTypes,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

// const nodeTypes: NodeTypes = { popoverNode: PopoverNode };

const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "server-1",
    position: { x: 200, y: 250 },
    data: {
      icon: <TbServerBolt />,
      title: `Server1`,
      subline: "192.168.252.121",
      hasIconTopRight: true,
    },
    type: "turbo",
  },
  {
    id: "1",
    //type: "popoverNode",
    position: { x: 200, y: 100 },
    data: {
      icon: <TbCode />,
      title: "ProjectX",
    },
    type: "turbo",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: {
      icon: <TbCode />,
      title: "IoCManager",
      subline: "Giulian è bravo",
    },
    type: "turbo",
  },
  {
    id: "requirements-1",
    position: { x: 300, y: 30 },
    data: {
      icon: <TbCodePlus />,
      title: "Requirements1",
      subline: "Testo del terzo nodo",
    },
    type: "turbo",
  },
];
const initialEdges: Edge[] = [
  { id: "e1-2", animated: true, source: "1", target: "server-1" },
  { id: "e2-3", animated: true, source: "requirements-1", target: "1" },
];


const nodeTypes: NodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};


// const defaultEdgeOptions: DefaultEdgeOptions = { animated: true, };
const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addServerNode = useCallback(() => {
    const newNode: Node = {
      id: `server-${nodes.length + 1}`,
      position: { x: 200, y: 100 },
      data: {
        title: `Server ${nodes.length + 1}`,
        subline: `Testo del nuovo nodo server ${nodes.length + 1}`,
      },
      type: "turbo",
    };
    setNodes([...nodes, newNode]);
  }, [nodes, setNodes]);

  const addProjectNode = useCallback(() => {
    const newNode: Node = {
      id: `project-${nodes.length + 1}`,
      position: { x: 200, y: 100 },
      data: {
        title: `Project ${nodes.length + 1}`,
        subline: `Project ${nodes.length + 1} description`,
      },
      type: "turbo",
    };
    setNodes([...nodes, newNode]);
  }, [nodes, setNodes]);

  return (
    <div className="h-screen w-screen">
      <button onClick={addServerNode}>Aggiungi Server</button>
      <button onClick={addProjectNode}>Aggiungi Progetto</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls showInteractive={false} />
        <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;
