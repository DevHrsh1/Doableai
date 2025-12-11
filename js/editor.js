// Workflow Editor JavaScript - Doable.ai

class WorkflowEditor {
    constructor() {
        this.canvas = document.getElementById('workflowCanvas');
        this.nodes = [];
        this.connections = [];
        this.selectedNode = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.zoom = 1;
        this.pan = { x: 0, y: 0 };
        this.nodeIdCounter = 1;
        this.connectionIdCounter = 1;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupCanvasInteractions();
        this.loadSampleWorkflow();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Toolbar buttons
        document.getElementById('runWorkflow').addEventListener('click', () => this.runWorkflow());
        document.getElementById('saveWorkflow').addEventListener('click', () => this.saveWorkflow());
        document.getElementById('testWorkflow').addEventListener('click', () => this.testWorkflow());
        document.getElementById('undoAction').addEventListener('click', () => this.undoAction());
        document.getElementById('redoAction').addEventListener('click', () => this.redoAction());
        document.getElementById('settingsWorkflow').addEventListener('click', () => this.openWorkflowSettings());

        // Canvas controls
        document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
        document.getElementById('fitToScreen').addEventListener('click', () => this.fitToScreen());
        document.getElementById('autoLayout').addEventListener('click', () => this.autoLayout());

        // Property panel
        document.querySelectorAll('.property-input, .property-select').forEach(input => {
            input.addEventListener('change', (e) => this.updateNodeProperty(e));
        });

        // Modal handlers
        document.getElementById('closeNodeConfig').addEventListener('click', () => this.closeModal('nodeConfigModal'));
        document.getElementById('cancelNodeConfig').addEventListener('click', () => this.closeModal('nodeConfigModal'));
        document.getElementById('saveNodeConfig').addEventListener('click', () => this.saveNodeConfig());

        document.getElementById('closeCodeEditor').addEventListener('click', () => this.closeModal('codeEditorModal'));
        document.getElementById('cancelCodeEditor').addEventListener('click', () => this.closeModal('codeEditorModal'));
        document.getElementById('saveCodeEditor').addEventListener('click', () => this.saveCodeEditor());

        // Canvas click to deselect
        this.canvas.addEventListener('click', (e) => {
            if (e.target === this.canvas || e.target.classList.contains('canvas-grid')) {
                this.deselectAllNodes();
            }
        });
    }

