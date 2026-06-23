/**
 * Simple Testing Framework for StudyQuest
 * Minimalistisches Test-Framework ohne externe Dependencies
 * 
 * Verwendung:
 * describe('Modul Name', () => {
 *   it('sollte etwas tun', () => {
 *     expect(ergebnis).toBe(erwartet);
 *   });
 * });
 */

const TEST_RESULTS = {
    total_tests: 0,
    passed_tests: 0,
    failed_tests: 0,
    test_suites: [],
    start_time: null,
    end_time: null
};

/**
 * Definiert eine Test-Suite
 * @param {string} suite_name - Name der Test-Suite
 * @param {function} suite_callback - Callback mit it() Tests
 */
function describe(suite_name, suite_callback) {
    const suite_start_time = Date.now();
    const suite_tests = [];
    
    global_current_suite = {
        name: suite_name,
        tests: suite_tests,
        passed: 0,
        failed: 0
    };
    
    // Führe alle Tests in dieser Suite aus
    suite_callback();
    
    const suite_duration = Date.now() - suite_start_time;
    global_current_suite.duration_ms = suite_duration;
    
    TEST_RESULTS.test_suites.push(global_current_suite);
    
    console.log(`\n✓ ${suite_name} (${suite_duration}ms)`);
}

let global_current_suite = null;

/**
 * Definiert einen einzelnen Test
 * @param {string} test_name - Beschreibung des Tests
 * @param {function} test_callback - Test-Logik mit expect() Assertions
 */
function it(test_name, test_callback) {
    TEST_RESULTS.total_tests++;
    
    try {
        // Starte Test
        test_callback();
        
        // Test erfolgreich
        TEST_RESULTS.passed_tests++;
        if (global_current_suite) {
            global_current_suite.passed++;
            global_current_suite.tests.push({
                name: test_name,
                status: 'PASSED',
                error: null
            });
        }
        console.log(`  ✓ ${test_name}`);
        
    } catch (error) {
        // Test fehlgeschlagen
        TEST_RESULTS.failed_tests++;
        if (global_current_suite) {
            global_current_suite.failed++;
            global_current_suite.tests.push({
                name: test_name,
                status: 'FAILED',
                error: error.message
            });
        }
        console.error(`  ✗ ${test_name}`);
        console.error(`    Fehler: ${error.message}`);
    }
}

/**
 * Expect API für Assertions
 * @param {any} actual_value - Der zu testende Wert
 * @returns {object} Assertion API
 */
