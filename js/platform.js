// Enhanced Platform JavaScript - Doable.ai (Full Proof like lovable.dev)

class DoablePlatform {
    constructor() {
        this.currentMode = 'prompt';
        this.templates = [];
        this.projects = [];
        this.buildStep = 1;
        this.userData = {};
        this.settings = {};
        this.isBuilding = false;
        this.init();
    }

    init() {
        this.loadUserData();
        this.loadSettings();
        this.setupEventListeners();
        this.loadTemplates();
        this.loadProjects();
        this.loadShowcaseTemplates();
        this.setupModeSwitching();
        this.setupModals();
        this.setupAnimations();
        this.setupSearch();
        this.setupRealtimeUpdates();
        this.setupKeyboardShortcuts();
    }

    loadUserData() {
        // Load user data from localStorage or API
        const savedUserData = localStorage.getItem('doableUserData');
        if (savedUserData) {
            this.userData = JSON.parse(savedUserData);
        } else {
            // Default user data
            this.userData = {
                name: 'John Doe',
                email: 'john@example.com',
                plan: 'free',
                toolsCreated: 12,
                totalRuns: 847,
                joinDate: new Date('2024-01-01').toISOString()
            };
        }
        this.updateUserInterface();
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('doableAdvancedSettings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        } else {
            this.settings = {
                language: 'auto',
                framework: 'auto',
                deployment: 'cloud',
                performance: 'standard'
            };
        }
        this.updateSettingsUI();
    }

