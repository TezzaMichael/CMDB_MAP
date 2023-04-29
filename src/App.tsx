import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  OnConnect,
  DefaultEdgeOptions,
  NodeTypes,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";
import serverSvg from "./server.svg";
import PopoverNode from "./components/PopoverNode";

const nodeTypes: NodeTypes = { popoverNode: PopoverNode };

const initialNodes: Node[] = [
  {
    id: "server-1",
    position: { x: 200, y: 250 },
    data: {
      label: `Server1`,
      image: serverSvg,
      text: `Testo del nuovo nodo server1`,
    },
    style: {
      background: `url(${serverSvg}) center center / contain no-repeat`,
      width: "100px",
      height: "100px",
    },
  },
  {
    id: "1",
    type: "popoverNode",
    position: { x: 200, y: 100 },
    data: { label: "Project1", text: "IP: 192.168.252.121", link: "https://acsdatasystems.sharepoint.com/teams/ITTechnology/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fteams%2FITTechnology%2FShared%20Documents%2FCybersecurity%2FScripts%20and%20code&FolderCTID=0x01200004CC67FB12D7244AB0B8255CEF3126DC" },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "Project2", text: "Testo del secondo nodo" },
  },
  {
    id: "requirements-1",
    position: { x: 300, y: 30 },
    data: { label: "Requirements1", text: "Testo del terzo nodo" },
  },
];
const initialEdges: Edge[] = [
  { id: "e1-2", animated: true, source: "1", target: "server-1" },
  { id: "e2-3", animated: true, source: "requirements-1", target: "1" },
];
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
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
        label: `Server ${nodes.length + 1}`,
        image: serverSvg,
        text: `Testo del nuovo nodo server ${nodes.length + 1}`,
      },
      style: {
        background: `url(${serverSvg}) center center / contain no-repeat`,
        width: "100px",
        height: "100px",
      },
    };
    setNodes([...nodes, newNode]);
  }, [nodes, setNodes]);

  const addProjectNode = useCallback(() => {
    const newNode: Node = {
      id: `project-${nodes.length + 1}`,
      position: { x: 200, y: 100 },
      data: {
        label: `Project ${nodes.length + 1}`,
        text: `Project ${nodes.length + 1} description`,
      },
      style: {
        background: "#fff",
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "10px",
      },
    };
    setNodes([...nodes, newNode]);
  }, [nodes, setNodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={addServerNode}>Aggiungi Server</button>
      <button onClick={addProjectNode}>Aggiungi Progetto</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;