function expect(actual_value) {
    return {
        /**
         * Prüft Gleichheit mit ===
         */
        toBe(expected_value) {
            if (actual_value !== expected_value) {
                throw new Error(
                    `Expected ${JSON.stringify(expected_value)} but got ${JSON.stringify(actual_value)}`
                );
            }
        },
        
        /**
         * Prüft tiefe Gleichheit
         */
        toEqual(expected_value) {
            if (JSON.stringify(actual_value) !== JSON.stringify(expected_value)) {
                throw new Error(
                    `Expected ${JSON.stringify(expected_value)} but got ${JSON.stringify(actual_value)}`
                );
            }
        },
        
        /**
         * Prüft ob Wert wahr ist
         */
        toBeTruthy() {
            if (!actual_value) {
                throw new Error(`Expected truthy value but got ${actual_value}`);
            }
        },
        
        /**
         * Prüft ob Wert falsch ist
         */
        toBeFalsy() {
            if (actual_value) {
                throw new Error(`Expected falsy value but got ${actual_value}`);
            }
        },
        
        /**
         * Prüft ob Array/String einen Wert enthält
         */
        toContain(expected_item) {
            if (!actual_value || !actual_value.includes(expected_item)) {
                throw new Error(
                    `Expected ${JSON.stringify(actual_value)} to contain ${JSON.stringify(expected_item)}`
                );
            }
        },
        
        /**
         * Prüft ob Wert null ist
         */
        toBeNull() {
            if (actual_value !== null) {
                throw new Error(`Expected null but got ${actual_value}`);
            }
        },
        
        /**
         * Prüft ob Wert undefined ist
         */
        toBeUndefined() {
            if (actual_value !== undefined) {
                throw new Error(`Expected undefined but got ${actual_value}`);
            }
        },
        
        /**
         * Prüft ob Objekt Property hat
         */
        toHaveProperty(property_name) {
            if (!actual_value || !(property_name in actual_value)) {
                throw new Error(`Expected object to have property ${property_name}`);
            }
        },
        
        /**
         * Prüft Array-Länge
         */
        toHaveLength(expected_length) {
            if (!actual_value || actual_value.length !== expected_length) {
                throw new Error(
                    `Expected length ${expected_length} but got ${actual_value?.length}`
                );
            }
        },
        
        /**
         * Prüft ob Zahl größer als
         */
        toBeGreaterThan(expected_number) {
            if (actual_value <= expected_number) {
                throw new Error(
                    `Expected ${actual_value} to be greater than ${expected_number}`
                );
            }
        },
        
        /**
         * Prüft ob Zahl kleiner als
         */
        toBeLessThan(expected_number) {
            if (actual_value >= expected_number) {
                throw new Error(
                    `Expected ${actual_value} to be less than ${expected_number}`
                );
            }
        },
        
        /**
         * Prüft ob String Pattern matched
         */
        toMatch(pattern) {
            const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
            if (!regex.test(actual_value)) {
                throw new Error(`Expected ${actual_value} to match ${pattern}`);
            }
        },
        
        /**
         * Prüft ob Funktion Error wirft
         */
        toThrow(expected_error_message) {
            try {
                actual_value();
                throw new Error(`Expected function to throw but it didn't`);
            } catch (error) {
                if (expected_error_message && !error.message.includes(expected_error_message)) {
                    throw new Error(
                        `Expected error message to include "${expected_error_message}" but got "${error.message}"`
                    );
                }
            }
        }
    };
}

/**
 * Setup vor jedem Test
 */
let global_before_each_callback = null;
function beforeEach(callback) {
    global_before_each_callback = callback;
}

/**
 * Teardown nach jedem Test
 */
let global_after_each_callback = null;
function afterEach(callback) {
    global_after_each_callback = callback;
}

/**
 * Generiert Test-Report
 */
function print_test_report() {
    TEST_RESULTS.end_time = Date.now();
    const total_duration = TEST_RESULTS.end_time - TEST_RESULTS.start_time;
    const success_rate = TEST_RESULTS.total_tests > 0 
        ? ((TEST_RESULTS.passed_tests / TEST_RESULTS.total_tests) * 100).toFixed(1)
        : 0;
    
    console.log('\n' + '='.repeat(70));
    console.log('TEST REPORT - STUDYQUEST');
    console.log('='.repeat(70));
    console.log(`\nTests ausgefühert: ${TEST_RESULTS.total_tests}`);
    console.log(`Bestanden: ${TEST_RESULTS.passed_tests} ✓`);
    console.log(`Fehlgeschlagen: ${TEST_RESULTS.failed_tests} ✗`);
    console.log(`\nSuccess Rate: ${success_rate}%`);
    console.log(`Gesamtdauer: ${total_duration}ms`);
    
    if (TEST_RESULTS.test_suites.length > 0) {
        console.log('\n' + '-'.repeat(70));
        console.log('SUITE DETAILS:');
        console.log('-'.repeat(70));
        
        TEST_RESULTS.test_suites.forEach(suite => {
            const suite_success_rate = suite.passed + suite.failed > 0
                ? ((suite.passed / (suite.passed + suite.failed)) * 100).toFixed(1)
                : 0;
            console.log(
                `\n${suite.name}: ${suite.passed}/${suite.passed + suite.failed} ` +
                `(${suite_success_rate}%) - ${suite.duration_ms}ms`
            );
        });
    }
    
    console.log('\n' + '='.repeat(70));
    
    return TEST_RESULTS;
}

// Globale Variablen exportieren für Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        describe,
        it,
        expect,
        beforeEach,
        afterEach,
        print_test_report,
        TEST_RESULTS
    };
}
