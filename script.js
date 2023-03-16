const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const nodes = [];
const edges = [];

const n = 15; // number of nodes
const d = 50; // distance between nodes

// Create nodes
for (let i = 0; i < n; i++) {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  nodes.push({ x, y });
}

// Create edges
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < d) {
      edges.push({ i, j, distance });
    }
  }
}

// Sort edges by distance
edges.sort((a, b) => a.distance - b.distance);

// Create an array to keep track of the parent node of each node
const parent = new Array(n);
for (let i = 0; i < n; i++) {
  parent[i] = i;
}

// Find the parent node of a given node
function find(x) {
  if (parent[x] === x) {
    return x;
  }
  return find(parent[x]);
}

// Union two sets
function union(x, y) {
  parent[find(x)] = find(y);
}

// Draw nodes and edges
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < edges.length; i++) {
    const { i: node1, j: node2, distance } = edges[i];
    if (find(node1) !== find(node2)) {
      ctx.beginPath();
      ctx.moveTo(nodes[node1].x, nodes[node1].y);
      ctx.lineTo(nodes[node2].x, nodes[node2].y);
      ctx.strokeStyle = 'black';
      ctx.stroke();
      union(node1, node2);
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }
}

// Call the draw function
draw();
// ##This code will generate 15 nodes at random positions on the canvas, and then connect