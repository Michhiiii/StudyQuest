/**
 * Authentication UI Handler
 * Verwaltung von Login/Register Forms (UC01-UC03)
 */

const AuthUI = {
    /**
     * Zeigt Login/Register Seite
     */
    showAuthPage() {
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <h1>StudyQuest</h1>
                    <p class="subtitle">Lerne gamifiziert & motiviert</p>
                    
                    <div class="auth-tabs">
                        <button class="auth-tab-btn active" data-tab="login">Einloggen</button>
                        <button class="auth-tab-btn" data-tab="register">Registrieren</button>
                    </div>

                    <!-- Login Form -->
                    <form id="login-form" class="auth-form active">
                        <div class="form-group">
                            <label for="login-email">Email:</label>
                            <input 
                                type="email" 
                                id="login-email" 
                                placeholder="deine@email.com"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="login-password">Passwort:</label>
                            <input 
                                type="password" 
                                id="login-password" 
                                placeholder="••••••"
                                required
                            >
                        </div>
                        <button type="submit" class="btn btn-primary">Einloggen</button>
                        <div id="login-error" class="error-msg"></div>
                    </form>

                    <!-- Register Form -->
                    <form id="register-form" class="auth-form">
                        <div class="form-group">
                            <label for="register-name">Name:</label>
                            <input 
                                type="text" 
                                id="register-name" 
                                placeholder="Max Mustermann"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email:</label>
                            <input 
                                type="email" 
                                id="register-email" 
                                placeholder="deine@email.com"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="register-password">Passwort:</label>
                            <input 
                                type="password" 
                                id="register-password" 
                                placeholder="Min. 6 Zeichen"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="register-password-confirm">Passwort wiederholen:</label>
                            <input 
                                type="password" 
                                id="register-password-confirm" 
                                placeholder="Passwort bestätigen"
                                required
                            >
                        </div>
                        <button type="submit" class="btn btn-primary">Registrieren</button>
                        <div id="register-error" class="error-msg"></div>
                    </form>
                </div>

                <div class="auth-footer">
                    <p>StudyQuest v1.0 - Gamifizierte Lernverwaltung</p>
                    <p class="small">Projekt für Software Engineering</p>
                </div>
            </div>
        `;

        this._attachAuthListeners();
    },

    /**
     * Bindet Event-Listener für Auth-Forms
     */
    _attachAuthListeners() {
        // Tab-Switching
        document.querySelectorAll('.auth-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                
                // Update Buttons
                document.querySelectorAll('.auth-tab-btn').forEach(b => 
                    b.classList.remove('active')
                );
                e.target.classList.add('active');

                // Update Forms
                document.querySelectorAll('.auth-form').forEach(f => 
                    f.classList.remove('active')
                );
                document.getElementById(`${tab}-form`).classList.add('active');
            });
        });

        // Login Form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleLogin();
        });

        // Register Form
        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleRegister();
        });
    },

    /**
     * Behandelt Login
     */
    _handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const error_div = document.getElementById('login-error');

        try {
            error_div.textContent = '';
            UserModel.authenticate(email, password);
            
            // Erfolgreich - gehe zu Dashboard
            app.showDashboard();
        } catch (error) {
            error_div.textContent = '❌ ' + error.message;
        }
    },

    /**
     * Behandelt Registrierung
     */
    _handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const password_confirm = document.getElementById('register-password-confirm').value;
        const error_div = document.getElementById('register-error');

        try {
            error_div.textContent = '';

            // Zusätz-Validierung
            if (password !== password_confirm) {
                throw new Error('Passwörter stimmen nicht überein');
            }

            // Erstelle User
            UserModel.create(email, password, name);

            // Auto-Login
            UserModel.authenticate(email, password);

            // Erfolgreich - gehe zu Dashboard
            app.showDashboard();
        } catch (error) {
            error_div.textContent = '❌ ' + error.message;
        }
    }
};
