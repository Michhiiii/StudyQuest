/**
 * Test Runner für StudyQuest
 * Führt alle Unit Tests aus und generiert Report
 * 
 * Verwendung im Browser:
 * 1. Alle Test-Dateien vor dieser laden
 * 2. test_runner.runAllTests() aufrufen
 */

class TestRunner {
    constructor() {
        this.test_results = {
            total_suites: 0,
            passed_suites: 0,
            failed_suites: 0,
            total_tests: 0,
            passed_tests: 0,
            failed_tests: 0,
            suites: []
        };
    }
    
    /**
     * Führt alle registrierten Tests aus
     */
    async run_all_tests() {
        console.log('🧪 Starte Test Suite Ausführung...\n');
        
        const start_time = Date.now();
        
        // Laden und ausführen aller Tests
        const test_modules = [
            'db.test.js',
            'user.test.js',
            'quest.test.js',
            'grade.test.js',
            'achievement.test.js',
            'leaderboard.test.js',
            'admin.test.js',
            'notification.test.js',
            'ui.test.js'
        ];
        
        // Dieser Teil wird über Script-Tags im HTML geladen
        // Die Tests werden automatisch durch describe() registriert
        
        const duration = Date.now() - start_time;
        
        // Zeige Report
        this.print_report(duration);
        
        return TEST_RESULTS;
    }
    
    /**
     * Gibt detaillierten Test Report aus
     */
    print_report(duration) {
        const success_rate = TEST_RESULTS.total_tests > 0
            ? ((TEST_RESULTS.passed_tests / TEST_RESULTS.total_tests) * 100).toFixed(1)
            : 0;
        
        console.log('\n' + '='.repeat(80));
        console.log('                      STUDYQUEST TEST REPORT');
        console.log('='.repeat(80));
        
        console.log('\n📊 ZUSAMMENFASSUNG');
        console.log('-'.repeat(80));
        console.log(`Total Tests:        ${TEST_RESULTS.total_tests}`);
        console.log(`✓ Bestanden:        ${TEST_RESULTS.passed_tests}`);
        console.log(`✗ Fehlgeschlagen:   ${TEST_RESULTS.failed_tests}`);
        console.log(`\nSuccess Rate:       ${success_rate}%`);
        console.log(`Gesamtdauer:        ${duration}ms`);
        
        if (TEST_RESULTS.test_suites.length > 0) {
            console.log('\n' + '='.repeat(80));
            console.log('📋 TEST SUITES');
            console.log('-'.repeat(80));
            
            TEST_RESULTS.test_suites.forEach((suite, index) => {
                const suite_success = suite.passed + suite.failed > 0
                    ? ((suite.passed / (suite.passed + suite.failed)) * 100).toFixed(1)
                    : 0;
                const status_icon = suite.failed === 0 ? '✓' : '✗';
                
                console.log(`\n${index + 1}. ${status_icon} ${suite.name}`);
                console.log(`   Bestanden: ${suite.passed}/${suite.passed + suite.failed} (${suite_success}%)`);
                console.log(`   Dauer: ${suite.duration_ms}ms`);
                
                // Zeige fehlgeschlagene Tests
                if (suite.failed > 0) {
                    console.log('   Fehler:');
                    suite.tests
                        .filter(test => test.status === 'FAILED')
                        .forEach(test => {
                            console.log(`     ✗ ${test.name}`);
                            console.log(`       ${test.error}`);
                        });
                }
            });
        }
        
        console.log('\n' + '='.repeat(80));
        
        // Bewertung
        if (success_rate >= 90) {
            console.log('✓ QUALITÄT: AUSGEZEICHNET (≥90%)');
        } else if (success_rate >= 80) {
            console.log('✓ QUALITÄT: GUT (≥80%)');
        } else if (success_rate >= 70) {
            console.log('⚠ QUALITÄT: BEFRIEDIGEND (≥70%)');
        } else {
            console.log('✗ QUALITÄT: UNZUREICHEND (<70%)');
        }
        
        console.log('='.repeat(80) + '\n');
    }
    
    /**
     * Exportiert Testergebnisse als JSON
     */
    export_json() {
        return JSON.stringify(TEST_RESULTS, null, 2);
    }
    
    /**
     * Exportiert Testergebnisse als CSV
     */
    export_csv() {
        let csv = 'Suite,Test,Status,Error\n';
        
        TEST_RESULTS.test_suites.forEach(suite => {
            suite.tests.forEach(test => {
                const error_msg = (test.error || '').replace(/,/g, ';');
                csv += `"${suite.name}","${test.name}","${test.status}","${error_msg}"\n`;
            });
        });
        
        return csv;
    }
    
    /**
     * Generiert HTML Report
     */
    generate_html_report() {
        const success_rate = TEST_RESULTS.total_tests > 0
            ? ((TEST_RESULTS.passed_tests / TEST_RESULTS.total_tests) * 100).toFixed(1)
            : 0;
        
        let html = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>StudyQuest Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
        .stat { background: #f0f0f0; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #4CAF50; }
        .stat-label { color: #666; font-size: 12px; margin-top: 5px; }
        .passed { color: #4CAF50; }
        .failed { color: #f44336; }
        .success-rate { font-size: 28px; font-weight: bold; margin: 20px 0; }
        .suite { margin: 20px 0; border-left: 4px solid #4CAF50; padding-left: 15px; }
        .suite.failed { border-left-color: #f44336; }
        .test { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 3px; }
        .test.passed::before { content: "✓ "; color: #4CAF50; font-weight: bold; }
        .test.failed::before { content: "✗ "; color: #f44336; font-weight: bold; }
        .error { color: #f44336; font-size: 12px; margin-top: 5px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 StudyQuest Test Report</h1>
        
        <div class="summary">
            <div class="stat">
                <div class="stat-value">${TEST_RESULTS.total_tests}</div>
                <div class="stat-label">Gesamt Tests</div>
            </div>
            <div class="stat">
                <div class="stat-value passed">${TEST_RESULTS.passed_tests}</div>
                <div class="stat-label">Bestanden</div>
            </div>
            <div class="stat">
                <div class="stat-value failed">${TEST_RESULTS.failed_tests}</div>
                <div class="stat-label">Fehlgeschlagen</div>
            </div>
            <div class="stat">
                <div class="stat-value">${TEST_RESULTS.test_suites.length}</div>
                <div class="stat-label">Test Suites</div>
            </div>
        </div>
        
        <div class="success-rate">
            Success Rate: <span class="${success_rate >= 80 ? 'passed' : 'failed'}">${success_rate}%</span>
        </div>
`;
        
        // Füge Test Suite Details hinzu
        TEST_RESULTS.test_suites.forEach(suite => {
            const suite_success = suite.passed + suite.failed > 0
                ? ((suite.passed / (suite.passed + suite.failed)) * 100).toFixed(1)
                : 0;
            
            html += `
        <div class="suite ${suite.failed > 0 ? 'failed' : ''}">
            <h3>${suite.name}</h3>
            <p>${suite.passed}/${suite.passed + suite.failed} Tests bestanden (${suite_success}%)</p>
`;
            
            suite.tests.forEach(test => {
                html += `<div class="test ${test.status.toLowerCase()}">
                    ${test.name}
                    ${test.error ? `<div class="error">${test.error}</div>` : ''}
                </div>`;
            });
            
            html += '</div>';
        });
        
        html += '</div></body></html>';
        
        return html;
    }
}

// Globale Instanz
const test_runner = new TestRunner();
