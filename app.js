/* ═══════════════════════════════════════════════════════════════
   AkshoAI Flight Board - JavaScript
   Pan World Airlines Dev Operations
   ═══════════════════════════════════════════════════════════════ */

// Global state
let boardData = null;
let draggedTask = null;

// ═══════════════════════════════════════════════════════════════
// PASSWORD PROTECTION
// ═══════════════════════════════════════════════════════════════

// Password hash (simple obfuscation - not cryptographically secure)
const BOARDING_PASS = 'UHdBLUZsaWdodDQ2IQ=='; // Base64 encoded

function checkPassword() {
    const input = document.getElementById('auth-password').value;
    const encoded = btoa(input);

    if (encoded === BOARDING_PASS) {
        // Store auth in session
        sessionStorage.setItem('pwa-auth', 'true');
        showBoard();
    } else {
        document.getElementById('auth-error').textContent = '❌ Invalid boarding pass';
        document.getElementById('auth-password').value = '';
        document.getElementById('auth-password').focus();
    }
}

function showBoard() {
    document.getElementById('auth-overlay').classList.add('hidden');
    document.getElementById('flight-board').style.display = 'flex';
    loadTasks();
    initDragAndDrop();
}

function checkAuth() {
    // Check if already authenticated this session
    if (sessionStorage.getItem('pwa-auth') === 'true') {
        showBoard();
    }
    // Otherwise, auth overlay is already visible
}

// Allow Enter key to submit password
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('auth-overlay') &&
        !document.getElementById('auth-overlay').classList.contains('hidden')) {
        checkPassword();
    }
});

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    checkAuth();
});

// ═══════════════════════════════════════════════════════════════
// CLOCK & DATE
// ═══════════════════════════════════════════════════════════════

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();

    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options).toUpperCase();
}

// ═══════════════════════════════════════════════════════════════
// LOAD TASKS
// ═══════════════════════════════════════════════════════════════

async function loadTasks() {
    try {
        // Try to fetch tasks.json
        const response = await fetch('tasks.json?' + Date.now()); // Cache bust
        if (!response.ok) throw new Error('Failed to load tasks');

        boardData = await response.json();
        renderBoard();
        updateStats();
        updateLastSync();

    } catch (error) {
        console.error('Error loading tasks:', error);

        // Try localStorage fallback
        const savedData = localStorage.getItem('flightboard-tasks');
        if (savedData) {
            boardData = JSON.parse(savedData);
            renderBoard();
            updateStats();
        } else {
            showError('Could not load tasks. Check if tasks.json exists.');
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// RENDER BOARD
// ═══════════════════════════════════════════════════════════════

function renderBoard() {
    if (!boardData) return;

    // Clear all columns
    document.querySelectorAll('.column-tasks').forEach(col => {
        col.innerHTML = '';
    });

    // Render tasks in their columns
    boardData.tasks.forEach(task => {
        const taskElement = createTaskCard(task);
        const column = document.querySelector(`.column-tasks[data-column="${task.column}"]`);
        if (column) {
            column.appendChild(taskElement);
        }
    });

    // Update column counts
    updateColumnCounts();
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.dataset.taskId = task.id;

    // Get assigned person name
    const assignedPerson = boardData.team?.find(t => t.id === task.assigned);
    const assignedName = assignedPerson ? assignedPerson.name : 'Unassigned';

    card.innerHTML = `
        <div class="task-header">
            <span class="task-flight-number">${task.id}</span>
            <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
            <span class="task-assigned">${assignedName}</span>
            <span class="task-date">${task.created}</span>
        </div>
        ${task.tags && task.tags.length > 0 ? `
            <div class="task-tags">
                ${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('')}
            </div>
        ` : ''}
    `;

    // Click to open modal
    card.addEventListener('click', (e) => {
        if (!card.classList.contains('dragging')) {
            openModal(task);
        }
    });

    return card;
}

// ═══════════════════════════════════════════════════════════════
// DRAG AND DROP
// ═══════════════════════════════════════════════════════════════

function initDragAndDrop() {
    // Task drag events (delegated)
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('task-card')) {
            draggedTask = e.target;
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('task-card')) {
            e.target.classList.remove('dragging');
            draggedTask = null;

            // Remove all drag-over states
            document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
        }
    });

    // Column drop zones
    document.querySelectorAll('.column-tasks').forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            column.classList.add('drag-over');
        });

        column.addEventListener('dragleave', (e) => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('drag-over');

            if (draggedTask) {
                const taskId = draggedTask.dataset.taskId;
                const newColumn = column.dataset.column;

                // Move task in data
                moveTask(taskId, newColumn);

                // Move DOM element
                column.appendChild(draggedTask);

                // Update counts
                updateColumnCounts();
                updateStats();
            }
        });
    });
}

