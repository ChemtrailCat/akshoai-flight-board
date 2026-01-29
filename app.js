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

    // Build column options for dropdown (exclude current column)
    const columnOptions = boardData.columns
        .filter(col => col.id !== task.column)
        .map(col => `<div class="move-option" data-column="${col.id}">${col.icon} ${col.name}</div>`)
        .join('');

    card.innerHTML = `
        <div class="task-header">
            <span class="task-flight-number">${task.id}</span>
            <div class="task-header-right">
                <span class="task-priority ${task.priority}">${task.priority}</span>
                <div class="move-dropdown">
                    <button class="move-btn" title="Move to...">▼</button>
                    <div class="move-menu">
                        <div class="move-menu-header">Move to:</div>
                        ${columnOptions}
                    </div>
                </div>
            </div>
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

    // Move dropdown functionality
    const moveBtn = card.querySelector('.move-btn');
    const moveMenu = card.querySelector('.move-menu');

    moveBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't open modal
        // Close all other open menus first
        document.querySelectorAll('.move-menu.active').forEach(menu => {
            if (menu !== moveMenu) menu.classList.remove('active');
        });
        moveMenu.classList.toggle('active');
    });

    // Handle move option clicks
    card.querySelectorAll('.move-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Don't open modal
            const newColumn = option.dataset.column;
            moveTaskToColumn(task.id, newColumn);
            moveMenu.classList.remove('active');
        });
    });

    // Click to open modal (but not on dropdown)
    card.addEventListener('click', (e) => {
        if (!card.classList.contains('dragging') &&
            !e.target.closest('.move-dropdown')) {
            openModal(task);
        }
    });

    return card;
}

function moveTaskToColumn(taskId, newColumn) {
    const task = boardData.tasks.find(t => t.id === taskId);
    if (task && task.column !== newColumn) {
        task.column = newColumn;
        boardData.lastUpdated = new Date().toISOString();
        saveToLocalStorage();
        renderBoard();
        updateStats();
        console.log(`Moved ${taskId} to ${newColumn}`);
    }
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

// ═══════════════════════════════════════════════════════════════
// PRD MODAL
// ═══════════════════════════════════════════════════════════════

let prdData = null;

async function openPRD() {
    const modal = document.getElementById('prd-modal');
    modal.classList.add('active');

    // Load PRD if not cached
    if (!prdData) {
        await loadPRD();
    }
}

function closePRD() {
    document.getElementById('prd-modal').classList.remove('active');
}

async function loadPRD() {
    try {
        const response = await fetch('PRD.md?' + Date.now());
        if (!response.ok) throw new Error('Failed to load PRD');

        const markdown = await response.text();
        prdData = markdown;
        renderPRD(markdown);

    } catch (error) {
        console.error('Error loading PRD:', error);
        document.getElementById('prd-body').innerHTML = `
            <div class="prd-loading">
                ❌ Could not load PRD.md<br>
                <small style="color: var(--text-muted);">Make sure PRD.md exists in the same folder.</small>
            </div>
        `;
    }
}

function renderPRD(markdown) {
    // Extract version and date from header
    const versionMatch = markdown.match(/# Version:\s*(.+)/i);
    const updatedMatch = markdown.match(/# Last Updated:\s*(.+)/i);

    if (versionMatch) {
        document.getElementById('prd-version').textContent = `Version: ${versionMatch[1]}`;
    }
    if (updatedMatch) {
        document.getElementById('prd-updated').textContent = `Updated: ${updatedMatch[1]}`;
    }

    // Convert markdown to HTML
    const html = parseMarkdown(markdown);
    document.getElementById('prd-body').innerHTML = html;
}

function parseMarkdown(md) {
    let html = md;

    // Remove document control header (lines starting with # followed by metadata)
    html = html.replace(/^# DOCUMENT CONTROL[\s\S]*?(?=## )/m, '');

    // Escape HTML special chars first
    html = html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');

    // Code blocks (``` ... ```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---+$/gm, '<hr>');

    // Tables
    html = html.replace(/\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
        const headers = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
        const rows = body.trim().split('\n').map(row => {
            const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

    // Unordered lists
    html = html.replace(/^(\s*)-\s+(.+)$/gm, (match, indent, content) => {
        const level = Math.floor(indent.length / 4);
        return `<li data-level="${level}">${content}</li>`;
    });

    // Wrap consecutive list items in ul
    html = html.replace(/((?:<li[^>]*>[^<]*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Ordered lists (basic)
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Paragraphs - wrap remaining text blocks
    html = html.split('\n\n').map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') ||
            block.startsWith('<pre') || block.startsWith('<blockquote') || block.startsWith('<table') ||
            block.startsWith('<hr')) {
            return block;
        }
        // Don't wrap if it's just whitespace or already has block elements
        if (block.match(/^<[^>]+>/)) return block;
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    // Clean up extra whitespace
    html = html.replace(/\n{3,}/g, '\n\n');

    return html;
}

// Close PRD modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('prd-modal');
    if (e.target === modal) {
        closePRD();
    }
});

// Close PRD modal on Escape (already handled by existing listener, but let's be explicit)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePRD();
        // Also close any open move dropdowns
        document.querySelectorAll('.move-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// Close move dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.move-dropdown')) {
        document.querySelectorAll('.move-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// NEW FLIGHT MODAL - Create Task
// ═══════════════════════════════════════════════════════════════

function openNewFlightModal() {
    const modal = document.getElementById('new-flight-modal');
    modal.classList.add('active');

    // Populate team dropdown
    populateTeamDropdown();

    // Reset form
    document.getElementById('new-flight-form').reset();

    // Focus title field
    setTimeout(() => {
        document.getElementById('flight-title').focus();
    }, 100);
}

function closeNewFlightModal() {
    document.getElementById('new-flight-modal').classList.remove('active');
}

function populateTeamDropdown() {
    const select = document.getElementById('flight-assigned');
    select.innerHTML = '<option value="">Unassigned</option>';

    if (boardData && boardData.team) {
        boardData.team.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = `${member.name} (${member.role})`;
            select.appendChild(option);
        });
    }
}

function createNewFlight(event) {
    event.preventDefault();

    const title = document.getElementById('flight-title').value.trim();
    const description = document.getElementById('flight-description').value.trim();
    const column = document.getElementById('flight-column').value;
    const priority = document.getElementById('flight-priority').value;
    const assigned = document.getElementById('flight-assigned').value;
    const tagsInput = document.getElementById('flight-tags').value.trim();

    if (!title) {
        alert('Please enter a flight name!');
        return false;
    }

    // Generate new flight ID
    const existingIds = boardData.tasks.map(t => {
        const match = t.id.match(/PWA-(\d+)/);
        return match ? parseInt(match[1]) : 0;
    });
    const nextId = Math.max(...existingIds, 0) + 1;
    const flightId = 'PWA-' + String(nextId).padStart(3, '0');

    // Parse tags
    const tags = tagsInput
        ? tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(t => t)
        : [];

    // Create new task
    const newTask = {
        id: flightId,
        title: title,
        description: description,
        column: column,
        priority: priority,
        assigned: assigned,
        created: new Date().toISOString().split('T')[0],
        tags: tags
    };

    // Add to board data
    boardData.tasks.push(newTask);
    boardData.board.lastUpdated = new Date().toISOString();

    // Save and render
    saveToLocalStorage();
    renderBoard();
    updateStats();

    // Close modal
    closeNewFlightModal();

    // Log success
    console.log(`✈️ New flight scheduled: ${flightId} - ${title}`);

    return false;
}

// Close new flight modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('new-flight-modal');
    if (e.target === modal) {
        closeNewFlightModal();
    }
});

// Close new flight modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNewFlightModal();
    }
});