    updateUserInterface() {
        // Update user avatar
        const avatar = document.querySelector('.user-avatar span');
        if (avatar) {
            avatar.textContent = this.userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
        }

        // Update stats
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = this.userData.toolsCreated;
            statNumbers[1].textContent = this.formatNumber(this.userData.totalRuns);
            statNumbers[2].textContent = '99.8%';
        }
    }

    updateSettingsUI() {
        Object.keys(this.settings).forEach(key => {
            const element = document.getElementById(`${key}Select`);
            if (element) {
                element.value = this.settings[key];
            }
        });
    }

    setupEventListeners() {
        // Mode switching
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.getAttribute('data-mode');
                this.switchMode(mode);
            });
        });

        // Generate tool button
        document.getElementById('generateTool').addEventListener('click', () => {
            this.generateTool();
        });

        // Advanced options
        document.getElementById('advancedOptions').addEventListener('click', () => {
            this.openModal('advancedModal');
        });

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const suggestion = e.currentTarget.getAttribute('data-suggestion');
                this.fillPrompt(suggestion);
            });
        });

        // Template category switching
        document.querySelectorAll('.template-cat').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-cat');
                this.filterTemplates(category);
            });
        });

        // Scratch option selection
        document.querySelectorAll('.scratch-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.currentTarget.getAttribute('data-type');
                this.openScratchBuilder(type);
            });
        });

        // Create tool button - removed since it's now a direct link

        // Quick actions
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.textContent.trim();
                if (action.includes('AI Assistant')) {
                    this.openAIAssistant();
                } else if (action.includes('Import')) {
                    this.openImportModal();
                }
            });
        });

        // Category navigation
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.filterByCategory(e.currentTarget.textContent.trim());
            });
        });

        // User menu
        document.querySelector('.user-avatar').addEventListener('click', () => {
            this.toggleUserMenu();
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(link, e);
            });
        });

        // Upgrade button
        document.querySelector('.upgrade-btn').addEventListener('click', () => {
            this.openUpgradeModal();
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }
            
            // Ctrl/Cmd + N for new tool
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.createNewTool();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupRealtimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateActivityFeed();
            this.updateStats();
        }, 30000); // Update every 30 seconds
    }

    setupAnimations() {
        // Add smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Add hover animations for cards
        this.setupCardAnimations();
        
        // Add intersection observer for animations
        this.setupIntersectionObserver();
    }

    setupCardAnimations() {
        document.querySelectorAll('.template-card, .project-card, .showcase-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe cards for animation
        document.querySelectorAll('.template-card, .project-card, .showcase-card').forEach(card => {
            observer.observe(card);
        });
    }

    loadTemplates() {
        // Enhanced template data
        this.templates = [
            {
                id: 1,
                name: "Instagram Automation Bot",
                description: "Auto-generate, schedule, and post Instagram content with AI captions and hashtag optimization.",
                category: "automation",
                icon: "fab fa-instagram",
                uses: 1234,
                rating: 4.8,
                featured: true,
                tags: ["social", "ai", "scheduling"],
                difficulty: "beginner",
                timeEstimate: "5 min"
            },
            {
                id: 2,
                name: "Lead Generation System",
                description: "Scrape LinkedIn for potential clients, score them based on criteria, and export to Google Sheets.",
                category: "automation",
                icon: "fas fa-users",
                uses: 892,
                rating: 4.6,
                featured: true,
                tags: ["scraping", "crm", "sales"],
                difficulty: "intermediate",
                timeEstimate: "10 min"
            },
            {
                id: 3,
                name: "WhatsApp Business Bot",
                description: "Automated customer service bot that handles inquiries and forwards complex issues to human support.",
                category: "communication",
                icon: "fab fa-whatsapp",
                uses: 567,
                rating: 4.7,
                featured: false,
                tags: ["chatbot", "customer", "automation"],
                difficulty: "intermediate",
                timeEstimate: "15 min"
            },
            {
                id: 4,
                name: "Analytics Dashboard",
                description: "Real-time data visualization and reporting with customizable charts and KPI tracking.",
                category: "analytics",
                icon: "fas fa-chart-line",
                uses: 445,
                rating: 4.5,
                featured: true,
                tags: ["dashboard", "reporting", "visualization"],
                difficulty: "beginner",
                timeEstimate: "8 min"
            },
            {
                id: 5,
                name: "Email Campaign Manager",
                description: "Automated email sequences with personalization, A/B testing, and performance analytics.",
                category: "communication",
                icon: "fas fa-envelope",
                uses: 678,
                rating: 4.4,
                featured: false,
                tags: ["email", "marketing", "automation"],
                difficulty: "beginner",
                timeEstimate: "12 min"
            },
            {
                id: 6,
                name: "Data Pipeline ETL",
                description: "Extract, transform, and load data from multiple sources with error handling and monitoring.",
                category: "data",
                icon: "fas fa-database",
                uses: 334,
                rating: 4.3,
                featured: false,
                tags: ["etl", "data", "processing"],
                difficulty: "advanced",
                timeEstimate: "20 min"
            }
        ];

        this.renderTemplates();
    }

    loadProjects() {
        // Enhanced project data
        this.projects = [
            {
                id: 1,
                title: "Instagram Automation Bot",
                description: "Automated Instagram posting with AI-generated content",
                status: "running",
                lastRun: "2 minutes ago",
                totalRuns: 847,
                successRate: 99.8,
                created: "2024-01-15",
                tags: ["social", "ai"],
                favorite: true
            },
            {
                id: 2,
                title: "Lead Scraper System",
                description: "LinkedIn lead generation and CRM integration",
                status: "stopped",
                lastRun: "1 hour ago",
                totalRuns: 234,
                successRate: 94.2,
                created: "2024-01-20",
                tags: ["sales", "crm"],
                favorite: false
            },
            {
                id: 3,
                title: "Analytics Dashboard",
                description: "Real-time website analytics and reporting",
                status: "running",
                lastRun: "5 minutes ago",
                totalRuns: 1567,
                successRate: 99.1,
                created: "2024-02-01",
                tags: ["analytics", "dashboard"],
                favorite: true
            }
        ];

        this.renderProjects();
    }

    loadShowcaseTemplates() {
        // Load featured templates for showcase
        const showcaseTemplates = this.templates.filter(t => t.featured);
        this.renderShowcaseTemplates(showcaseTemplates);
    }

    renderTemplates() {
        const grid = document.getElementById('templateGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        this.templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card fade-in';
            card.innerHTML = `
                <div class="template-header">
                    <div class="template-icon">
                        <i class="${template.icon}"></i>
                    </div>
                    <div class="template-meta">
                        <span class="template-uses">${this.formatNumber(template.uses)} uses</span>
                        <span class="template-rating">
                            <i class="fas fa-star"></i> ${template.rating}
                        </span>
                    </div>
                </div>
                <div class="template-content">
                    <h3 class="template-title">${template.name}</h3>
                    <p class="template-description">${template.description}</p>
                    <div class="template-tags">
                        ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="template-footer">
                        <span class="template-difficulty">
                            <i class="fas fa-signal"></i> ${template.difficulty}
                        </span>
                        <span class="template-time">
                            <i class="fas fa-clock"></i> ${template.timeEstimate}
                        </span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                this.selectTemplate(template);
            });

            grid.appendChild(card);
        });
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        this.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in';
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-status status-${project.status}">
                        <span class="status-dot"></span>
                        ${project.status}
                    </div>
                </div>
                <div class="project-metrics">
                    <div class="metric">
                        <span class="metric-label">Total Runs</span>
                        <span class="metric-value">${this.formatNumber(project.totalRuns)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Success Rate</span>
                        <span class="metric-value">${project.successRate}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Last Run</span>
                        <span class="metric-value">${project.lastRun}</span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="project-btn primary" data-action="run" data-project-id="${project.id}">
                        <i class="fas fa-play"></i> Run
                    </button>
                    <button class="project-btn" data-action="edit" data-project-id="${project.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="project-btn" data-action="logs" data-project-id="${project.id}">
                        <i class="fas fa-file-alt"></i> Logs
                    </button>
                    <button class="project-btn" data-action="more" data-project-id="${project.id}">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            `;

            // Add event listeners for project actions
            card.querySelectorAll('.project-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.getAttribute('data-action');
                    const projectId = parseInt(btn.getAttribute('data-project-id'));
                    this.handleProjectAction(action, projectId);
                });
            });

            grid.appendChild(card);
        });
    }

    renderShowcaseTemplates(templates) {
        const grid = document.getElementById('showcaseGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'showcase-card fade-in';
            card.innerHTML = `
                <div class="showcase-image">
                    <i class="${template.icon}"></i>
                </div>
                <div class="showcase-content">
                    <h3 class="showcase-title">${template.name}</h3>
                    <p class="showcase-description">${template.description}</p>
                    <div class="showcase-meta">
                        <span class="showcase-uses">${this.formatNumber(template.uses)} uses</span>
                        <span class="showcase-rating">
                            <i class="fas fa-star"></i> ${template.rating}
                        </span>
                    </div>
                    <button class="showcase-btn" data-template-id="${template.id}">
                        Use Template
                    </button>
                </div>
            `;

            card.querySelector('.showcase-btn').addEventListener('click', () => {
                this.selectTemplate(template);
            });

            grid.appendChild(card);
        });
    }

    handleProjectAction(action, projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        switch (action) {
            case 'run':
                this.runProject(project);
                break;
            case 'edit':
                this.editProject(project);
                break;
            case 'logs':
                this.viewProjectLogs(project);
                break;
            case 'more':
                this.showProjectMenu(project);
                break;
        }
    }

    runProject(project) {
        if (project.status === 'running') {
            this.showNotification('Project is already running', 'warning');
            return;
        }

        // Simulate running the project
        project.status = 'running';
        project.lastRun = 'Just now';
        project.totalRuns++;
        
        this.renderProjects();
        this.showNotification(`Running ${project.title}...`, 'success');
        
        // Simulate completion after a few seconds
        setTimeout(() => {
            project.lastRun = '2 minutes ago';
            this.renderProjects();
        }, 5000);
    }

    editProject(project) {
        this.showNotification(`Opening ${project.title} editor...`, 'info');
        // Simulate opening editor
        setTimeout(() => {
            alert(`Editor for ${project.title} would open here with:

• Visual workflow builder
• Code editor with syntax highlighting
• API configuration panel
• Testing and debugging tools
• Deployment settings`);
        }, 500);
    }

    viewProjectLogs(project) {
        this.showNotification(`Opening ${project.title} logs...`, 'info');
        // Simulate opening logs
        setTimeout(() => {
            alert(`Logs for ${project.title}:

[2024-12-09 14:30:15] Starting automation...
[2024-12-09 14:30:16] Connected to Instagram API
[2024-12-09 14:30:17] Generated AI content for post
[2024-12-09 14:30:18] Posted successfully
[2024-12-09 14:30:19] Automation completed

Success Rate: ${project.successRate}%`);
        }, 500);
    }

    showProjectMenu(project) {
        // Create context menu
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.innerHTML = `
            <button class="menu-item" data-action="duplicate">Duplicate</button>
            <button class="menu-item" data-action="export">Export</button>
            <button class="menu-item" data-action="share">Share</button>
            <button class="menu-item" data-action="settings">Settings</button>
            <hr>
            <button class="menu-item danger" data-action="delete">Delete</button>
        `;

        document.body.appendChild(menu);

        // Position menu
        const rect = event.target.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.left = `${rect.left}px`;
        menu.style.zIndex = '3000';

        // Handle menu actions
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.getAttribute('data-action');
                this.handleProjectMenuAction(action, project);
                menu.remove();
            });
        });

        // Remove menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
    }

    handleProjectMenuAction(action, project) {
        switch (action) {
            case 'duplicate':
                this.duplicateProject(project);
                break;
            case 'export':
                this.exportProject(project);
                break;
            case 'share':
                this.shareProject(project);
                break;
            case 'settings':
                this.openProjectSettings(project);
                break;
            case 'delete':
                this.deleteProject(project);
                break;
        }
    }

    // Additional methods for enhanced functionality
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Update mode content
        document.querySelectorAll('.creation-mode').forEach(m => {
            m.classList.remove('active');
        });
        document.getElementById(`${mode}-mode`).classList.add('active');

        // Special handling for different modes
        if (mode === 'template') {
            this.loadTemplates();
        } else if (mode === 'scratch') {
            this.loadScratchOptions();
        }
    }

    fillPrompt(suggestion) {
        const promptInput = document.getElementById('toolPrompt');
        if (promptInput) {
            promptInput.value = suggestion;
            promptInput.focus();
            
            // Add typing animation effect
            this.animateTyping(promptInput, suggestion);
        }
    }

    animateTyping(element, text) {
        element.value = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.value += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }

    generateTool() {
        if (this.isBuilding) {
            this.showNotification('Already building a tool...', 'warning');
            return;
        }

        const prompt = document.getElementById('toolPrompt').value.trim();
        
        if (!prompt) {
            this.showNotification('Please describe what you want to build', 'error');
            return;
        }

        if (prompt.length < 10) {
            this.showNotification('Please provide a more detailed description', 'warning');
            return;
        }

        this.isBuilding = true;
        this.openModal('toolBuilderModal');
        this.startBuildProcess(prompt);
    }

    startBuildProcess(prompt) {
        this.buildStep = 1;
        this.updateBuildProgress();
        
        // Enhanced build steps with more realistic simulation
        const steps = [
            { 
                name: 'Analyzing Requirements', 
                duration: 2000,
                description: 'Understanding your needs and constraints...',
                icon: 'fas fa-search'
            },
            { 
                name: 'Designing Architecture', 
                duration: 3000,
                description: 'Creating optimal workflow design...',
                icon: 'fas fa-project-diagram'
            },
            { 
                name: 'Generating Code', 
                duration: 4000,
                description: 'Writing production-ready code...',
                icon: 'fas fa-code'
            },
            { 
                name: 'Testing & Deployment', 
                duration: 3000,
                description: 'Testing and preparing for launch...',
                icon: 'fas fa-rocket'
            }
        ];

        let currentStep = 0;
        
        const processNextStep = () => {
            if (currentStep < steps.length) {
                this.updateBuildStep(currentStep + 1, steps[currentStep]);
                
                setTimeout(() => {
                    currentStep++;
                    if (currentStep < steps.length) {
                        processNextStep();
                    } else {
                        this.completeBuild(prompt);
                    }
                }, steps[currentStep].duration);
            }
        };

        processNextStep();
    }

    updateBuildStep(step, stepData = null) {
        this.buildStep = step;
        
        // Update progress bar
        const progress = (step / 4) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        // Update step indicators
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            if (index < step) {
                stepEl.classList.add('completed');
                stepEl.classList.remove('active');
            } else if (index === step - 1) {
                stepEl.classList.add('active');
                stepEl.classList.remove('completed');
            } else {
                stepEl.classList.remove('active', 'completed');
            }
        });

        // Update step description if provided
        if (stepData) {
            const buildPreview = document.getElementById('buildPreviewModal');
            if (buildPreview) {
                buildPreview.innerHTML = `
                    <div class="build-step-info">
                        <div class="step-icon">
                            <i class="${stepData.icon}"></i>
                        </div>
                        <h4>${stepData.name}</h4>
                        <p>${stepData.description}</p>
                        <div class="step-progress">
                            <div class="step-progress-bar"></div>
                        </div>
                    </div>
                `;
                
                // Animate progress bar
                setTimeout(() => {
                    const progressBar = buildPreview.querySelector('.step-progress-bar');
                    if (progressBar) {
                        progressBar.style.width = '100%';
                    }
                }, 100);
            }
        }
    }

    completeBuild(prompt) {
        setTimeout(() => {
            this.isBuilding = false;
            this.closeModal('toolBuilderModal');
            
            // Generate a tool name from the prompt
            const toolName = this.generateToolName(prompt);
            
            // Show success notification
            this.showNotification(`🎉 Successfully created ${toolName}!`, 'success');
            
            // Add to projects
            const newProject = {
                id: this.projects.length + 1,
                title: toolName,
                description: this.generateToolDescription(prompt),
                status: "running",
                lastRun: "Just now",
                totalRuns: 0,
                successRate: 100,
                created: new Date().toISOString(),
                tags: this.extractTags(prompt),
                favorite: false
            };
            
            this.projects.unshift(newProject);
            this.renderProjects();
            
            // Clear the prompt
            const promptInput = document.getElementById('toolPrompt');
            if (promptInput) {
                promptInput.value = '';
            }
            
            // Show completion celebration
            this.showCompletionCelebration(toolName);
            
        }, 1000);
    }

    generateToolName(prompt) {
        // Simple tool name generation from prompt
        const keywords = prompt.toLowerCase().split(' ');
        if (keywords.includes('instagram')) return 'Instagram Automation Bot';
        if (keywords.includes('lead')) return 'Lead Generation System';
        if (keywords.includes('email')) return 'Email Campaign Manager';
        if (keywords.includes('dashboard')) return 'Analytics Dashboard';
        if (keywords.includes('chatbot')) return 'Customer Service Bot';
        return 'AI Automation Tool';
    }

    generateToolDescription(prompt) {
        return `AI-powered tool created from: "${prompt.substring(0, 50)}..."`;
    }

    extractTags(prompt) {
        const tags = [];
        const keywords = prompt.toLowerCase();
        if (keywords.includes('instagram')) tags.push('social');
        if (keywords.includes('email')) tags.push('communication');
        if (keywords.includes('data')) tags.push('analytics');
        if (keywords.includes('automation')) tags.push('automation');
        return tags;
    }

    showCompletionCelebration(toolName) {
        // Create celebration effect
        const celebration = document.createElement('div');
        celebration.className = 'celebration-overlay';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h2>Tool Created Successfully!</h2>
                <p>Your ${toolName} is ready to use</p>
                <div class="celebration-actions">
                    <button class="btn-primary" onclick="this.closest('.celebration-overlay').remove()">
                        Get Started
                    </button>
                    <button class="btn-secondary" onclick="this.closest('.celebration-overlay').remove()">
                        View in Projects
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            celebration.remove();
        }, 5000);
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Additional methods for complete functionality
    performSearch(query) {
        if (!query.trim()) {
            this.renderTemplates();
            this.renderProjects();
            return;
        }

        // Search templates
        const filteredTemplates = this.templates.filter(template => 
            template.name.toLowerCase().includes(query.toLowerCase()) ||
            template.description.toLowerCase().includes(query.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        // Search projects
        const filteredProjects = this.projects.filter(project =>
            project.title.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        this.renderFilteredTemplates(filteredTemplates);
        this.renderFilteredProjects(filteredProjects);
    }

    filterByCategory(category) {
        if (category === 'All Tools') {
            this.renderTemplates();
            this.renderProjects();
            return;
        }

        const categoryMap = {
            'Automation': 'automation',
            'Analytics': 'analytics',
            'Communication': 'communication',
            'Data Processing': 'data',
            'Utilities': 'utilities'
        };

        const categoryKey = categoryMap[category];
        if (categoryKey) {
            const filteredTemplates = this.templates.filter(t => t.category === categoryKey);
            const filteredProjects = this.projects.filter(p => p.tags.includes(categoryKey));
            
            this.renderFilteredTemplates(filteredTemplates);
            this.renderFilteredProjects(filteredProjects);
        }
    }

    updateActivityFeed() {
        const activities = [
            { title: 'Instagram Bot deployed', time: '2 minutes ago', type: 'success' },
            { title: 'Lead scraper needs review', time: '15 minutes ago', type: 'warning' },
            { title: 'New template available', time: '1 hour ago', type: 'info' },
            { title: 'Analytics pipeline updated', time: '2 hours ago', type: 'info' }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.addActivity(randomActivity);
    }

    addActivity(activity) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item fade-in';
        activityItem.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${activity.type === 'success' ? 'check' : activity.type === 'warning' ? 'exclamation' : 'info'}"></i>
            </div>
            <div class="activity-text">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;

        // Add to top of list
        activityList.insertBefore(activityItem, activityList.firstChild);

        // Remove oldest if too many
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }
    }

    updateStats() {
        // Simulate stats updates
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            // Randomly update one stat
            const randomStat = Math.floor(Math.random() * 3);
            const currentValue = parseInt(statNumbers[randomStat].textContent);
            const newValue = currentValue + Math.floor(Math.random() * 5);
            statNumbers[randomStat].textContent = newValue;
        }
    }

    // Enhanced modal functionality
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input if exists
        const firstInput = modal.querySelector('input, textarea, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // Additional UI methods
    focusSearch() {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    createNewTool() {
        this.switchMode('prompt');
        const promptInput = document.getElementById('toolPrompt');
        if (promptInput) {
            promptInput.focus();
        }
    }

    toggleUserMenu() {
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.classList.toggle('active');
        }
    }

    handleNavigation(link, event) {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    openUpgradeModal() {
        this.showNotification('Upgrade modal would open here', 'info');
    }

    // Methods for additional functionality
    selectTemplate(template) {
        this.fillPrompt(`Create a ${template.name.toLowerCase()} that ${template.description.toLowerCase()}`);
        this.switchMode('prompt');
        this.showNotification(`Template "${template.name}" loaded`, 'success');
    }

    filterTemplates(category) {
        document.querySelectorAll('.template-cat').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-cat="${category}"]`).classList.add('active');

        const filtered = category === 'all' ? this.templates : this.templates.filter(t => t.category === category);
        this.renderFilteredTemplates(filtered);
    }

    renderFilteredTemplates(templates) {
        const grid = document.getElementById('templateGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card fade-in';
            card.innerHTML = `
                <div class="template-header">
                    <div class="template-icon">
                        <i class="${template.icon}"></i>
                    </div>
                    <div class="template-meta">
                        <span class="template-uses">${this.formatNumber(template.uses)} uses</span>
                        <span class="template-rating">
                            <i class="fas fa-star"></i> ${template.rating}
                        </span>
                    </div>
                </div>
                <div class="template-content">
                    <h3 class="template-title">${template.name}</h3>
                    <p class="template-description">${template.description}</p>
                    <div class="template-tags">
                        ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="template-footer">
                        <span class="template-difficulty">
                            <i class="fas fa-signal"></i> ${template.difficulty}
                        </span>
                        <span class="template-time">
                            <i class="fas fa-clock"></i> ${template.timeEstimate}
                        </span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                this.selectTemplate(template);
            });

            grid.appendChild(card);
        });
    }

    renderFilteredProjects(projects) {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in';
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-status status-${project.status}">
                        <span class="status-dot"></span>
                        ${project.status}
                    </div>
                </div>
                <div class="project-metrics">
                    <div class="metric">
                        <span class="metric-label">Total Runs</span>
                        <span class="metric-value">${this.formatNumber(project.totalRuns)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Success Rate</span>
                        <span class="metric-value">${project.successRate}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Last Run</span>
                        <span class="metric-value">${project.lastRun}</span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="project-btn primary" data-action="run" data-project-id="${project.id}">
                        <i class="fas fa-play"></i> Run
                    </button>
                    <button class="project-btn" data-action="edit" data-project-id="${project.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="project-btn" data-action="logs" data-project-id="${project.id}">
                        <i class="fas fa-file-alt"></i> Logs
                    </button>
                    <button class="project-btn" data-action="more" data-project-id="${project.id}">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    loadScratchOptions() {
        // Scratch options are already rendered in HTML
        // This method can be used to dynamically load scratch options
    }

    openScratchBuilder(type) {
        const builders = {
            workflow: 'Workflow Builder',
            code: 'Code Editor',
            api: 'API Builder',
            form: 'Form Builder'
        };

        this.showNotification(`Opening ${builders[type]}...`, 'info');
        
        // Simulate opening builder
        setTimeout(() => {
            alert(`${builders[type]} would open here with advanced features for building from scratch.`);
        }, 500);
    }

    openAIAssistant() {
        this.showNotification('AI Assistant activated', 'info');
        
        // Simulate AI assistant conversation
        setTimeout(() => {
            alert(`🤖 AI Assistant

"Hello! I'm your AI assistant. I can help you:

• Generate tool ideas based on your needs
• Explain how to use different features
• Optimize your existing tools
• Debug issues and suggest improvements

What would you like help with today?"`);
        }, 500);
    }

    openImportModal() {
        this.showNotification('Import functionality would open here', 'info');
        
        setTimeout(() => {
            alert('📁 Import Project

You can import projects from:

• GitHub repositories
• Local files and folders
• Other platforms (Zapier, Make, etc.)
• API specifications
• Database schemas

Select the source you want to import from:');
        }, 500);
    }

    // Additional utility methods for project management
    duplicateProject(project) {
        const duplicated = {
            ...project,
            id: this.projects.length + 1,
            title: `${project.title} (Copy)`,
            status: "stopped",
            lastRun: "Never",
            totalRuns: 0
        };
        
        this.projects.unshift(duplicated);
        this.renderProjects();
        this.showNotification('Project duplicated successfully', 'success');
    }

    exportProject(project) {
        this.showNotification(`Exporting ${project.title}...`, 'info');
        
        // Simulate export
        setTimeout(() => {
            alert(`Export options for ${project.title}:

• JSON configuration
• Python code
• Docker container
• API documentation
• Deployment package`);
        }, 500);
    }

    shareProject(project) {
        this.showNotification(`Sharing ${project.title}...`, 'info');
        
        // Simulate sharing
        setTimeout(() => {
            alert(`Share ${project.title}:

• Copy link
• Email
• Slack
• Teams
• Export to marketplace`);
        }, 500);
    }

    openProjectSettings(project) {
        this.showNotification(`Opening settings for ${project.title}...`, 'info');
        
        setTimeout(() => {
            alert(`Settings for ${project.title}:

• General settings
• Scheduling options
• Notification preferences
• Performance optimization
• Security settings
• Integration configurations`);
        }, 500);
    }

    deleteProject(project) {
        if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
            this.projects = this.projects.filter(p => p.id !== project.id);
            this.renderProjects();
            this.showNotification('Project deleted successfully', 'success');
        }
    }

    // Settings and configuration
    saveAdvancedOptions() {
        const settings = {
            language: document.getElementById('languageSelect').value,
            framework: document.getElementById('frameworkSelect').value,
            deployment: document.getElementById('deploymentSelect').value,
            performance: document.getElementById('performanceSelect').value
        };

        localStorage.setItem('doableAdvancedSettings', JSON.stringify(settings));
        this.settings = settings;
        
        this.closeModal('advancedModal');
        this.showNotification('Advanced settings saved', 'success');
    }
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.doablePlatform = new DoablePlatform();
});

// Global utility functions
function showNotification(message, type = 'info') {
    if (window.doablePlatform) {
        window.doablePlatform.showNotification(message, type);
    } else {
        console.log(`Notification [${type}]: ${message}`);
    }
}

function formatNumber(num) {
    if (window.doablePlatform) {
        return window.doablePlatform.formatNumber(num);
    }
    return num.toString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
