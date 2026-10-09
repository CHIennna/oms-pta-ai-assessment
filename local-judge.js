const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const isWindows = process.platform === 'win32';
const executable = name => path.join(name.workDir, isWindows ? 'program.exe' : 'program');
const DEFAULT_TOOLCHAINS = {
  'C++ (g++)': {
    commands: ['g++'],
    file: 'main.cpp',
    compile: job => ({ command: 'g++', args: ['-O2', '-std=c++17', job.sourcePath, '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  'C++ (clang++)': {
    commands: ['clang++'],
    file: 'main.cpp',
    compile: job => ({ command: 'clang++', args: ['-O2', '-std=c++17', job.sourcePath, '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  'C (gcc)': {
    commands: ['gcc'],
    file: 'main.c',
    compile: job => ({ command: 'gcc', args: ['-O2', '-std=c11', job.sourcePath, '-lm', '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  'C (clang)': {
    commands: ['clang'],
    file: 'main.c',
    compile: job => ({ command: 'clang', args: ['-O2', '-std=c11', job.sourcePath, '-lm', '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  Java: {
    commands: ['javac', 'java'],
    file: 'Main.java',
    compile: job => ({ command: 'javac', args: ['-J-Xms16m', '-J-Xmx256m', '-J-XX:MaxMetaspaceSize=128m', '-encoding', 'UTF-8', job.sourcePath], skipAddressLimit: true }),
    run: job => ({ command: 'java', args: ['-Xms16m', '-Xss16m', '-Xmx192m', '-XX:MaxMetaspaceSize=96m', '-cp', job.workDir, 'Main'], skipAddressLimit: true })
  },
  'Python 3': {
    commands: [process.platform === 'win32' ? 'python' : 'python3'],
    file: 'main.py',
    run: job => ({ command: process.platform === 'win32' ? 'python' : 'python3', args: ['-I', job.sourcePath] })
  }
};

const LANGUAGE_ALIASES = {
  cpp: 'C++ (g++)', 'c++': 'C++ (g++)', gpp: 'C++ (g++)',
  clangpp: 'C++ (clang++)', c: 'C (gcc)', gcc: 'C (gcc)', clang: 'C (clang)',
  java: 'Java', python: 'Python 3', python3: 'Python 3', py: 'Python 3'
};

const clamp = (value, fallback, minimum, maximum) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, Math.round(number))) : fallback;
};
const normalized = text => String(text || '').replace(/\r\n/g, '\n').replace(/[ \t]+(?=\n)/g, '').trimEnd();
const clipped = (value, limit = 120000) => String(value || '').slice(0, limit);
function checkSeilorPermutation(input, output, expected) {
  const [n, k] = String(input || '').trim().split(/\s+/).map(Number);
  const expectedStatus = String(expected || '').trim().split(/\s+/)[0];
  const tokens = String(output || '').trim().split(/\s+/).filter(Boolean);
  if (!Number.isInteger(n) || n < 1 || !Number.isInteger(k) || k < 2 || !tokens.length) return false;
  if (expectedStatus === 'NO') return tokens.length === 1 && tokens[0] === 'NO';
  if (expectedStatus !== 'YES' || tokens[0] !== 'YES' || tokens.length !== n + 1) return false;
  const values = tokens.slice(1).map(token => /^\d+$/.test(token) ? Number(token) : NaN);
  if (values.some(value => !Number.isInteger(value) || value < 1 || value > n)) return false;
  if (new Set(values).size !== n) return false;
  return values.slice(1).every((value, index) => {
    const difference = Math.abs(value - values[index]);
    return difference > 1 && difference <= k;
  });
}

const inputTokens = value => String(value || '').trim().split(/\s+/).filter(Boolean);

function checkTriangleEuler(input, output) {
  const n = Number(inputTokens(input)[0]);
  const path = inputTokens(output);
  if (!Number.isInteger(n) || n < 1 || n > 20 || path.length !== 1) return false;
  const route = path[0];
  const edgeCount = 3 * n * (n + 1) / 2;
  if (route.length !== edgeCount || /[^0-5]/.test(route)) return false;
  const nodeId = (row, column) => row * (row + 1) / 2 + column;
  let row = 0, column = 0;
  const visited = new Set();
  for (const step of route) {
    const next = Number(step);
    const from = nodeId(row, column);
    if (next === 0) column++;
    else if (next === 1) { row--; }
    else if (next === 2) { row--; column--; }
    else if (next === 3) column--;
    else if (next === 4) row++;
    else { row++; column++; }
    if (row < 0 || row > n || column < 0 || column > row) return false;
    const to = nodeId(row, column);
    const edge = from < to ? `${from}:${to}` : `${to}:${from}`;
    if (visited.has(edge)) return false;
    visited.add(edge);
  }
  return row === 0 && column === 0 && visited.size === edgeCount;
}

function checkOperationConstruction(input, output) {
  const targets = inputTokens(input).slice(1).map(value => BigInt(value));
  const tokens = inputTokens(output);
  let cursor = 0;
  for (const target of targets) {
    const count = Number(tokens[cursor++]);
    const operations = tokens[cursor++];
    if (!Number.isInteger(count) || count < 1 || count > 100 || !operations || operations.length !== count || /[^12]/.test(operations)) return false;
    let value = 1n;
    for (const operation of operations) value = operation === '1' ? value * 2n : value * 2n - 1n;
    if (value !== target) return false;
  }
  return cursor === tokens.length;
}

function checkFzuSubsequence(input, output) {
  const values = inputTokens(input).slice(1).map(value => BigInt(value));
  const strings = inputTokens(output);
  if (values.length !== strings.length) return false;
  return strings.every((value, index) => {
    if (!value.length || value.length > 5000 || /[^fzu]/.test(value)) return false;
    let f = 0n, fz = 0n, fzu = 0n;
    for (const character of value) {
      if (character === 'f') f++;
      else if (character === 'z') fz += f;
      else fzu += fz;
    }
    return fzu === values[index];
  });
}

function checkNonattackingRooks(input, output) {
  const [n, m, k] = inputTokens(input).map(Number);
  const tokens = inputTokens(output);
  if (![n, m, k].every(Number.isInteger) || n < 1 || m < 1 || k < 0 || !tokens.length) return false;
  if (k > Math.min(n, m)) return tokens.length === 1 && tokens[0].toLowerCase() === 'no';
  if (tokens[0].toLowerCase() !== 'yes' || tokens.length !== n + 1) return false;
  const columns = new Set();
  let rooks = 0;
  for (const row of tokens.slice(1)) {
    if (row.length !== m || /[^*.]/.test(row)) return false;
    let rowRooks = 0;
    for (let column = 0; column < m; column++) {
      if (row[column] !== '*') continue;
      rowRooks++;
      rooks++;
      if (columns.has(column)) return false;
      columns.add(column);
    }
    if (rowRooks > 1) return false;
  }
  return rooks === k;
}

function checkTreeEccentricity(input, output, expected) {
  const data = inputTokens(input).map(Number);
  const expectedTokens = inputTokens(expected);
  const tokens = inputTokens(output);
  let dataCursor = 1, outputCursor = 0, expectedCursor = 0;
  const cases = data[0];
  if (!Number.isInteger(cases) || cases < 1) return false;
  for (let test = 0; test < cases; test++) {
    const n = data[dataCursor++];
    if (!Number.isInteger(n) || n < 1 || dataCursor + n > data.length) return false;
    const required = data.slice(dataCursor, dataCursor + n);
    dataCursor += n;
    const possible = String(expectedTokens[expectedCursor++] || '').toLowerCase() === 'yes';
    const status = String(tokens[outputCursor++] || '').toLowerCase();
    if (!possible) {
      if (status !== 'no') return false;
      continue;
    }
    if (status !== 'yes') return false;
    expectedCursor += 2 * (n - 1);
    const adjacency = Array.from({ length: n }, () => []);
    const parent = Array.from({ length: n }, (_, index) => index);
    const find = value => {
      while (parent[value] !== value) { parent[value] = parent[parent[value]]; value = parent[value]; }
      return value;
    };
    for (let edge = 0; edge < n - 1; edge++) {
      const from = Number(tokens[outputCursor++]) - 1;
      const to = Number(tokens[outputCursor++]) - 1;
      if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= n || to >= n || from === to) return false;
      const rootFrom = find(from), rootTo = find(to);
      if (rootFrom === rootTo) return false;
      parent[rootFrom] = rootTo;
      adjacency[from].push(to);
      adjacency[to].push(from);
    }
    const distancesFrom = source => {
      const distances = Array(n).fill(-1), queue = [source];
      let farthest = source;
      distances[source] = 0;
      for (let head = 0; head < queue.length; head++) {
        const vertex = queue[head];
        for (const neighbor of adjacency[vertex]) {
          if (distances[neighbor] >= 0) continue;
          distances[neighbor] = distances[vertex] + 1;
          if (distances[neighbor] > distances[farthest]) farthest = neighbor;
          queue.push(neighbor);
        }
      }
      return { distances, farthest };
    };
    const first = distancesFrom(0);
    if (first.distances.some(distance => distance < 0)) return false;
    const leftEndpoint = distancesFrom(first.farthest);
    const left = leftEndpoint.distances;
    const rightEnd = leftEndpoint.farthest;
    const right = distancesFrom(rightEnd).distances;
    for (let vertex = 0; vertex < n; vertex++) {
      if (Math.max(left[vertex], right[vertex]) + 1 !== required[vertex]) return false;
    }
  }
  return dataCursor === data.length && outputCursor === tokens.length && expectedCursor === expectedTokens.length;
}

function checkPrefixMultiplePermutation(input, output, expected) {
  const data = inputTokens(input).map(Number), answer = inputTokens(output).map(Number), reference = inputTokens(expected).map(Number);
  const [n, required] = data;
  if (!Number.isInteger(n) || n < 2 || !Number.isInteger(required) || data.length !== 2) return false;
  if (reference[0] === -1) return answer.length === 1 && answer[0] === -1;
  if (answer.length !== n || new Set(answer).size !== n || answer.some(value => !Number.isInteger(value) || value < 1 || value > n)) return false;
  let prefix = 0, count = 0;
  for (const value of answer) { prefix += value; if (prefix % n === 0) count++; }
  return count === required;
}

function checkAdjacentSwapConstruction(input, output) {
  const data = inputTokens(input), tokens = inputTokens(output);
  let pairs;
  if (data.length >= 3 && /^\d+$/.test(data[0]) && Number(data[0]) === (data.length - 1) / 2) pairs = data.slice(1).reduce((all, _, index, rest) => index % 2 === 0 ? [...all, rest.slice(index, index + 2)] : all, []);
  else if (data.length >= 2 && data.length % 2 === 0) pairs = data.reduce((all, _, index, rest) => index % 2 === 0 ? [...all, rest.slice(index, index + 2)] : all, []);
  else return false;
  let cursor = 0;
  for (const [source, target] of pairs) {
    if (!source || !target || source.length !== target.length) return false;
    const rawCount = tokens[cursor++], count = Number(rawCount);
    if (!Number.isInteger(count) || count < 0 || count > 10000000 || cursor + count > tokens.length) return false;
    const letters = [...source];
    for (let i = 0; i < count; i++) {
      const position = Number(tokens[cursor++]);
      if (!Number.isInteger(position) || position < 1 || position >= letters.length) return false;
      [letters[position - 1], letters[position]] = [letters[position], letters[position - 1]];
    }
    if (letters.join('') !== target) return false;
  }
  return cursor === tokens.length;
}

function checkGridSmallerNeighbors(input, output) {
  const data = inputTokens(input).map(Number), answer = inputTokens(output).map(Number);
  const [rows, columns] = data;
  if (!Number.isInteger(rows) || !Number.isInteger(columns) || rows < 1 || columns < 1 || rows * columns > 500000 || data.length !== rows * columns + 2 || answer.length !== rows * columns) return false;
  const constraints = data.slice(2), grid = Array.from({ length: rows }, (_, row) => answer.slice(row * columns, (row + 1) * columns));
  if (answer.some(value => !Number.isFinite(value)) || new Set(answer).size !== answer.length) return false;
  for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
    const value = grid[row][column];
    let smaller = 0;
    if (row > 0 && grid[row - 1][column] < value) smaller++;
    if (row + 1 < rows && grid[row + 1][column] < value) smaller++;
    if (column > 0 && grid[row][column - 1] < value) smaller++;
    if (column + 1 < columns && grid[row][column + 1] < value) smaller++;
    if (smaller !== constraints[row * columns + column]) return false;
  }
  return true;
}

function checkFloatingResistance(input, output, expected) {
  const actual = inputTokens(output), answer = inputTokens(expected);
  if (!actual.length || actual.length !== answer.length) return false;
  return answer.every((value, index) => {
    const target = Number(value), candidate = Number(actual[index]);
    if (!Number.isFinite(target) || !Number.isFinite(candidate)) return false;
    if (target === -1) return candidate === -1;
    return Math.abs(candidate - target) <= Math.max(5.1e-10, 1e-10 * Math.abs(target));
  });
}

function checkBrooksParty(input, output) {
  const data = inputTokens(input).map(Number), colors = inputTokens(output).map(Number);
  const n = data[0];
  if (!Number.isInteger(n) || n < 2 || n % 2 || data.length !== 1 + 2 * n || colors.length !== n) return false;
  if (colors.some(color => !Number.isInteger(color) || color < 1 || color > 4)) return false;
  const arrangements = [data.slice(1, n + 1), data.slice(n + 1)];
  return arrangements.every(arrangement => arrangement.every((person, index) => {
    const next = arrangement[(index + 1) % n];
    return Number.isInteger(person) && Number.isInteger(next) && person >= 1 && person <= n && next >= 1 && next <= n && colors[person - 1] !== colors[next - 1];
  }));
}

function checkSpecialOutput(checker, input, output, expected) {
  if (checker === 'fzu-prefix-multiple-permutation') return checkPrefixMultiplePermutation(input, output, expected);
  if (checker === 'fzu-adjacent-swap-construction') return checkAdjacentSwapConstruction(input, output);
  if (checker === 'fzu-grid-smaller-neighbors') return checkGridSmallerNeighbors(input, output);
  if (checker === 'fzu-fence-construction') return checkFenceConstruction(input, output);
  if (checker === 'fzu-xyz-constraints') return checkXyzConstraints(input, output);
  if (checker === 'fzu-distinct-xor-partition') return checkDistinctXorPartition(input, output);
  if (checker === 'fzu-knight-matching') return checkKnightMatching(input, output);
  if (checker === 'fzu-divisibility-antichain') return checkDivisibilityAntichain(input, output);
  if (checker === 'fzu-triangle-euler') return checkTriangleEuler(input, output);
  if (checker === 'fzu-operation-construction') return checkOperationConstruction(input, output);
  if (checker === 'fzu-subsequence-fzu') return checkFzuSubsequence(input, output);
  if (checker === 'fzu-nonattacking-rooks') return checkNonattackingRooks(input, output);
  if (checker === 'fzu-tree-eccentricity') return checkTreeEccentricity(input, output, expected);
  if (checker === 'fzu-seilor-permutation') return checkSeilorPermutation(input, output, expected);
  if (checker === 'fzu-floating-resistance') return checkFloatingResistance(input, output, expected);
  if (checker === 'fzu-brooks-party') return checkBrooksParty(input, output);
  return normalized(output) === normalized(expected);
}

function checkFenceConstruction(input, output) {
  const [rawN, colors] = inputTokens(input);
  const n = Number(rawN), tokens = inputTokens(output);
  if (!Number.isInteger(n) || n < 1 || colors?.length !== n || /[^01]/.test(colors) || !tokens.length) return false;
  const k = Number(tokens[0]);
  if (!Number.isInteger(k) || k < 0 || k > Math.floor(n / 2) || n - 2 * k > Math.floor(n * 0.16) || tokens.length !== 1 + 2 * k) return false;
  const left = tokens.slice(1, 1 + k).map(Number), right = tokens.slice(1 + k).map(Number);
  const used = new Uint8Array(n + 1);
  for (const indices of [left, right]) {
    for (let index = 0; index < indices.length; index++) {
      const current = indices[index];
      if (!Number.isInteger(current) || current < 1 || current > n || (index && current <= indices[index - 1]) || used[current]) return false;
      used[current] = 1;
    }
  }
  return left.every((index, position) => colors[index - 1] === colors[right[position] - 1]);
}

function xyzSatisfiable(n, m, constraints) {
  const variables = n + 2 * m, nodeCount = variables * 2;
  const graph = Array.from({ length: nodeCount }, () => []), reverse = Array.from({ length: nodeCount }, () => []);
  const truth = variable => variable * 2, falsity = variable => variable * 2 + 1;
  const clause = (left, right) => {
    const fromLeft = left ^ 1, fromRight = right ^ 1;
    graph[fromLeft].push(right); reverse[right].push(fromLeft);
    graph[fromRight].push(left); reverse[left].push(fromRight);
  };
  const unit = literal => clause(literal, literal);
  const equivalent = (left, right) => { clause(left ^ 1, right); clause(left, right ^ 1); };
  const equivalentNot = (left, right) => { clause(left ^ 1, right ^ 1); clause(left, right); };
  for (let operator = 0; operator < m; operator++) {
    const firstBit = n + 2 * operator, secondBit = firstBit + 1;
    clause(truth(firstBit), falsity(secondBit)); // & = 00, | = 10, ^ = 11
  }
  for (const [oneBasedX, oneBasedOp, y, z] of constraints) {
    const x = oneBasedX - 1, firstBit = n + 2 * (oneBasedOp - 1), secondBit = firstBit + 1;
    if (y === 0 && z === 0) {
      clause(falsity(x), falsity(firstBit));
      clause(falsity(x), falsity(secondBit));
    } else if (y === 0 && z === 1) {
      unit(truth(x)); unit(truth(firstBit));
    } else if (y === 1 && z === 0) {
      equivalent(truth(x), truth(firstBit));
      equivalent(truth(x), truth(secondBit));
    } else {
      equivalentNot(truth(x), truth(firstBit));
    }
  }
  const visited = new Uint8Array(nodeCount), order = [];
  for (let start = 0; start < nodeCount; start++) {
    if (visited[start]) continue;
    const nodes = [start], cursors = [0]; visited[start] = 1;
    while (nodes.length) {
      const top = nodes.length - 1, vertex = nodes[top], edges = graph[vertex];
      if (cursors[top] < edges.length) {
        const next = edges[cursors[top]++];
        if (!visited[next]) { visited[next] = 1; nodes.push(next); cursors.push(0); }
      } else { order.push(vertex); nodes.pop(); cursors.pop(); }
    }
  }
  const component = new Int32Array(nodeCount); component.fill(-1);
  let componentId = 0;
  for (let index = order.length - 1; index >= 0; index--) {
    const start = order[index];
    if (component[start] >= 0) continue;
    component[start] = componentId;
    const stack = [start];
    while (stack.length) {
      const vertex = stack.pop();
      for (const next of reverse[vertex]) if (component[next] < 0) { component[next] = componentId; stack.push(next); }
    }
    componentId++;
  }
  for (let variable = 0; variable < variables; variable++) if (component[truth(variable)] === component[falsity(variable)]) return false;
  return true;
}

function checkXyzConstraints(input, output) {
  const data = inputTokens(input).map(Number), tokens = inputTokens(output);
  if (!Number.isInteger(data[0]) || data[0] < 1) return false;
  let inputCursor = 1, outputCursor = 0;
  for (let test = 0; test < data[0]; test++) {
    const n = data[inputCursor++], m = data[inputCursor++], k = data[inputCursor++];
    if (![n, m, k].every(Number.isInteger) || n < 1 || m < 1 || k < 0 || inputCursor + 4 * k > data.length) return false;
    const constraints = [];
    for (let i = 0; i < k; i++) constraints.push(data.slice(inputCursor + i * 4, inputCursor + i * 4 + 4));
    inputCursor += 4 * k;
    const status = String(tokens[outputCursor++] || '').toUpperCase();
    if (status === 'NO') {
      if (xyzSatisfiable(n, m, constraints)) return false;
      continue;
    }
    if (status !== 'YES') return false;
    const values = tokens[outputCursor++], operators = tokens[outputCursor++];
    if (!values || values.length !== n || /[^01]/.test(values) || !operators || operators.length !== m || /[^&|^]/.test(operators)) return false;
    for (const [oneBasedX, oneBasedOp, y, z] of constraints) {
      const x = Number(values[oneBasedX - 1]), op = operators[oneBasedOp - 1];
      const result = op === '&' ? x & y : op === '|' ? x | y : x ^ y;
      if (result !== z) return false;
    }
  }
  return inputCursor === data.length && outputCursor === tokens.length;
}

function xorPartitionPossible(values) {
  let total = 0;
  for (const value of values) total ^= value;
  if (total !== 0) return true;
  let prefix = 0;
  const nonzero = new Set();
  for (let index = 0; index < values.length - 1; index++) {
    prefix ^= values[index];
    if (prefix !== 0) nonzero.add(prefix);
  }
  return nonzero.size >= 2;
}

function checkDistinctXorPartition(input, output) {
  const data = inputTokens(input).map(Number), tokens = inputTokens(output);
  if (!Number.isInteger(data[0]) || data[0] < 1) return false;
  let inputCursor = 1, outputCursor = 0;
  for (let test = 0; test < data[0]; test++) {
    const n = data[inputCursor++];
    if (!Number.isInteger(n) || n < 2 || inputCursor + n > data.length) return false;
    const values = data.slice(inputCursor, inputCursor + n); inputCursor += n;
    const possible = xorPartitionPossible(values), status = String(tokens[outputCursor++] || '').toLowerCase();
    if (!possible) { if (status !== 'no') return false; continue; }
    if (status !== 'yes') return false;
    const count = Number(tokens[outputCursor++]);
    if (!Number.isInteger(count) || count < 2 || count > n || outputCursor + count * 2 > tokens.length) return false;
    const prefix = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] ^ values[i];
    const covered = new Uint8Array(n), segmentXors = new Set();
    for (let segment = 0; segment < count; segment++) {
      const left = Number(tokens[outputCursor++]), right = Number(tokens[outputCursor++]);
      if (!Number.isInteger(left) || !Number.isInteger(right) || left < 1 || right > n || left > right) return false;
      const value = prefix[right] ^ prefix[left - 1];
      if (segmentXors.has(value)) return false;
      segmentXors.add(value);
      for (let index = left - 1; index < right; index++) { if (covered[index]) return false; covered[index] = 1; }
    }
    if (covered.some(value => value !== 1)) return false;
  }
  return inputCursor === data.length && outputCursor === tokens.length;
}

const KNIGHT_MOVES = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
const knightMatchingCache = new Map();
function maximumKnightPairs(rows, columns) {
  const key = `${rows}x${columns}`;
  if (knightMatchingCache.has(key)) return knightMatchingCache.get(key);
  const cells = rows * columns, left = [];
  for (let cell = 0; cell < cells; cell++) if (((Math.floor(cell / columns) + cell % columns) & 1) === 0) left.push(cell);
  const pairLeft = new Int32Array(cells), pairRight = new Int32Array(cells), distance = new Int32Array(cells);
  pairLeft.fill(-1); pairRight.fill(-1);
  const neighbors = cell => {
    const row = Math.floor(cell / columns), column = cell % columns, result = [];
    for (const [dr, dc] of KNIGHT_MOVES) {
      const nextRow = row + dr, nextColumn = column + dc;
      if (nextRow >= 0 && nextRow < rows && nextColumn >= 0 && nextColumn < columns) result.push(nextRow * columns + nextColumn);
    }
    return result;
  };
  const bfs = () => {
    const queue = [];
    for (const cell of left) { if (pairLeft[cell] < 0) { distance[cell] = 0; queue.push(cell); } else distance[cell] = -1; }
    let found = false;
    for (let head = 0; head < queue.length; head++) for (const next of neighbors(queue[head])) {
      const matched = pairRight[next];
      if (matched < 0) found = true;
      else if (distance[matched] < 0) { distance[matched] = distance[queue[head]] + 1; queue.push(matched); }
    }
    return found;
  };
  const dfs = cell => {
    for (const next of neighbors(cell)) {
      const matched = pairRight[next];
      if (matched < 0 || (distance[matched] === distance[cell] + 1 && dfs(matched))) {
        pairLeft[cell] = next; pairRight[next] = cell; return true;
      }
    }
    distance[cell] = -1;
    return false;
  };
  let matching = 0;
  while (bfs()) for (const cell of left) if (pairLeft[cell] < 0 && dfs(cell)) matching++;
  knightMatchingCache.set(key, matching);
  return matching;
}

function checkKnightMatching(input, output) {
  const data = inputTokens(input).map(Number), tokens = inputTokens(output);
  if (!Number.isInteger(data[0]) || data[0] < 1) return false;
  let inputCursor = 1, outputCursor = 0;
  for (let test = 0; test < data[0]; test++) {
    const rows = data[inputCursor++], columns = data[inputCursor++], total = rows * columns;
    if (![rows, columns].every(Number.isInteger) || rows < 1 || columns < 1) return false;
    const count = Number(tokens[outputCursor++]);
    if (!Number.isInteger(count) || count < 0 || count > Math.floor(total / 2) || outputCursor + count * 4 > tokens.length) return false;
    const used = new Uint8Array(total);
    for (let pair = 0; pair < count; pair++) {
      const r1 = Number(tokens[outputCursor++]) - 1, c1 = Number(tokens[outputCursor++]) - 1;
      const r2 = Number(tokens[outputCursor++]) - 1, c2 = Number(tokens[outputCursor++]) - 1;
      if (![r1, c1, r2, c2].every(Number.isInteger) || r1 < 0 || c1 < 0 || r2 < 0 || c2 < 0 || r1 >= rows || r2 >= rows || c1 >= columns || c2 >= columns) return false;
      const first = r1 * columns + c1, second = r2 * columns + c2;
      if (first === second || used[first] || used[second]) return false;
      const dr = Math.abs(r1 - r2), dc = Math.abs(c1 - c2);
      if (!((dr === 1 && dc === 2) || (dr === 2 && dc === 1))) return false;
      used[first] = used[second] = 1;
    }
    if (count !== maximumKnightPairs(rows, columns)) return false;
  }
  return inputCursor === data.length && outputCursor === tokens.length;
}

function checkDivisibilityAntichain(input, output) {
  const limits = inputTokens(input).map(Number), tokens = inputTokens(output);
  if (!Number.isInteger(limits[0]) || limits[0] < 1) return false;
  let inputCursor = 1, outputCursor = 0;
  for (let test = 0; test < limits[0]; test++) {
    const n = limits[inputCursor++], count = Number(tokens[outputCursor++]);
    if (!Number.isInteger(n) || n < 1 || !Number.isInteger(count) || count !== Math.ceil(n / 2) || outputCursor + count > tokens.length) return false;
    const selected = new Uint8Array(n + 1);
    for (let i = 0; i < count; i++) {
      const value = Number(tokens[outputCursor++]);
      if (!Number.isInteger(value) || value < 1 || value > n || selected[value]) return false;
      selected[value] = 1;
    }
    for (let value = 1; value <= n; value++) if (selected[value]) {
      for (let multiple = value * 2; multiple <= n; multiple += value) if (selected[multiple]) return false;
    }
  }
  return inputCursor === limits.length && outputCursor === tokens.length;
}
const commandAvailable = command => {
  if (!command) return false;
  const probe = spawnSync(command, ['--version'], { windowsHide: true, stdio: 'ignore', timeout: 1500 });
  return !probe.error && probe.status === 0;
};
const resolveCommand = command => {
  if (!command || path.isAbsolute(command)) return command;
  const probe = spawnSync(isWindows ? 'where.exe' : 'which', [command], { windowsHide: true, encoding: 'utf8', timeout: 1500 });
  const located = !probe.error && probe.status === 0 ? String(probe.stdout || '').split(/\r?\n/).find(Boolean) : '';
  return located || command;
};

function killProcessTree(child) {
  if (!child || !child.pid) return;
  if (isWindows) {
    try { child.kill('SIGKILL'); } catch {}
    const killer = spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { windowsHide: true, stdio: 'ignore' });
    killer.unref();
    return;
  }
  try { process.kill(-child.pid, 'SIGKILL'); } catch { try { child.kill('SIGKILL'); } catch {} }
}

function limitedCommand(spec, limits, usePrlimit) {
  if (process.platform !== 'linux' || !usePrlimit) return spec;
  const args = [];
  if (limits.cpuSeconds) args.push(`--cpu=${limits.cpuSeconds}`);
  if (limits.addressBytes && !spec.skipAddressLimit) args.push(`--as=${limits.addressBytes}`);
  if (limits.fileBytes) args.push(`--fsize=${limits.fileBytes}`);
  args.push(`--nproc=${limits.processes || 32}`, `--nofile=${limits.openFiles || 64}`, '--', spec.command, ...(spec.args || []));
  return { command: 'prlimit', args };
}

function runProcess(spec, options) {
  return new Promise(resolve => {
    const started = Date.now();
    const command = limitedCommand(spec, options.limits || {}, options.usePrlimit);
    let stdout = '', stderr = '', settled = false, timedOut = false, outputExceeded = false;
    const child = spawn(command.command, command.args || [], {
      cwd: options.cwd,
      windowsHide: true,
      detached: !isWindows,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        PATH: process.env.PATH || '',
        LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8',
        HOME: options.cwd, TMPDIR: options.cwd, TEMP: options.cwd, TMP: options.cwd
      }
    });
    const finish = result => {
      if (settled) return;
      settled = true; clearTimeout(timer);
      resolve({ stdout, stderr, durationMs: Date.now() - started, timedOut, outputExceeded, ...result });
    };
    const append = (target, chunk) => {
      const next = target + chunk.toString('utf8');
      if (Buffer.byteLength(next, 'utf8') > options.outputLimitBytes) {
        outputExceeded = true; killProcessTree(child);
        return next.slice(0, options.outputLimitBytes);
      }
      return next;
    };
    child.stdout.on('data', chunk => { stdout = append(stdout, chunk); });
    child.stderr.on('data', chunk => { stderr = append(stderr, chunk); });
    child.on('error', error => finish({ error }));
    child.on('close', (code, signal) => finish({ code, signal }));
    child.stdin.on('error', () => {});
    child.stdin.end(options.input || '');
    const timer = setTimeout(() => { timedOut = true; killProcessTree(child); }, options.timeoutMs);
  });
}

function unavailableResult(message, tests, limits) {
  return {
    verdict: 'JudgeUnavailable', message, compilerOutput: message,
    testCases: [], passedTests: 0, totalTests: tests.length,
    timeLimitMs: limits.runTimeoutMs, memoryLimitKb: limits.memoryLimitKb,
    runner: 'local'
  };
}

class LocalJudge {
  constructor(options = {}) {
    this.toolchains = options.toolchains || DEFAULT_TOOLCHAINS;
    this.usePrlimit = options.usePrlimit ?? process.env.JUDGE_USE_PRLIMIT !== '0';
    const renderRuntime = Boolean(process.env.RENDER);
    const requestedConcurrency = clamp(options.maxConcurrency ?? process.env.JUDGE_MAX_CONCURRENCY, 2, 1, 8);
    const requestedCompileTimeout = clamp(
      options.compileTimeoutMs ?? process.env.JUDGE_COMPILE_TIMEOUT_MS,
      renderRuntime ? 60000 : 15000,
      1000,
      60000
    );
    this.maxConcurrency = renderRuntime ? 1 : requestedConcurrency;
    this.maxQueue = clamp(options.maxQueue ?? process.env.JUDGE_MAX_QUEUE, 20, 1, 100);
    this.limits = {
      compileTimeoutMs: renderRuntime ? Math.max(60000, requestedCompileTimeout) : requestedCompileTimeout,
      runTimeoutMs: clamp(options.runTimeoutMs ?? process.env.JUDGE_RUN_TIMEOUT_MS, 2000, 100, 10000),
      memoryLimitKb: clamp(options.memoryLimitKb ?? process.env.JUDGE_MEMORY_LIMIT_KB, 262144, 65536, 1048576),
      outputLimitBytes: clamp(options.outputLimitBytes ?? process.env.JUDGE_OUTPUT_LIMIT_BYTES, 262144, 4096, 1048576)
    };
    this.availableLanguages = Object.entries(this.toolchains)
      .filter(([, toolchain]) => !Array.isArray(toolchain.commands) || toolchain.commands.every(commandAvailable))
      .map(([language]) => language);
    this.active = 0;
    this.queue = [];
  }

  info() {
    return {
      runner: 'local', configured: this.availableLanguages.length > 0,
      languages: this.availableLanguages,
      unavailableLanguages: Object.keys(this.toolchains).filter(language => !this.availableLanguages.includes(language)),
      isolation: process.platform === 'linux' && this.usePrlimit ? 'non-root + prlimit' : 'process limits',
      queue: { active: this.active, waiting: this.queue.length, concurrency: this.maxConcurrency }
    };
  }

  judge(payload) {
    if (this.queue.length >= this.maxQueue) {
      const tests = Array.isArray(payload.tests) ? payload.tests : [];
      return Promise.resolve(unavailableResult('评测队列已满，请稍后重试。', tests, this.limits));
    }
    return new Promise((resolve, reject) => {
      this.queue.push({ payload, resolve, reject });
      this.drain();
    });
  }

  drain() {
    while (this.active < this.maxConcurrency && this.queue.length) {
      const job = this.queue.shift(); this.active++;
      this.execute(job.payload).then(job.resolve, job.reject).finally(() => { this.active--; this.drain(); });
    }
  }

  async execute(payload) {
    const requestedLanguage = String(payload.language || '').trim();
    const language = LANGUAGE_ALIASES[requestedLanguage.toLowerCase()] || requestedLanguage;
    const toolchain = this.toolchains[language];
    const source = String(payload.code || '');
    const tests = Array.isArray(payload.tests) ? payload.tests.map(test => ({
      input: String(test && test.input || ''), expected: String(test && (test.expected ?? test.expectedOutput) || ''),
      score: Number.isFinite(Number(test && test.score)) ? Number(test.score) : 0,
      checker: String(test && test.checker || '')
    })) : [];
    if (!toolchain) return unavailableResult(`自建评测机暂不支持 ${language || '该语言'}。`, tests, this.limits);
    if (!source.trim()) return { ...unavailableResult('请先编写代码。', tests, this.limits), verdict: 'CompilationError' };
    if (!tests.length || tests.length > 20) return { ...unavailableResult('该题尚未配置有效测试点。', tests, this.limits), verdict: 'NotConfigured' };
    if (source.length > 65536 || tests.some(test => test.input.length > 2100000 || test.expected.length > 10500000)) {
      return { ...unavailableResult('代码或测试点超过评测机限制。', tests, this.limits), verdict: 'CompilationError' };
    }

    const prefix = path.join(os.tmpdir(), 'fzupta-judge-');
    const workDir = await fs.mkdtemp(prefix);
    const sourcePath = path.join(workDir, toolchain.file);
    const job = { workDir, sourcePath };
    try {
      await fs.chmod(workDir, 0o700).catch(() => {});
      await fs.writeFile(sourcePath, source, { encoding: 'utf8', mode: 0o600 });
      if (toolchain.compile) {
        const compileSpec = toolchain.compile(job);
        compileSpec.command = resolveCommand(compileSpec.command);
        const compilation = await runProcess(compileSpec, {
          cwd: workDir, input: '', timeoutMs: this.limits.compileTimeoutMs,
          outputLimitBytes: this.limits.outputLimitBytes * 2, usePrlimit: this.usePrlimit,
          limits: { cpuSeconds: Math.ceil(this.limits.compileTimeoutMs / 1000) + 1, addressBytes: 1024 * 1024 * 1024, fileBytes: 20 * 1024 * 1024, processes: 64, openFiles: 128 }
        });
        if (compilation.error || (compilation.code === 127 && /not found|failed to execute|no such file/i.test(compilation.stderr))) {
          return unavailableResult(`评测环境缺少 ${compileSpec.command} 编译器。`, tests, this.limits);
        }
        if (compilation.timedOut) return this.compileFailure('编译超时。', compilation, tests);
        if (compilation.outputExceeded) return this.compileFailure('编译器输出超过限制。', compilation, tests);
        if (compilation.code !== 0) return this.compileFailure('编译失败，请查看编译器输出。', compilation, tests);
      }

      const testCases = [];
      for (let index = 0; index < tests.length; index++) {
        const test = tests[index];
        const runSpec = toolchain.run(job);
        runSpec.command = resolveCommand(runSpec.command);
        const execution = await runProcess(runSpec, {
          cwd: workDir, input: test.input, timeoutMs: this.limits.runTimeoutMs,
          outputLimitBytes: Math.max(this.limits.outputLimitBytes, Math.min(10500000, Buffer.byteLength(test.expected, 'utf8') + 65536)), usePrlimit: this.usePrlimit,
          limits: { cpuSeconds: Math.ceil(this.limits.runTimeoutMs / 1000) + 1, addressBytes: this.limits.memoryLimitKb * 1024, fileBytes: 1024 * 1024, processes: 32, openFiles: 64 }
        });
        let verdict = 'Accepted', hint = '无提示', detail = '';
        if (execution.error || (execution.code === 127 && /not found|failed to execute|no such file/i.test(execution.stderr))) {
          return unavailableResult(`评测环境无法启动 ${runSpec.command}。`, tests, this.limits);
        } else if (execution.timedOut) {
          verdict = 'TimeLimitExceeded'; hint = '运行时间超过限制。'; detail = clipped(execution.stderr);
        } else if (execution.outputExceeded) {
          verdict = 'RuntimeError'; hint = '程序输出超过限制。'; detail = clipped(execution.stdout + execution.stderr);
        } else if (execution.code !== 0) {
          verdict = 'RuntimeError'; hint = `程序异常退出${execution.signal ? `（${execution.signal}）` : `（退出码 ${execution.code}）`}。`; detail = clipped(execution.stderr);
        } else if (!checkSpecialOutput(test.checker, test.input, execution.stdout, test.expected)) {
          verdict = 'WrongAnswer';
          hint = test.checker ? '输出不满足题目要求或构造条件。' : '输出与预期不一致';
          detail = test.checker ? `你的输出：\n${execution.stdout || '(空)'}` : `你的输出：\n${execution.stdout || '(空)'}\n\n预期输出：\n${test.expected}`;
        }
        testCases.push({ index, verdict, hint, score: test.score, memoryKb: null, timeMs: execution.durationMs, detail });
      }
      return this.result(testCases, tests, payload.mode);
    } finally {
      const resolved = path.resolve(workDir);
      const allowedPrefix = `${path.resolve(os.tmpdir())}${path.sep}fzupta-judge-`;
      if (resolved.startsWith(allowedPrefix)) await fs.rm(resolved, { recursive: true, force: true, maxRetries: 2 }).catch(() => {});
    }
  }

  compileFailure(message, compilation, tests) {
    const detail = clipped(compilation.stderr || compilation.stdout || message);
    return {
      verdict: 'CompilationError', message, compilerOutput: detail,
      testCases: tests.map((test, index) => ({ index, verdict: 'CompilationError', hint: message, score: test.score, memoryKb: null, timeMs: compilation.durationMs })),
      passedTests: 0, totalTests: tests.length,
      timeLimitMs: this.limits.runTimeoutMs, memoryLimitKb: this.limits.memoryLimitKb,
      runner: 'local'
    };
  }

  result(testCases, tests, mode) {
    const priority = ['RuntimeError', 'TimeLimitExceeded', 'WrongAnswer'];
    const verdict = priority.find(value => testCases.some(test => test.verdict === value)) || 'Accepted';
    const passedTests = testCases.filter(test => test.verdict === 'Accepted').length;
    const firstFailure = testCases.find(test => test.verdict === verdict);
    const message = verdict === 'Accepted' ? (mode === 'sample' ? '样例输出与预期输出一致。' : '所有测试点均已通过。') : firstFailure.hint;
    const compilerOutput = verdict === 'Accepted'
      ? `自建评测机运行完成\n通过测试点：${passedTests}/${tests.length}`
      : `测试点 ${firstFailure.index + 1}：${firstFailure.hint}${firstFailure.detail ? `\n\n${firstFailure.detail}` : ''}`;
    return {
      verdict, message, compilerOutput,
      testCases: testCases.map(({ detail, ...test }) => test), passedTests, totalTests: tests.length,
      timeLimitMs: this.limits.runTimeoutMs, memoryLimitKb: this.limits.memoryLimitKb,
      runner: 'local'
    };
  }
}

module.exports = {
  LocalJudge, DEFAULT_TOOLCHAINS, checkSeilorPermutation,
  checkTriangleEuler, checkOperationConstruction, checkFzuSubsequence,
  checkNonattackingRooks, checkTreeEccentricity, checkSpecialOutput
};