function moveTask(taskId, newColumn) {
    const task = boardData.tasks.find(t => t.id === taskId);
    if (task) {
        task.column = newColumn;
        boardData.lastUpdated = new Date().toISOString();

        // Save to localStorage
        saveToLocalStorage();

        // Log for debugging
        console.log(`Moved ${taskId} to ${newColumn}`);
    }
}

// ═══════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════

function openModal(task) {
    const modal = document.getElementById('task-modal');

    // Populate modal
    document.getElementById('modal-flight-number').textContent = task.id;
    document.getElementById('modal-title').textContent = task.title;
    document.getElementById('modal-description').textContent = task.description || 'No description provided.';

    // Assigned
    const assignedPerson = boardData.team?.find(t => t.id === task.assigned);
    document.getElementById('modal-assigned').textContent = assignedPerson ? assignedPerson.name : 'Unassigned';

    // Priority
    document.getElementById('modal-priority').textContent = task.priority.toUpperCase();

    // Created date
    document.getElementById('modal-created').textContent = task.created;

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    if (task.tags && task.tags.length > 0) {
        tagsContainer.innerHTML = task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('');
    } else {
        tagsContainer.innerHTML = '';
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('task-modal').classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('task-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ═══════════════════════════════════════════════════════════════
// STATS & UTILITIES
// ═══════════════════════════════════════════════════════════════

function updateColumnCounts() {
    document.querySelectorAll('.column').forEach(column => {
        const columnId = column.dataset.column;
        const count = column.querySelector('.column-tasks').children.length;
        column.querySelector('.column-count').textContent = count;
    });
}

function updateStats() {
    if (!boardData) return;

    const total = boardData.tasks.length;
    const inFlight = boardData.tasks.filter(t => t.column === 'in-flight').length;
    const landed = boardData.tasks.filter(t => t.column === 'landed').length;

    document.getElementById('total-flights').textContent = total;
    document.getElementById('in-flight-count').textContent = inFlight;
    document.getElementById('landed-count').textContent = landed;
}

function updateLastSync() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('last-updated').textContent = `Last sync: ${time}`;
}

function saveToLocalStorage() {
    localStorage.setItem('flightboard-tasks', JSON.stringify(boardData));
}

function showError(message) {
    console.error(message);
    // Could add a toast notification here
}

// ═══════════════════════════════════════════════════════════════
// EXPORT FUNCTIONS (for debugging/manual sync)
// ═══════════════════════════════════════════════════════════════

// Call this from console to get current board state as JSON
window.exportBoard = function() {
    const json = JSON.stringify(boardData, null, 2);
    console.log(json);

    // Copy to clipboard
    navigator.clipboard.writeText(json).then(() => {
        console.log('Board data copied to clipboard!');
    });

    return json;
};

// Call this to add a new task (for testing)
window.addTask = function(title, description = '', priority = 'medium', assigned = '') {
    const id = 'PWA-' + String(boardData.tasks.length + 1).padStart(3, '0');
    const task = {
        id,
        title,
        description,
        column: 'boarding',
        priority,
        assigned,
        created: new Date().toISOString().split('T')[0],
        tags: []
    };

    boardData.tasks.push(task);
    saveToLocalStorage();
    renderBoard();
    updateStats();

    console.log(`Added task: ${id} - ${title}`);
    return task;
};
