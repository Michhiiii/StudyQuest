/**
 * Unit Tests - Grade Module
 * Tests für Notenverwaltung (UC09-UC10)
 */

describe('Grade Module - Grade Management', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
        // Erstelle Test User
        if (typeof UserModel !== 'undefined') {
            UserModel.create('test@example.com', 'password123', 'Test User');
            UserModel.authenticate('test@example.com', 'password123');
        }
    });
    
    // Test 1: addGrade() - Note hinzufügen
    it('sollte Note hinzufügen können', () => {
        const user = UserModel.getCurrentUser();
        const result = GradeModel.addGrade(
            user.id,
            'Mathematik',
            2.5,
            new Date().toISOString()
        );
        
        expect(result).toBeTruthy();
    });
    
    // Test 2: addGrade() - Validierung: Ungültige Note
    it('sollte Error werfen bei ungültiger Note', () => {
        const user = UserModel.getCurrentUser();
        
        expect(() => {
            GradeModel.addGrade(user.id, 'Mathematik', 6.5);
        }).toThrow();
    });
    
    // Test 3: getGradesBySubject() - Noten nach Fach abrufen
    it('sollte Noten nach Fach abrufen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Mathematik', 2.5);
        
        const math_grades = GradeModel.getGradesBySubject(user.id, 'Mathematik');
        
        expect(math_grades).toHaveLength(2);
    });
    
    // Test 4: getAverageGrade() - Durchschnittsnote berechnen
    it('sollte Durchschnittsnote berechnen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Mathematik', 3.0);
        
        const average = GradeModel.getAverageGrade(user.id, 'Mathematik');
        
        expect(average).toBe(2.5);
    });
    
    // Test 5: getAllGrades() - Alle Noten abrufen
    it('sollte alle Noten eines Users abrufen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Englisch', 1.5);
        
        const all_grades = GradeModel.getAllGrades(user.id);
        
        expect(all_grades.length).toBeGreaterThan(0);
    });
    
    // Test 6: getGradeCount() - Anzahl Noten zählen
    it('sollte Anzahl der Noten zählen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Englisch', 1.5);
        
        const count = GradeModel.getGradeCount(user.id);
        
        expect(count).toBe(2);
    });
    
    // Test 7: getSubjects() - Alle Fächer abrufen
    it('sollte alle Fächer mit Noten abrufen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Englisch', 1.5);
        GradeModel.addGrade(user.id, 'Deutsch', 3.0);
        
        const subjects = GradeModel.getSubjects(user.id);
        
        expect(subjects).toContain('Mathematik');
        expect(subjects).toContain('Englisch');
        expect(subjects).toContain('Deutsch');
    });
    
    // Test 8: updateGrade() - Note aktualisieren
    it('sollte Note aktualisieren können', () => {
        const user = UserModel.getCurrentUser();
        const grade_id = GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.updateGrade(grade_id, 1.5);
        
        const updated_grade = GradeModel.getGradeById(grade_id);
        expect(updated_grade.value).toBe(1.5);
    });
    
    // Test 9: deleteGrade() - Note löschen
    it('sollte Note löschen können', () => {
        const user = UserModel.getCurrentUser();
        const grade_id = GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.deleteGrade(grade_id);
        
        const deleted_grade = GradeModel.getGradeById(grade_id);
        expect(deleted_grade).toBeUndefined();
    });
    
    // Test 10: getOverallAverage() - Gesamtdurchschnitt berechnen
    it('sollte Gesamtdurchschnitt aller Noten berechnen', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Englisch', 1.5);
        GradeModel.addGrade(user.id, 'Deutsch', 2.5);
        
        const overall_average = GradeModel.getOverallAverage(user.id);
        
        expect(overall_average).toBe(2.0);
    });
    
    // Test 11: getBestGrade() - Beste Note abrufen
    it('sollte beste Note abrufen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Mathematik', 1.5);
        GradeModel.addGrade(user.id, 'Mathematik', 3.0);
        
        const best_grade = GradeModel.getBestGrade(user.id, 'Mathematik');
        
        expect(best_grade).toBe(1.5);
    });
    
    // Test 12: getWorstGrade() - Schlechteste Note abrufen
    it('sollte schlechteste Note abrufen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Mathematik', 1.5);
        GradeModel.addGrade(user.id, 'Mathematik', 3.5);
        
        const worst_grade = GradeModel.getWorstGrade(user.id, 'Mathematik');
        
        expect(worst_grade).toBe(3.5);
    });
    
    // Test 13: getGradeHistory() - Noten-Verlauf abrufen
    it('sollte Noten-Verlauf abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const now = new Date().toISOString();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0, now);
        
        const history = GradeModel.getGradeHistory(user.id, 'Mathematik');
        
        expect(history.length).toBeGreaterThan(0);
    });
    
    // Test 14: getGradeStats() - Statistiken abrufen
    it('sollte Noten-Statistiken abrufen können', () => {
        const user = UserModel.getCurrentUser();
        GradeModel.addGrade(user.id, 'Mathematik', 2.0);
        GradeModel.addGrade(user.id, 'Mathematik', 1.5);
        GradeModel.addGrade(user.id, 'Englisch', 1.0);
        
        const stats = GradeModel.getGradeStats(user.id);
        
        expect(stats).toHaveProperty('average');
        expect(stats).toHaveProperty('best');
        expect(stats).toHaveProperty('worst');
        expect(stats).toHaveProperty('total_count');
    });
    
    // Test 15: importGrades() - Noten importieren
    it('sollte mehrere Noten auf einmal importieren können', () => {
        const user = UserModel.getCurrentUser();
        const import_data = [
            { subject: 'Mathematik', value: 2.0 },
            { subject: 'Englisch', value: 1.5 },
            { subject: 'Deutsch', value: 2.5 }
        ];
        
        GradeModel.importGrades(user.id, import_data);
        
        const all_grades = GradeModel.getAllGrades(user.id);
        expect(all_grades.length).toBe(3);
    });
});
