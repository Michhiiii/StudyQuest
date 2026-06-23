/**
 * Grade Management (UC07)
 * CRUD + CSV Import/Export
 */

const GradeModel = {
    getAll(userId) {
        return DB.getGradesForUser(userId) || [];
    },

    create(userId, moduleName, gradeValue, semester) {
        if (!moduleName) throw new Error('Modulname erforderlich');
        if (gradeValue == null) throw new Error('Note erforderlich');

        const grade = {
            id: this._generateId(),
            user_id: userId,
            module_name: moduleName,
            grade_value: parseFloat(gradeValue),
            semester: semester || '',
            created_at: new Date().toISOString()
        };

        DB.saveGrade(grade);
        return grade;
    },

    update(gradeId, updates) {
        const grades = DB.get(this.STORE_GRADES) || [];
        const grade = (DB.get(this.STORE_GRADES) || []).find(g => g.id === gradeId);
        // Better to use DB methods - load and save
        const all = DB.get(DB.STORE_GRADES) || [];
        const idx = all.findIndex(g => g.id === gradeId);
        if (idx < 0) throw new Error('Note nicht gefunden');
        const g = all[idx];
        if (updates.module_name) g.module_name = updates.module_name;
        if (updates.grade_value != null) g.grade_value = parseFloat(updates.grade_value);
        if (updates.semester) g.semester = updates.semester;
        g.updated_at = new Date().toISOString();
        DB.saveGrade(g);
        return g;
    },

    delete(gradeId) {
        return DB.deleteGrade(gradeId);
    },

    exportCSV(userId) {
        const grades = this.getAll(userId);
        const header = ['module_name', 'grade_value', 'semester', 'created_at'];
        const rows = grades.map(g => [g.module_name, g.grade_value, g.semester || '', g.created_at]);
        const csv = [header.join(','), ...rows.map(r => r.map(this._escapeCSV).join(','))].join('\n');
        return csv;
    },

    importCSV(userId, csvText) {
        const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length <= 1) return 0;
        const header = lines[0].split(',').map(h => h.trim());
        const imported = [];
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim());
            const obj = {};
            for (let j = 0; j < header.length; j++) obj[header[j]] = cols[j] || '';
            try {
                const grade = this.create(userId, obj.module_name || 'unknown', obj.grade_value || 0, obj.semester || '');
                imported.push(grade);
            } catch (e) {
                // skip invalid rows
            }
        }
        return imported.length;
    },

    _escapeCSV(val) {
        if (val == null) return '';
        const s = String(val);
        if (s.includes(',') || s.includes('"') || s.includes('\n')) {
            return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
    },

    _generateId() {
        return 'grade_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
};