    setupDragAndDrop() {
        // Make toolbox items draggable
        document.querySelectorAll('.toolbox-item, .node-palette-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: 'node-template',
                    nodeType: item.getAttribute('data-node-type'),
                    icon: item.querySelector('i').className,
                    name: item.querySelector('span').textContent
                }));
            });
        });

        // Canvas drop zone
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            
            if (data.type === 'node-template') {
                const rect = this.canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) / this.zoom - this.pan.x;
                const y = (e.clientY - rect.top) / this.zoom - this.pan.y;
                
                this.createNode(data.nodeType, data.icon, data.name, x, y);
            }
        });
    }

    setupCanvasInteractions() {
        let isPanning = false;
        let startPan = { x: 0, y: 0 };

        this.canvas.addEventListener('mousedown', (e) => {
            if (e.target === this.canvas || e.target.classList.contains('canvas-grid')) {
                isPanning = true;
                startPan = { x: e.clientX - this.pan.x, y: e.clientY - this.pan.y };
                this.canvas.style.cursor = 'grabbing';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isPanning) {
                this.pan.x = e.clientX - startPan.x;
                this.pan.y = e.clientY - startPan.y;
                this.updateCanvasTransform();
            }

            if (this.isDragging && this.selectedNode) {
                const rect = this.canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) / this.zoom - this.dragOffset.x - this.pan.x;
                const y = (e.clientY - rect.top) / this.zoom - this.dragOffset.y - this.pan.y;
                
                this.selectedNode.element.style.left = x + 'px';
                this.selectedNode.element.style.top = y + 'px';
                
                this.updateConnections();
            }
        });

        document.addEventListener('mouseup', () => {
            isPanning = false;
            this.isDragging = false;
            this.canvas.style.cursor = 'default';
        });

        // Zoom with mouse wheel
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom = Math.max(0.1, Math.min(3, this.zoom * delta));
            this.updateCanvasTransform();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Delete selected node
            if (e.key === 'Delete' && this.selectedNode) {
                this.deleteNode(this.selectedNode);
            }

            // Ctrl+S to save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveWorkflow();
            }

            // Ctrl+Z to undo
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                this.undoAction();
            }

            // Ctrl+Y to redo
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                this.redoAction();
            }

            // Escape to deselect
            if (e.key === 'Escape') {
                this.deselectAllNodes();
            }
        });
    }

    createNode(type, icon, name, x, y) {
        const nodeId = `node-${this.nodeIdCounter++}`;
        const nodeElement = document.createElement('div');
        nodeElement.className = 'workflow-node';
        nodeElement.id = nodeId;
        nodeElement.style.left = x + 'px';
        nodeElement.style.top = y + 'px';
        nodeElement.setAttribute('data-node-type', type);

        nodeElement.innerHTML = `
            <div class="node-header">
                <i class="${icon} node-icon"></i>
                <span class="node-title">${name}</span>
            </div>
            <div class="node-description">Double-click to configure</div>
            <div class="node-connections">
                <div class="connection-point" data-connection="input"></div>
                <div class="connection-point" data-connection="output"></div>
            </div>
        `;

        // Add node event listeners
        nodeElement.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.selectNode(nodeElement);
            this.startDragging(e);
        });

        nodeElement.addEventListener('dblclick', () => {
            this.configureNode(nodeElement);
        });

        // Connection points
        nodeElement.querySelectorAll('.connection-point').forEach(point => {
            point.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.startConnection(e, nodeElement);
            });
        });

        this.canvas.appendChild(nodeElement);

        const node = {
            id: nodeId,
            element: nodeElement,
            type: type,
            name: name,
            icon: icon,
            x: x,
            y: y,
            properties: {}
        };

        this.nodes.push(node);
        return node;
    }

    selectNode(nodeElement) {
        this.deselectAllNodes();
        this.selectedNode = this.nodes.find(n => n.element === nodeElement);
        nodeElement.classList.add('selected');
        this.updatePropertiesPanel();
    }

    deselectAllNodes() {
        document.querySelectorAll('.workflow-node').forEach(node => {
            node.classList.remove('selected');
        });
        this.selectedNode = null;
        this.clearPropertiesPanel();
    }

    startDragging(e) {
        this.isDragging = true;
        const rect = this.canvas.getBoundingClientRect();
        this.dragOffset = {
            x: (e.clientX - rect.left) / this.zoom - this.pan.x - parseInt(e.currentTarget.style.left),
            y: (e.clientY - rect.top) / this.zoom - this.pan.y - parseInt(e.currentTarget.style.top)
        };
    }

    deleteNode(node) {
        if (confirm(`Are you sure you want to delete "${node.name}"?`)) {
            // Remove connections
            this.connections = this.connections.filter(conn => 
                conn.from !== node && conn.to !== node
            );
            
            // Remove node
            this.nodes = this.nodes.filter(n => n !== node);
            node.element.remove();
            
            this.updateConnections();
            this.deselectAllNodes();
        }
    }

    configureNode(nodeElement) {
        const node = this.nodes.find(n => n.element === nodeElement);
        if (!node) return;

        // Fill modal with current values
        document.getElementById('nodeNameInput').value = node.name;
        document.getElementById('nodeDescriptionInput').value = 
            node.element.querySelector('.node-description').textContent;
        document.getElementById('nodeTypeSelect').value = node.type;

        this.openModal('nodeConfigModal');
    }

    saveNodeConfig() {
        const name = document.getElementById('nodeNameInput').value;
        const description = document.getElementById('nodeDescriptionInput').value;
        const type = document.getElementById('nodeTypeSelect').value;

        if (this.selectedNode) {
            this.selectedNode.name = name;
            this.selectedNode.type = type;
            this.selectedNode.element.querySelector('.node-title').textContent = name;
            this.selectedNode.element.querySelector('.node-description').textContent = description;
            this.selectedNode.element.setAttribute('data-node-type', type);
        }

        this.closeModal('nodeConfigModal');
    }

    updatePropertiesPanel() {
        if (!this.selectedNode) return;

        // Update property inputs with selected node data
        const inputs = document.querySelectorAll('.property-input');
        inputs.forEach(input => {
            if (input.type === 'text' && !input.placeholder.includes('description')) {
                input.value = this.selectedNode.name;
            }
        });
    }

    clearPropertiesPanel() {
        document.querySelectorAll('.property-input').forEach(input => {
            if (input.type === 'text') {
                input.value = '';
            }
        });
    }

    updateNodeProperty(e) {
        if (!this.selectedNode) return;

        const property = e.target.classList.contains('property-input') ? 'name' : 'description';
        const value = e.target.value;

        if (property === 'name') {
            this.selectedNode.name = value;
            this.selectedNode.element.querySelector('.node-title').textContent = value;
        } else if (property === 'description') {
            this.selectedNode.element.querySelector('.node-description').textContent = value;
        }
    }

    startConnection(e, nodeElement) {
        // TODO: Implement connection logic
        console.log('Starting connection from', nodeElement);
    }

    updateConnections() {
        // TODO: Update SVG connections based on node positions
        console.log('Updating connections');
    }

    runWorkflow() {
        if (this.nodes.length === 0) {
            alert('Please add some nodes to your workflow first.');
            return;
        }

        alert('🚀 Running workflow...\n\nThis would execute your automation with the configured nodes.');
    }

    saveWorkflow() {
        const workflowData = {
            nodes: this.nodes.map(node => ({
                id: node.id,
                type: node.type,
                name: node.name,
                x: parseInt(node.element.style.left),
                y: parseInt(node.element.style.top),
                properties: node.properties
            })),
            connections: this.connections,
            zoom: this.zoom,
            pan: this.pan
        };

        localStorage.setItem('doableWorkflow', JSON.stringify(workflowData));
        alert('💾 Workflow saved successfully!');
    }

    testWorkflow() {
        if (this.nodes.length === 0) {
            alert('Please add some nodes to your workflow first.');
            return;
        }

        alert('🔍 Testing workflow...\n\nThis would validate your workflow and check for potential issues.');
    }

    undoAction() {
        alert('↶ Undo functionality would be implemented here.');
    }

    redoAction() {
        alert('↷ Redo functionality would be implemented here.');
    }

    openWorkflowSettings() {
        alert('⚙️ Workflow settings would open here for advanced configuration.');
    }

    zoomIn() {
        this.zoom = Math.min(3, this.zoom * 1.2);
        this.updateCanvasTransform();
    }

    zoomOut() {
        this.zoom = Math.max(0.1, this.zoom / 1.2);
        this.updateCanvasTransform();
    }

    fitToScreen() {
        this.zoom = 1;
        this.pan = { x: 0, y: 0 };
        this.updateCanvasTransform();
    }

    autoLayout() {
        alert('✨ Auto-layout would automatically arrange your nodes in an optimal layout.');
    }

    updateCanvasTransform() {
        this.canvas.style.transform = `translate(${this.pan.x}px, ${this.pan.y}px) scale(${this.zoom})`;
    }

    loadSampleWorkflow() {
        // Sample workflow is already in HTML, but we can load from localStorage
        const savedWorkflow = localStorage.getItem('doableWorkflow');
        if (savedWorkflow) {
            const workflowData = JSON.parse(savedWorkflow);
            // TODO: Load workflow from saved data
            console.log('Loading saved workflow:', workflowData);
        }
    }

    // Modal functions
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    saveCodeEditor() {
        const code = document.getElementById('codeEditorTextarea').value;
        const language = document.getElementById('codeLanguageSelect').value;
        
        // TODO: Save code to current node
        console.log('Saving code:', { code, language });
        
        this.closeModal('codeEditorModal');
    }
}

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WorkflowEditor();
});

// Additional utility functions for the editor
function showEditorNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `editor-notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export for use in other files
window.WorkflowEditor = WorkflowEditor;
